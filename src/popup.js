import getCommentInfo from "./comments";

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

  const onContentIdFound = (contentId, phase, portalUrn, businessUnit, urn, aisShowId, episodeId, pdpAisId) => {
  contentIdInput.value = contentId;

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

  let frontendUrl, noraUrl, adminUrl, tweetyUrl, aronUrl, showProxyUrl, showPdpUrl, ilShowUrl, episodeProxyUrl, episodePdpUrl, episodeIlUrl;

  switch (phase) {
    case "LOCAL":
      frontendUrl = "http://www.ez.srf.ch";
      noraUrl = "http://localhost:6900";
      adminUrl = "http://admin.dev.srf.mpc";
      tweetyUrl = "http://localhost:8050";
      aronUrl = "http://dev.srf.ch:4200";
      showProxyUrl = "https://srf-epg-proxy.herokuapp.com/eaw/shows/";
      showPdpUrl = "https://api.pdp.production.srgssr.ch/api/v2/collections/urn%3Apdp%3Aais_srf%3Acollection%3A"+aisShowId;
      ilShowUrl = "http://il.srgssr.ch/integrationlayer/2.0/srf/show/radio/"+aisShowId;
      // Episode
      episodeProxyUrl = "https://srf-epg-proxy.herokuapp.com/eaw/episodes/"+episodeId;
      episodePdpUrl = "https://api.pdp.production.srgssr.ch/api/v2/programmes/urn%3Apdp%3Aais_srf%3Aprogramme%3A"+pdpAisId;
      episodeIlUrl = "http://il.srgssr.ch/integrationlayer/2.0/srf/srfMedia/"+pdpAisId;
      break;
    case "DEV":
      frontendUrl = "https://www.dev.srf.ch";
      noraUrl = "https://nora.dev.srfdigital.ch";
      adminUrl = "https://admin.cms.zrh.test.srf.mpc";
      tweetyUrl = "https://srf-comments-dev.herokuapp.com";
      aronUrl = "https://aron.dev.srf.ch";
      showProxyUrl = "https://srf-epg-proxy-test.herokuapp.com/eaw/shows/";
      showPdpUrl = "https://mediathek.pdp.dev.srgssr.ch/api/testing/shows/"+aisShowId;
      ilShowUrl = "http://il-test.srgssr.ch/integrationlayer/2.0/"+businessUnit+"/show/radio/"+aisShowId;
      // Episode
      episodeProxyUrl = "https://srf-epg-proxy-test.herokuapp.com/eaw/episodes/"+episodeId;
      episodePdpUrl = "https://mediathek.pdp.dev.srgssr.ch/api/testing/programmes/"+episodeId;
      episodeIlUrl = "http://il-test.srgssr.ch/integrationlayer/2.0/srf/srfMedia/"+pdpAisId;
      break;
    case "INT":
      frontendUrl = "https://www.int.srf.ch";
      noraUrl = "https://nora.int.srfdigital.ch";
      adminUrl = "https://admin.cms.zrh.stage.srf.mpc";
      tweetyUrl = "https://srf-comments-int.herokuapp.com";
      aronUrl = "https://aron.int.srf.ch";
      showProxyUrl = "https://srf-epg-proxy-stage.herokuapp.com/eaw/shows/";
      showPdpUrl = "https://mediathek.pdp.int.srgssr.ch/api/testing/shows/"+aisShowId;
      ilShowUrl = "http://il-stage.srgssr.ch/integrationlayer/2.0/"+businessUnit+"/show/radio/"+aisShowId;
      // Episode
      episodeProxyUrl = "https://srf-epg-proxy-stage.herokuapp.com/eaw/episodes/"+episodeId;
      episodePdpUrl = "https://mediathek.pdp.int.srgssr.ch/api/testing/programmes/"+episodeId;
      episodeIlUrl = "http://il-stage.srgssr.ch/integrationlayer/2.0/srf/srfMedia/"+pdpAisId;
      break;
    case "PROD":
    default:
      frontendUrl = "https://www.srf.ch";
      noraUrl = "https://nora.srfdigital.ch";
      adminUrl = "https://admin.cms.zrh.production.srf.mpc";
      tweetyUrl = "https://comments.srfdigital.ch";
      aronUrl = "https://aron.srf.ch";
      showProxyUrl = "https://srf-epg-proxy.herokuapp.com/eaw/shows/";
      showPdpUrl = "https://api.pdp.production.srgssr.ch/api/v2/collections/urn%3Apdp%3Aais_srf%3Acollection%3A"+aisShowId;
      ilShowUrl = "http://il.srgssr.ch/integrationlayer/2.0/"+businessUnit+"/show/radio/"+aisShowId;
      // Episode
      episodeProxyUrl = "https://srf-epg-proxy.herokuapp.com/eaw/episodes/"+episodeId;
      episodePdpUrl = "https://api.pdp.production.srgssr.ch/api/v2/programmes/urn%3Apdp%3Aais_srf%3Aprogramme%3A"+pdpAisId;
      episodeIlUrl = "http://il.srgssr.ch/integrationlayer/2.0/srf/srfMedia/"+pdpAisId;
      break;
  }

  // the links have a data attribute with the href-string that includes the placeholders
  document.querySelectorAll(".link--replace-url").forEach((element, index) => {
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
      .replace("$EAW_IL_EPISODE", episodeIlUrl);
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

const onAisShowIdNotFound = () => {
  document.querySelector(".js-ais-show-id").style.display = "none";
}

const onEpisodeIdNotFound = () => {
  document.querySelector(".js-episode-id").style.display = "none";
}

// depending on the content class, different areas in the popup should be hidden/shown
const onContentClassFound = (contentClass) => {
  if (contentClass === "landingpage") {
    document.body.setAttribute("data-content-class", "landingpage");
  } else if (contentClass === "article") {
    document.body.setAttribute("data-content-class", "article");
  }
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
          location,
          aisShowId,
          episodeId,
          pdpAisId
        } = response;

        if (!aisShowId) {
          onAisShowIdNotFound();
        }

        if (!episodeId) {
          onEpisodeIdNotFound();
        }

        if (urn) {
          const [, , contentClass, contentId] = urn.split(":");
          onContentIdFound(contentId, phase, portalUrn, businessUnit, urn, aisShowId, episodeId, pdpAisId);
          onContentClassFound(contentClass);

          getCommentInfo(location, urn);

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
