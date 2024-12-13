export function getPartUrls(partId, pdpAisId, phase) {
  let partProxyUrl, partPdpUrl, partIlUrl;

  switch (phase) {
    case "LOCAL":
      partProxyUrl = `https://srf-epg-proxy.herokuapp.com/eaw/episodeParts/${partId}`;
      partPdpUrl = `https://api.pdp.production.srgssr.ch/api/v2/programmes/urn%3Apdp%3Aais_srf%3Aprogramme%3A${partId}`;
      partIlUrl = `http://il.srgssr.ch/integrationlayer/2.0/srf/srfMedia/${partId}`;
      break;
    case "DEV":
      partProxyUrl = `https://srf-epg-proxy-test.herokuapp.com/eaw/episodeParts//${partId}`;
      partPdpUrl = `https://mediathek.pdp.dev.srgssr.ch/api/testing/programmes/${partId}`;
      partIlUrl = `http://il-test.srgssr.ch/integrationlayer/2.0/srf/srfMedia/${partId}`;
      break;
    case "INT":
      partProxyUrl = `https://srf-epg-proxy-stage.herokuapp.com/eaw/episodeParts/${partId}`;
      partPdpUrl = `https://mediathek.pdp.int.srgssr.ch/api/testing/programmes/${partId}`;
      partIlUrl = `http://il-stage.srgssr.ch/integrationlayer/2.0/srf/srfMedia/${partId}`;
      break;
    case "PROD":
    default:
      partProxyUrl = `https://srf-epg-proxy.herokuapp.com/eaw/episodeParts/${partId}`;
      partPdpUrl = `https://api.pdp.production.srgssr.ch/api/v2/programmes/urn%3Apdp%3Aais_srf%3Aprogramme%3A${partId}`;
      partIlUrl = `http://il.srgssr.ch/integrationlayer/2.0/srf/srfMedia/${partId}`;
      break;
  }

  return { partProxyUrl, partPdpUrl, partIlUrl };
}
