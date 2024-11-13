const openUrl = (url) => {
  chrome.tabs.create({ 'url': url });
};

chrome.contextMenus.onClicked.addListener((clickData) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(chrome.runtime.lastError) {
      console.log('Not a SRF page, probably?');
    }

    chrome.tabs.sendMessage(tabs[0].id, {action: "getContentInfo"}, (response) => {
      if (!response || chrome.runtime.lastError) {
        // Something went wrong
        console.log("Error!", chrome.runtime.lastError);
        return;
      }

      const { urn, phase, portalUrn, uuid } = response;

      if (!urn) {
        return;
      }

      const [,, contentClass, contentId] = urn.split(':');
      const portalId = portalUrn.split(':').reverse()[0];

      const host =
        phase === 'LOCAL' ? 'http://localhost:6900' :
        phase === 'DEV' ? 'https://nora.dev.srfdigital.ch' :
        phase === 'INT' ? 'https://nora.int.srfdigital.ch' :
        'https://nora.srfdigital.ch';


      if (contentClass === 'article') {
        // temporary: on dev, UUID is used, but not yet on other phases
        if (phase === 'DEV') {
          openUrl(`${host}/ui/${portalId}/articles/${uuid}`);
        } else {
          openUrl(`${host}/ui/${portalId}/articles/${contentId}`);
        }
      } else if (contentClass === 'landingpage') {
        openUrl(`${host}/ui/${portalId}/pages/${contentId}`);
      } else {
        // fallback: open nora prod
        openUrl(host);
      }

    });
  });
});

let contextMenuItem = {
  "id": "srfExtensionAction",
  "title": "In Nora bearbeiten",
  "contexts": ["all"]
};
chrome.contextMenus.create(contextMenuItem);
