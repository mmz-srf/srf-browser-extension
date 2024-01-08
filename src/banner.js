const getPhaseForBanner = () => {
  const hostName = window.location.hostname;

  const testHosts = ['www-test.srf.ch', 'www-test.rtr.ch', 'nora.dev.srfdigital.ch'];
  const stageHosts = ['play-web-staging.herokuapp.com', 'www-stage.srf.ch', 'www-stage.rtr.ch', 'nora.int.srfdigital.ch'];
  const prodHosts = ['play-web.herokuapp.com', 'www.srf.ch', 'www.rtr.ch', 'nora.srfdigital.ch'];
  const localHosts = ['dev.srf.ch', 'dev.rtr.ch', 'pascal.srf.ch', 'pascal.rtr.ch'];

  if (testHosts.includes(hostName)) {
    return 'TEST';
  } else if (stageHosts.includes(hostName)) {
    return 'STAGE';
  } else if (prodHosts.includes(hostName)) {
    return 'PROD';
  } else if (localHosts.includes(hostName)) {
    return 'DEV';
  }

  // special cases for PR apps: regex to the rescue
  const pacTestRegex = /^play-web-pr-\d+\.herokuapp\.com$/;
  if (pacTestRegex.test(hostName)) {
    return 'TEST';
  }
  const noraTestRegex = /^nora-pr-\d+\.herokuapp\.com$/;
  if (noraTestRegex.test(hostName)) {
    return 'TEST';
  }

  // Nora's dev env has little useful info in the hostName
  if (hostName === 'localhost' && window.location.port === "6900" && window.location.pathname.startsWith('/ui/')) {
    return 'DEV';
  }

  return '';
}

const addBanner = () => {
  const text = getPhaseForBanner();
  if (text) {
    const banner = document.createElement("div"); 
    document.body.appendChild(banner); 
    banner.innerText = text;
    banner.className = 'srf-tools__banner';
  }
};

const removeBanner = () => {
  const banner = document.getElementsByClassName('srf-tools__banner');
  if (banner.length > 0) {
    banner[0].remove();
  }
};

const showEnvironmentBadge = () => {
  chrome.storage.sync.get("shouldShowEnvironment", ({ shouldShowEnvironment }) => {
    // prevent duplicating the banner by removing it first, then adding it if the
    // settings demand it
    removeBanner();

    if (shouldShowEnvironment) {
      addBanner();
    }
  });
}

// do the dance on page load
showEnvironmentBadge();

// do the thing on hash/page change
window.onhashchange = function() { 
	showEnvironmentBadge();
}

// do the thing when receiving a message from the extension
chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.action == "showEnvironmentBadge")
      showEnvironmentBadge();
  }
);
