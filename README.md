# Applitools Hackathon - Sergio Blanco

<h2 id="getting-started">Getting started</h2>

Start by cloning the project.
```
git clone https://github.com/<your_username>/applitoolshackaton.git
```
Once you have the repo, install dependencies with:
```
npm install
```

<h2 id="testing">Cypress Tests</h2>

Verify that Cypress is installed correctly and is executable:
```
npm run cypress:verify
```

To open the Cypress Test Runner:
```
npm run cypress:open
```

To run Cypress tests to completion (second line for V2):

`npm run cypress:run` - To run version 1 of the app
`npm run cypress:runV2` - To run version 2 of the app

Note: By default will run all tests (Traditional and Visual) headlessly in the Electron browser.
