import { getAllInfo } from "./contentInfoGatherer";

const { urn, phase, portalUrn, businessUnit } = getAllInfo();

const replacePlaceholders = (url, id) => {
  let frontendUrl, noraUrl, adminUrl;

  switch (phase) {
    case 'DEV':
      frontendUrl = 'http://www.dev.srf.ch';
      noraUrl     = 'http://localhost:6900';
      adminUrl    = 'http://admin.dev.srf.mpc';
      break;
    case 'TEST':
      frontendUrl = 'https://www-test.srf.ch';
      noraUrl     = 'https://nora.dev.srfdigital.ch';
      adminUrl    = 'https://admin.cms.zrh.test.srf.mpc';
      break;
    case 'STAGE':
      frontendUrl = 'https://www-stage.srf.ch';
      noraUrl     = 'https://nora.int.srfdigital.ch';
      adminUrl    = 'https://admin.cms.zrh.stage.srf.mpc';
      break;
    case 'PROD':
    default:
      frontendUrl = 'https://www.srf.ch';
      noraUrl     = 'https://nora.srfdigital.ch';
      adminUrl    = 'https://admin.cms.zrh.production.srf.mpc';
      break;
  }

  return url
    .replace("$ID", id)
    .replace("$FE_URL", frontendUrl)
    .replace("$NORA_URL", noraUrl)
    .replace("$ADMIN_URL", adminUrl)
    .replace("$PORTAL", portalUrn.split(':').reverse()[0])
    .replace("$BU", businessUnit)
    .replace("$UUID", id);
}

if (urn) {
  const [,, contentClass, contentId] = urn.split(':');
  if (contentClass === "landingpage") {
    chrome.runtime.sendMessage({
      action: 'addContextMenu',
      text: 'In Globi bearbeiten',
      url: replacePlaceholders('$NORA_URL/ui/$PORTAL/pages/$ID', contentId)
    });
  } else if (contentClass === "article") {
    chrome.runtime.sendMessage({
      action: 'addContextMenu',
      text: 'In Edith bearbeiten',
      url: replacePlaceholders('$NORA_URL/ui/$PORTAL/articles/$ID', contentId)
    });
  } else {
    chrome.runtime.sendMessage({ action: 'removeContextMenu' });
  }
} else {
  chrome.runtime.sendMessage({ action: 'removeContextMenu' });
}
