const teams = [
  {
    "members": [
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-UC18WN3GT-1dda85d46388-48",
        "name": "Bianca"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U026NKTJP-bcf09b8d2537-512",
        "name": "Caro"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-UFUPSJ4DP-1e4bf785e8c2-48",
        "name": "Marcel"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U03FAJB0Q5Q-06cbc577ceb8-512",
        "name": "Caroline"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-UCVR7DJ7R-4b97016e03f8-48",
        "name": "Sibylle"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U06BUSPM5ST-8ed56555e486-512",
        "name": "Sämi"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U06MZCWK9HV-6ccbdbb48841-512",
        "name": "Ale"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U0TDTTJ6T-11ba3cd42dda-48",
        "name": "Tilman"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U038DTK5248-9be543d3d85c-48",
        "name": "Ueli"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U047NQ00Y72-92d8bc2f8639-48",
        "name": "Dennis"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U053J7GHFFG-b63f489e116d-512",
        "name": "Jerome"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U05L56C3L1M-58dd998e9cfb-512",
        "name": "Yves"
      },
      {
        "img": "https://ca.slack-edge.com/T026NDFG3-U066YRBLLGN-g0d79d1f02b7-512",
        "name": "David"
      }
    ],
    "name": "Play"
  },
  {
    "name": "Ivory",
    "members": [
      {
        "name": "Ian",
        "img": "https://ca.slack-edge.com/T026NDFG3-U076X0WF464-dad49d1a4241-48"
      },
      {
        "name": "Hasan",
        "img": "https://ca.slack-edge.com/T026NDFG3-U08J673RN-7f9fe51ba6f2-48"
      },
      {
        "name": "Joel",
        "img": "https://ca.slack-edge.com/T026NDFG3-U04AX95JM-81683c336a6f-48"
      },
      {
        "name": "Misch",
        "img": "https://ca.slack-edge.com/T026NDFG3-U39TJL7N3-f1f839b4a0bc-48"
      },
      {
        "name": "Pascal",
        "img": "https://ca.slack-edge.com/T026NDFG3-U026NR0JS-aff666d5d0d7-48"
      },
      {
        "name": "Patrick",
        "img": "https://ca.slack-edge.com/T026NDFG3-U026NQPG1-5d287676eddb-48"
      },
      {
        "name": "Phil",
        "img": "https://ca.slack-edge.com/T026NDFG3-U277M8CG0-e2db4505a3ad-48"
      },
      {
        "name": "Stefan",
        "img": "https://ca.slack-edge.com/T026NDFG3-U02N61YF8-560795681709-48"
      },
      {
        "name": "Urban",
        "img": "https://ca.slack-edge.com/T026NDFG3-U026NDFG5-97adfda5a6ee-72"
      },
      {
        "name": "Ben",
        "img": "https://ca.slack-edge.com/T026NDFG3-U0511NWMN6B-20a08f419cc2-72"
      },
    ]
  },
  {
    "name": "Cobalt",
    "members": [
      {
        "name": "Markus",
        "img": "https://ca.slack-edge.com/T026NDFG3-U02D0UZL6CT-633069b8de56-72",
      },
      {
        "name": "Manu",
        "img": "https://ca.slack-edge.com/T026NDFG3-U03NNRVN7UG-0d8f7af81f53-72",
      },
      {
        "name": "Manuel",
        "img": "https://ca.slack-edge.com/T026NDFG3-U02URMYFVQD-16df8f5bdee7-72",
      },
      {
        "name": "Santiago",
        "img": "https://ca.slack-edge.com/T026NDFG3-U056QJFRE9Z-0180a4624c97-72",
      },
      {
        "name": "Andreas",
        "img": "https://ca.slack-edge.com/T026NDFG3-U054ER3TZAA-cdd878618974-72",
      },
      {
        "name": "Gianni",
        "img": "https://ca.slack-edge.com/T026NDFG3-U027VC5K2-g419178991e8-48"
      },
      {
        "name": "Kierthanan",
        "img": "https://ca.slack-edge.com/T026NDFG3-UGUL6CV0S-2e16ad3219e6-48"
      },
      {
        "name": "Luzius",
        "img": "https://ca.slack-edge.com/T026NDFG3-U56MSCFFT-b6733e2faca1-48"
      },
      {
        "name": "Martina",
        "img": "https://ca.slack-edge.com/T026NDFG3-U028YK32V-88ddfb2e6269-48"
      },
      {
        "name": "Simon",
        "img": "https://ca.slack-edge.com/T026NDFG3-U0DL8DTNF-8bd9712d9744-48"
      }
    ]
  }
];

const setJiraFullscreen = (shouldBeFullscreen) => {
  try {
    const button = document.querySelector('[data-testid="platform.ui.fullscreen-button.fullscreen-button"]');
    const ariaLabel = document.querySelector('[data-testid="platform.ui.fullscreen-button.fullscreen-button"] span[role="img"]').ariaLabel;
    const isAlreadyFullscreen = ariaLabel.startsWith("Exit") || ariaLabel.endsWith("verlassen");

    if (shouldBeFullscreen && !isAlreadyFullscreen) {
      button.click();
    }
    
    if (!shouldBeFullscreen && isAlreadyFullscreen) {
      button.click();
    }
  } catch (error) {}
};

const renderUI = () => {
  // Render container
  const container = document.createElement('div');
  document.body.appendChild(container);
  container.className = 'srf-extension-daily srf-extension-daily--closed';

  const optionsContainer = document.createElement('div');
  container.appendChild(optionsContainer);
  optionsContainer.className = 'srf-extension-daily__ui-container';

  // Render option button
  const optionsButton = document.createElement('button'); 
  optionsContainer.appendChild(optionsButton);
  optionsButton.className = 'srf-extension-daily__options';
  optionsButton.textContent = '⚙️';

  // Render Select
  const select = document.createElement('select');
  select.className = 'srf-extension-daily__select';
  select.style.display = 'none';
  optionsContainer.appendChild(select);

  // Render teams options
  teams.forEach(team => {
    const option = document.createElement('option');
    option.value = team.name;
    option.text = team.name;
    select.appendChild(option);
  });

  // change teams when select changes (& save selection)
  select.addEventListener('change', () => {
    chrome.storage.sync.set({ 'selectedTeamName': select.value }).then(() => {
      renderTeam(container, select.value);
      optionsButton.style.display = '';
      select.style.display = 'none';
    });
  });

  // Render Toggle button
  const dailyButton = document.createElement('button'); 
  optionsContainer.appendChild(dailyButton);
  dailyButton.className = 'srf-extension-daily__toggle';
  dailyButton.textContent = '🗓️';

  // open/close daily container when clicking the toggle button & set jira to fullscreen
  dailyButton.addEventListener('click', () => {
    const willBeOpen = container.classList.contains('srf-extension-daily--closed');
    container.classList.toggle('srf-extension-daily--closed');
    setJiraFullscreen(willBeOpen);
  });

  // show select when clicking on options button
  optionsButton.addEventListener('click', () => {
    optionsButton.style.display = 'none';
    select.style.display = '';
  });

  return { container, select };
};

const renderTeam = (container, teamName) => {
  // it's possible  to change teams after it was rendered, so before rendering we need to remove previously rendered teams
  const previousElements = container.querySelectorAll('input, label');
  previousElements.forEach(node => node.remove());

  const teamSetup = teams.find(team => team.name === teamName).members;

  // create and shuffle team members
  teamSetup.sort(() => Math.random() - 0.5).forEach(person => {
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', person.name);
    input.setAttribute('name', person.name);
    container.appendChild(input);

    const label = document.createElement('label');
    label.setAttribute('for', person.name);
    label.textContent = person.name;
    container.appendChild(label);

    const img = document.createElement('img');
    img.setAttribute('src', person.img ?? 'https://ca.slack-edge.com/T026NDFG3-U066YRBLLGN-g0d79d1f02b7-512');
    label.appendChild(img);
  });
}

const addContent = () => {
  const { container, select } = renderUI();

  chrome.storage.sync.get('selectedTeamName', ({ selectedTeamName }) => {
    if (!selectedTeamName) {
      selectedTeamName = teams[0].name;
    }
    select.value = selectedTeamName;
    renderTeam(container, selectedTeamName);
  });
}


addContent();
