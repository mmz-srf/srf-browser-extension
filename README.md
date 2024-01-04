Tired of looking up the ContentId of srf articles? Sick of outdated bookmarklets that the developer swore would work?

Look no further!

This bad boy

* displays an ugly banner with the current environment so you're never confused anymore if you're on TEST or PROD and if your "hurr durr test article lol" might be seen by dozens or thousands
* offers you dynamic links for the currently opened article or landingpage, e.g. JSON representation or webviews
* offer links directly to EDITH or KURT/GLOBI to fix whatever the original author broke
* has a list of handy-dandy links that you might use often but are too lazy to save in your bookmarks
* can be updated by the CMS developers, so if something breaks you can actually be mad at someone!
* comes in 2 fashionable color themes: aaaaah-my-eyes white and whats-that-on-my-screen black


### Local Setup (WIP)
```
git clone git@github.com:mmz-srf/srf-browser-extension.git
cd srf-browser-extension
```

Load the unpacked extension by following this [guide](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) and using the srf-browser-extension directory.

"unpacked" means that the extension is now loaded from the web store but that it is loaded as-is from your local directory.


### Auto-Publishing
The extension is automatically published to the Chrome Web Store when a Pull Request is merged into the `main` branch.

:exclamation: Don't forget to update the version number in `manifest.json` before merging.

### TODO
* enhance readme
* redesign
