const showDevStuffCheckbox = document.getElementById("showDeveloperStuff");

// load user settings, set states of checkboxes
const setOptionsFromStorage = () => {
  chrome.storage.sync.get("showDeveloperStuff", ({ showDeveloperStuff }) => {
    showDevStuffCheckbox.checked = !!showDeveloperStuff;
  });
};

const setupInputListeners = () => {
  showDevStuffCheckbox.addEventListener("click", async () => {
    chrome.storage.sync.set({ showDeveloperStuff: showDevStuffCheckbox.checked });
  });
};

// what to do when the options page is opened
const onLoad = () => {
  setOptionsFromStorage();
  setupInputListeners();
};

onLoad();
