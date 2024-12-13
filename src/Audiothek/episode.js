export function getEpisodeUrls(episodeId, pdpAisId, phase) {
  let episodeProxyUrl, episodePdpUrl, episodeIlUrl;

  switch (phase) {
    case "LOCAL":
      episodeProxyUrl = `https://srf-epg-proxy.herokuapp.com/eaw/episodes/${episodeId}`;
      episodePdpUrl = `https://api.pdp.production.srgssr.ch/api/v2/programmes/urn%3Apdp%3Aais_srf%3Aprogramme%3A${pdpAisId}`;
      episodeIlUrl = `http://il.srgssr.ch/integrationlayer/2.0/srf/srfMedia/${pdpAisId}`;
      break;
    case "DEV":
      episodeProxyUrl = `https://srf-epg-proxy-test.herokuapp.com/eaw/episodes/${episodeId}`;
      episodePdpUrl = `https://mediathek.pdp.dev.srgssr.ch/api/testing/programmes/${episodeId}`;
      episodeIlUrl = `http://il-test.srgssr.ch/integrationlayer/2.0/srf/srfMedia/${pdpAisId}`;
      break;
    case "INT":
      episodeProxyUrl = `https://srf-epg-proxy-stage.herokuapp.com/eaw/episodes/${episodeId}`;
      episodePdpUrl = `https://mediathek.pdp.int.srgssr.ch/api/testing/programmes/${episodeId}`;
      episodeIlUrl = `http://il-stage.srgssr.ch/integrationlayer/2.0/srf/srfMedia/${pdpAisId}`;
      break;
    case "PROD":
    default:
      episodeProxyUrl = `https://srf-epg-proxy.herokuapp.com/eaw/episodes/${episodeId}`;
      episodePdpUrl = `https://api.pdp.production.srgssr.ch/api/v2/programmes/urn%3Apdp%3Aais_srf%3Aprogramme%3A${pdpAisId}`;
      episodeIlUrl = `http://il.srgssr.ch/integrationlayer/2.0/srf/srfMedia/${pdpAisId}`;
      break;
  }

  return { episodeProxyUrl, episodePdpUrl, episodeIlUrl };
}
