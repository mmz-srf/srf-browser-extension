Browser extension to make working with SRF/RTR content easier:

* displays a banner with the current environment
* adds an entry to the context menu to directly edit articles/landingpages in the CMS
* shows actions in the popup panel to edit articles/landingpages/livetickers
* link collection for front and backend
* daily standup feature for JIRA - maximizes board, displays team members
* supports dark theme
* developer/experimental view with additional links and actions (e.g. webview, JSON view)

:exclamation: Currently, only Chrome is supported :exclamation


### Local Setup (WIP)
```
git clone git@github.com:mmz-srf/srf-browser-extension.git
cd srf-browser-extension

# https://parceljs.org/recipes/web-extension/
npm install
npm run build # creates the dist directory
npm run start # starts the dev server in watch mode
```

Load the unpacked extension by following this [guide](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) and using the `dist` directory.

"unpacked" means that the extension is now loaded from the web store but that it is loaded as-is from your local directory.


### Auto-Publishing
The extension is automatically published to the Chrome Web Store when a Pull Request is merged into the `main` branch.

:exclamation: Don't forget to update the version number in `manifest.json` before merging.
