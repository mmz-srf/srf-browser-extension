const getUrn = () => {
  const metaNode = document.querySelector('meta[name="srf:urn"]');

  if (metaNode) {
    return metaNode.getAttribute('content');
  } else {
    return false;
  }
}

const getUuid = () => {
  const metaNode = document.querySelector('meta[name="srf:claudia:id"]');

  if (metaNode) {
    return metaNode.getAttribute('content');
  } else {
    return false;
  }
}

const getPhase = () => {
  const url = window.location.href;
  const host = window.location.host;
  const port = window.location.port;

  // aron does not use www-X
  const isAron = host.split('.')[0] === 'aron' || port === '4200';
  if (isAron) {
    if (host.indexOf('aron.dev.') >= 0) {
      return 'TEST';
    } else if (host.indexOf('aron.int.') >= 0) {
      return 'STAGE';
    } else if (port === '4200') {
      return 'DEV';
    } else {
      return 'PROD';
    }
  }

  if (url.indexOf('www-test.') >= 0) {
    return 'TEST';
  } else if (url.indexOf('www-stage.') >= 0) {
    return 'STAGE';
  } else if (url.indexOf('dev.') >= 0) {
    return 'DEV';
  } else {
    return 'PROD';
  }
};

const getPortalUrn = () => {
  const metaNode = document.querySelector('meta[name="srf:portal:urn"]');

  if (metaNode) {
    return metaNode.getAttribute('content');
  } else {
    return false;
  }
}

const getTicker = () => {
  const tickerNode = document.querySelector('article .article-content #ticker');
  return !!tickerNode;
};

const getBusinessUnit = () => {
  const host = window.location.host;
  if (host.endsWith('rtr.ch')) {
    return 'rtr';
  } else if (host.endsWith('srf.ch')) {
    return 'srf';
  }
};

export const getAllInfo = () => {
  return {
    uuid: getUuid(),
    urn: getUrn(),
    phase: getPhase(),
    portalUrn: getPortalUrn(),
    hasTicker: getTicker(),
    businessUnit: getBusinessUnit(),
    location: window.location,
  };
};

chrome.runtime.onMessage.addListener(
  (request, sender, callback) => {
    if (request.action == "getContentInfo") {
      callback(getAllInfo());
    }
  }
);
