const getPhaseForBanner = () => {
  const { hostname, port, pathname } = window.location;

  const testHosts = ['www-test.srf.ch', 'www-test.rtr.ch', 'nora.dev.srfdigital.ch', 'srf-comments-dev.herokuapp.com', 'aron.dev.srf.ch'];
  const stageHosts = ['play-web-staging.herokuapp.com', 'www-stage.srf.ch', 'www-stage.rtr.ch', 'nora.int.srfdigital.ch', 'srf-comments-int.herokuapp.com', 'aron.int.srf.ch'];
  const prodHosts = ['play-web.herokuapp.com', 'www.srf.ch', 'www.rtr.ch', 'nora.srfdigital.ch', 'comments.srfdigital.ch', 'aron.srf.ch'];
  const localHosts = ['dev.srf.ch', 'dev.rtr.ch', 'pascal.srf.ch', 'pascal.rtr.ch'];

  if (testHosts.find((host) => hostname.includes(host))) {
    return 'TEST';
  } else if (stageHosts.find((host) => hostname.includes(host))) {
    return 'STAGE';
  } else if (prodHosts.find((host) => hostname.includes(host))) {
    return 'PROD';
  } else if (localHosts.find((host) => hostname.includes(host))) {
    return 'DEV';
  }

  // special cases for PR apps: regex to the rescue
  const pacTestRegex = /^play-web-pr-\d+\.herokuapp\.com$/;
  if (pacTestRegex.test(hostname)) {
    return 'TEST';
  }
  const noraTestRegex = /^nora-pr-\d+\.herokuapp\.com$/;
  if (noraTestRegex.test(hostname)) {
    return 'TEST';
  }

  // local dev environments have little useful info in the hostname
  if (hostname === 'localhost') {
    // Nora local: http://localhost:6900/ui/portal/*
    // Play FE local: http://localhost:4000/srf/play/tv
    // Play BE local: http://localhost:4004/pac/*
    // Aron FE local: http://localhost:4200/*

    if (
      (port === "6900" && pathname.startsWith('/ui/')) ||
      (port === "4000" && pathname.split('/')[2] === 'tv') ||
      (port === "4004" && pathname.startsWith('/pac/')) ||
      (port === "4200")
    ) {
      return 'DEV';
    }
  }

  return '';
}

const addBanner = () => {
  const text = getPhaseForBanner();

  if (text) {
    const banner = document.createElement("div"); 
    document.body.appendChild(banner); 
    banner.innerText = text;
    banner.className = 'srf-tools__banner srf-tools__banner--' + text.toLowerCase();
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
