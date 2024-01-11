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
    document.body.setAttribute('data-mode', 'dev');
  } else {
    btnSwitchDevModeOff.style.display = 'none';
    btnSwitchDevModeOn.style.display = '';
    document.body.setAttribute('data-mode', 'user');
  }
};


chrome.storage.sync.get("showDeveloperStuff", ({ showDeveloperStuff }) => {
  showOrHideDevStuff(showDeveloperStuff);
});

addEventListeners();
