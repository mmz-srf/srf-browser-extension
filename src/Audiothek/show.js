export function getShowUrls(aisShowId, phase, businessUnit) {
  let showProxyUrl, showPdpUrl, ilShowUrl;

  switch (phase) {
    case "LOCAL":
      showProxyUrl = "https://srf-epg-proxy.herokuapp.com/eaw/shows/";
      showPdpUrl = `https://api.pdp.production.srgssr.ch/api/v2/collections/urn%3Apdp%3Aais_srf%3Acollection%3A${aisShowId}`;
      ilShowUrl = `http://il.srgssr.ch/integrationlayer/2.0/srf/show/radio/${aisShowId}`;
      break;
    case "DEV":
      showProxyUrl = "https://srf-epg-proxy-test.herokuapp.com/eaw/shows/";
      showPdpUrl = `https://mediathek.pdp.dev.srgssr.ch/api/testing/shows/${aisShowId}`;
      ilShowUrl = `http://il-test.srgssr.ch/integrationlayer/2.0/${businessUnit}/show/radio/${aisShowId}`;
      break;
    case "INT":
      showProxyUrl = "https://srf-epg-proxy-stage.herokuapp.com/eaw/shows/";
      showPdpUrl = `https://mediathek.pdp.int.srgssr.ch/api/testing/shows/${aisShowId}`;
      ilShowUrl = `http://il-stage.srgssr.ch/integrationlayer/2.0/${businessUnit}/show/radio/${aisShowId}`;
      break;
    case "PROD":
    default:
      showProxyUrl = "https://srf-epg-proxy.herokuapp.com/eaw/shows/";
      showPdpUrl = `https://api.pdp.production.srgssr.ch/api/v2/collections/urn%3Apdp%3Aais_srf%3Acollection%3A${aisShowId}`;
      ilShowUrl = `http://il.srgssr.ch/integrationlayer/2.0/${businessUnit}/show/radio/${aisShowId}`;
      break;
  }

  return { showProxyUrl, showPdpUrl, ilShowUrl };
}
