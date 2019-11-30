const { mainData } = require('../fixtures/dataInputs.js')
const { loginForm, app, chart, add } = require('../fixtures/objectMapping.js')
const versionUrl = Cypress.env('v2') ? mainData.urlV2 : mainData.url;

describe('Form Visual Validation', () =>  {
    beforeEach(() =>  {
        /// Navigate to URL
        cy.visit(versionUrl)
        cy.eyesOpen({appName: 'Applitools Demo App - Hackaton', batchName: 'Login Page'})
    })

    it(`Test the UI looks`, () => {
        cy.eyesCheckWindow('Test UI Components')
        
        cy.get(loginForm.loginButton).click()
        cy.eyesCheckWindow('Test no Username nor Password error')

        cy.get(loginForm.username.textbox).type(mainData.username)
        cy.get(loginForm.loginButton).click()
        cy.eyesCheckWindow('Test no Password error')

        cy.get(loginForm.username.textbox).click().clear()
        cy.get(loginForm.password.textbox).type(mainData.password)
        cy.get(loginForm.loginButton).click()
        cy.eyesCheckWindow('Test no Username error')

        cy.login({ username: mainData.username, password: mainData.password })
        cy.eyesCheckWindow('Test succesful login')
    })

    afterEach(() => cy.eyesClose())
})

describe('Table Sort Test', () =>  {
    beforeEach(() =>  {
        /// Navigate to URL
        cy.visit(versionUrl)
        cy.login({ username: mainData.username, password: mainData.password })
        cy.eyesOpen({appName: 'Applitools Demo App - Hackaton', batchName: 'App'})
    })

    it(`Test the sorting by Amounts`, () => { 
        cy.eyesCheckWindow('Test App UI View')
        cy.get(app.transactionTable.amountTitle).click();
        cy.eyesCheckWindow('Test sorting is correct')
    })

    afterEach(() => cy.eyesClose())
})

describe('Canvas Chart Test', () =>  {
    beforeEach(() =>  {
        /// Navigate to URL
        cy.visit(versionUrl)
        cy.login({ username: mainData.username, password: mainData.password })
        cy.eyesOpen({appName: 'Applitools Demo App - Hackaton', batchName: 'Chart'})
    })

    it(`Canvas Chart Test`, () => {
        cy.get(app.showExpensesChart).click().wait(1000)
        cy.eyesCheckWindow('Test Canvas Chart Test')
        
        cy.get(chart.nextYear).click().wait(1000)
        cy.eyesCheckWindow('Chart with Data next Year')
    })

    afterEach(() => cy.eyesClose())
})

describe('Dynamic Content Test', () =>  {
    beforeEach(() =>  {
        /// Navigate to URL
        cy.visit(`${versionUrl}?showAd=true`)
        cy.login({ username: mainData.username, password: mainData.password })
        cy.eyesOpen({appName: 'Applitools Demo App - Hackaton', batchName: 'Dynamic Content', matchLevel: 'Layout'})
    })

    it(`Test for the existence of the display ads`, () => {
        cy.eyesCheckWindow({sizeMode: 'selector', selector: add.flashSale})
        cy.eyesCheckWindow({sizeMode: 'selector', selector: add.flashSaleTwo})
    })

    afterEach(() => cy.eyesClose())
})