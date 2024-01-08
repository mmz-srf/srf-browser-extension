const btnSwitchDevModeOff = document.querySelector(".js-switch-dev-mode-off");
const btnSwitchDevModeOn = document.querySelector(".js-switch-dev-mode-on");

const addEventListeners = () => {
  btnSwitchDevModeOff.addEventListener("click", async () => {
    chrome.storage.sync.set({ showDeveloperStuff: false });
    showOrHideDevStuff(false);
  });

  btnSwitchDevModeOn.addEventListener("click", async () => {
    chrome.storage.sync.set({ showDeveloperStuff: true });
    showOrHideDevStuff(true);
  });
};

const showOrHideDevStuff = (showDeveloperStuff) => {
  if (showDeveloperStuff) {
    btnSwitchDevModeOff.style.display = '';
    btnSwitchDevModeOn.style.display = 'none';
  } else {
    btnSwitchDevModeOff.style.display = 'none';
    btnSwitchDevModeOn.style.display = '';
  }

  const displayValue = showDeveloperStuff ? '' : 'none';
  document
    .querySelectorAll(".js-dev-only")
    .forEach(node => node.style.display = displayValue);
};


chrome.storage.sync.get("showDeveloperStuff", ({ showDeveloperStuff }) => {
  showOrHideDevStuff(showDeveloperStuff);
});

addEventListeners();
