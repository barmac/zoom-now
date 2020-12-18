const urls = [
  "https://*.zoom.us/j/*",
  "https://zoom.us/j/*"
];

const browser = globalThis.browser || globalThis.chrome;

browser.webRequest.onBeforeRequest.addListener(redirectToZoomApp, { urls }, [ 'blocking' ]);

function redirectToZoomApp(details) {
  const { url } = details;
  const parsedUrl = new URL(url);

  const roomNumber = /^.+\/j\/(\d+)/.exec(url)[1];
  const password = parsedUrl.searchParams.get('pwd');

  const queryParams = new URLSearchParams(Object.entries({
    action: 'join',
    confno: roomNumber,
    pwd: password
  }));

  const redirectUrl = `zoommtg://${parsedUrl.hostname}/join?${queryParams.toString()}`;

  return {
    redirectUrl
  }
}
