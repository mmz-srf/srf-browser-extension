
let url = '';

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (url) {
    chrome.tabs.create({ 'url': url });
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'addContextMenu') {
    let contextMenuItem = {
      "id": "srfExtensionAction",
      "title": request.text,
      "contexts": ["all"]
    };

    url = request.url;
    chrome.contextMenus.create(contextMenuItem);
  } else if (request.action === 'removeContextMenu') {
    urn = '';
    chrome.contextMenus.remove("srfExtensionAction");
  }
});
