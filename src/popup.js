import getCommentInfo from "./comments";
import { getShowUrls } from "./Audiothek/show";
import { getEpisodeUrls } from "./Audiothek/episode";
import { getPartUrls} from "./Audiothek/part";

const showEnvironmentCheckbox = document.getElementById("showEnvironment");
const contentIdInput = document.getElementById("contentIdInput");
const copyContentIdButton = document.querySelector(".js-copy-content-id");

// load user setting regarding environment from storage, set checkbox' state
const setBannerStateFromStorage = () => {
  chrome.storage.sync.get(
    "shouldShowEnvironment",
    ({ shouldShowEnvironment }) => {
      showEnvironmentCheckbox.checked = !!shouldShowEnvironment;
    }
  );
};

// When the checkbox is changed, save the setting and let the content script know
const setupBannerCheckboxListener = () => {
  showEnvironmentCheckbox.addEventListener("click", async () => {
    const shouldShowEnvironment = showEnvironmentCheckbox.checked;

    // save the setting
    chrome.storage.sync.set({ shouldShowEnvironment: shouldShowEnvironment });

    // send a message to the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "showEnvironmentBadge",
      });
    });
  });
};

const onContentIdFound = (contentId, phase, portalUrn, businessUnit, urn, aisShowId, episodeId, pdpAisId, partId) => {
  contentIdInput.value = contentId;
  const { showProxyUrl, showPdpUrl, ilShowUrl } = getShowUrls(aisShowId, phase, businessUnit);
  const { episodeProxyUrl, episodePdpUrl, episodeIlUrl } = getEpisodeUrls(episodeId, pdpAisId, phase);
  const { partProxyUrl, partPdpUrl, partIlUrl } = getPartUrls(partId, pdpAisId, phase);

  // idea: loop over all links, replace various placeholders with the correct data:
  // $FE_URL    = https://www.srf.ch (depending on phase)
  // $NORA_URL  = https://nora.srfdigital.ch (depending on phase)
  // $ADMIN_URL = https://admin.cms.zrh.production.srf.mpc (depending on phase)
  // $TWEETY_URL = https://comments.srfdigital.ch (depending on phase)
  // $ARON_URL  = https://aron.srf.ch
  // $URN       = urn, e.g. urn:srf:article:12345678
  // $ID        = contentId
  // $PORTAL    = portal, e.g. "news"
  // $BU        = business unit, i.e. "rtr" or "srf"

  let frontendUrl, noraUrl, adminUrl, tweetyUrl, aronUrl;

  switch (phase) {
    case "LOCAL":
      frontendUrl = "http://www.ez.srf.ch";
      noraUrl = "http://localhost:6900";
      adminUrl = "http://admin.dev.srf.mpc";
      tweetyUrl = "http://localhost:8050";
      aronUrl = "http://dev.srf.ch:4200";
      break;
    case "DEV":
      frontendUrl = "https://www.dev.srf.ch";
      noraUrl = "https://nora.dev.srfdigital.ch";
      adminUrl = "https://admin.cms.zrh.test.srf.mpc";
      tweetyUrl = "https://srf-comments-dev.herokuapp.com";
      aronUrl = "https://aron.dev.srf.ch";
      // Episode
      break;
    case "INT":
      frontendUrl = "https://www.int.srf.ch";
      noraUrl = "https://nora.int.srfdigital.ch";
      adminUrl = "https://admin.cms.zrh.stage.srf.mpc";
      tweetyUrl = "https://srf-comments-int.herokuapp.com";
      aronUrl = "https://aron.int.srf.ch";
      break;
    case "PROD":
    default:
      frontendUrl = "https://www.srf.ch";
      noraUrl = "https://nora.srfdigital.ch";
      adminUrl = "https://admin.cms.zrh.production.srf.mpc";
      tweetyUrl = "https://comments.srfdigital.ch";
      aronUrl = "https://aron.srf.ch";
      break;
  }

  // the links have a data attribute with the href-string that includes the placeholders
  document.querySelectorAll(".link--replace-url").forEach((element) => {
    let href = element.dataset.href;
    // replace all placeholders
    href = href
      .replace("$ID", contentId)
      .replace("$FE_URL", frontendUrl)
      .replace("$NORA_URL", noraUrl)
      .replace("$ADMIN_URL", adminUrl)
      .replace("$TWEETY_URL", tweetyUrl)
      .replace("$ARON_URL", aronUrl)
      .replace("$PORTAL", portalUrn.split(":").reverse()[0])
      .replace("$BU", businessUnit)
      .replace("$URN", urn)
        // EAW
      .replace("$EAW_PROXY_SHOW", showProxyUrl+urn.split(":").reverse()[0])
      .replace("$EAW_PDP_SHOW", showPdpUrl)
      .replace("$EAW_IL_SHOW", ilShowUrl)
      .replace("$EAW_PROXY_EPISODE", episodeProxyUrl)
      .replace("$EAW_PDP_EPISODE", episodePdpUrl)
      .replace("$EAW_IL_EPISODE", episodeIlUrl)
      .replace("$EAW_PROXY_PART", partProxyUrl)
      .replace("$EAW_PDP_PART", partPdpUrl)
      .replace("$EAW_IL_PART", partIlUrl);
    element.href = href;
  });
};

// no content id found - show an error message and hide the input field
const onContentIdNotFound = () => {
  document.querySelector(".js-contentid-container").style.display = "none";
};

const onInfoGatheringFailed = () => {
  document.querySelector(".js-contentinfo").style.display = "none";
};

// depending on the content class, different areas in the popup should be hidden/shown
const onContentClassFound = (contentClass) => {
  document.body.setAttribute("data-content-class", contentClass);
};

const onTickerFound = () => {
  document.querySelector(".js-ticker-link").style.display = "";
};

// get some info about the website via content script (content id and content class)
const getContentInfo = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (chrome.runtime.lastError) {
      console.log("Not a SRF page, probably?");
    }

    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getContentInfo" },
      (response) => {
        if (!response || chrome.runtime.lastError) {
          // Something went wrong
          console.log("Error!", chrome.runtime.lastError);
          onInfoGatheringFailed();
          return;
        }

        const {
          urn,
          phase,
          portalUrn,
          hasTicker,
          businessUnit,
          origin,
          aisShowId,
          episodeId,
          pdpAisId,
          partId,
        } = response;

        if (urn) {
          const [, , contentClass, contentId] = urn.split(":");
          onContentIdFound(contentId, phase, portalUrn, businessUnit, urn, aisShowId, episodeId, pdpAisId, partId);
          onContentClassFound(contentClass);

          getCommentInfo(origin, urn);

          if (hasTicker) {
            onTickerFound();
          }
        } else {
          onContentIdNotFound();
        }
      }
    );
  });
};

const setupContentIdCopyListener = () => {
  copyContentIdButton.addEventListener("click", () => {
    navigator.clipboard.writeText(contentIdInput.value);
  });
};

// what to do when the extension is opened
const onLoad = () => {
  getContentInfo();

  setBannerStateFromStorage();
  setupBannerCheckboxListener();
  setupContentIdCopyListener();
};

onLoad();
