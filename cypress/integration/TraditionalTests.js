const { mainData } = require('../fixtures/dataInputs.js')
const { loginForm, app, chart, add } = require('../fixtures/objectMapping.js')
const { loginFormData, alert } = require('../fixtures/objectData.js')

describe('Login Form UI Elements', () =>  {
    beforeEach(() =>  {
        /// Navigate to URL
        cy.visit(mainData.url)
        /// Assert that the page title is the expected by checking the page title
        cy.title().should('eq', mainData.titlePage)
    })

    it(`Test the logo`, () => {
        /// Assert that the page logo is the correct file source
        cy.get(loginForm.logo).should('have.attr', 'src', loginFormData.logoImageSource)
        /// Assert the header 4 contains the expected text
        cy.get(loginForm.header).then(header => {
            expect(header.text()).to.contain(loginFormData.headerText)
        })
    })

    it(`Test the Username component`, () => {
        /// Assert the pre icon it's the expected one
        cy.get(loginForm.username.icon).should('have.attr', 'class').should('contain', loginFormData.username.iconReference)
        /// Assert that there is a label for Username
        cy.get(loginForm.username.label).should('contain', loginFormData.username.labelText)
        /// Assert the placeholder for Username text field
        cy.get(loginForm.username.textbox).should('have.attr', 'placeholder', loginFormData.username.textboxPlaceholder)
    })

    it(`Test the Password component`, () => {
        /// Assert the pre icon 2 it's the expected one
        cy.get(loginForm.password.icon).should('have.attr', 'class').should('contain', loginFormData.password.iconReference)
        /// Assert that there is a label for Password
        cy.get(loginForm.password.label).should('contain', loginFormData.password.labelText)
        /// Assert the placeholder for Password text field
        cy.get(loginForm.password.textbox).should('have.attr', 'placeholder', loginFormData.password.textboxPlaceholder)
    })

    it(`Test the login button and remember me`, () => {
        /// Assert the text in Log In button
        cy.get(loginForm.loginButton).should('have.text', loginFormData.loginButtonText)
        /// Assert there is a 'Remember Me' text
        cy.get(loginForm.rememberMeLabel).should('have.text', loginFormData.rememberMeLabelText)
    })

    it(`Test the social icons`, () => {
        /// Assert that twitter button has the correct image source
        cy.get(loginForm.socialIcons.twitter).find('img').should('have.attr', 'src', loginFormData.socialIcons.twitterSource)
        /// Assert that facebook button has the correct image source
        cy.get(loginForm.socialIcons.facebook).should('have.attr', 'src', loginFormData.socialIcons.facebookSource)
        /// Assert that linkedin button has the correct image source
        cy.get(loginForm.socialIcons.linkedin).should('have.attr', 'src', loginFormData.socialIcons.linkedinSource)
    })
})

describe('Data-Driven Test', () =>  {
    beforeEach(() =>  {
        /// Navigate to URL
        cy.visit(mainData.url)
    })

    it(`Test error message when no Username nor Password provided`, () => {
        cy.get(loginForm.loginButton).click()
        cy.get(loginForm.alert).should('have.text', alert.noUsernamePassword)
    })

    it(`Test error message when no Password provided`, () => {
        cy.get(loginForm.username.textbox).type(mainData.username)
        cy.get(loginForm.loginButton).click()
        cy.get(loginForm.alert).should('have.text', alert.noPassword)
    })

    it(`Test error message when no Username provided`, () => {
        cy.get(loginForm.password.textbox).type(mainData.password)
        cy.get(loginForm.loginButton).click()
        cy.get(loginForm.alert).should('have.text', alert.noUsername)
    })

    it(`Test Login successful when providind Username and Password`, () => {
        cy.get(loginForm.username.textbox).type(mainData.username)
        cy.get(loginForm.password.textbox).type(mainData.password)
        cy.get(loginForm.loginButton).click()
        cy.url().should('to.contain', mainData.urlApp)
    })
})

describe('Table Sort Test', () =>  {
    beforeEach(() =>  {
        /// Navigate to URL
        cy.visit(mainData.url)
        cy.login({ username: mainData.username, password: mainData.password })
        cy.get(app.transactionsTable).should('be.visible')
    })

    it(`Test the sorting by Amounts`, () => {
        let amountsOrigin = []
        let amounts = []
        let rowsData = []
        let description = []

        cy.get(app.transactionTable.amountsRow).each((line, index, $list) => {
            amounts.push(Number((line.text().split(' USD')[0]).replace(/[ ,]/g, "")))
            amountsOrigin.push(Number((line.text().split(' USD')[0]).replace(/[ ,]/g, "")))
            rowsData.push(line.parent().find(app.transactionTable.rowsData).text());
            description.push(line.parent().find(app.transactionTable.descriptionRow).text())

            if (index === $list.length - 1) {
                amounts.sort(function (i, j) {
                    return i - j
                })
                cy.get(app.transactionTable.amountTitle).click();
                cy.get(app.transactionTable.amountsRow).each((line, index) => {
                    expect((line.text().split(' USD')[0]).replace(/[ ,]/g, "")).to.contain(amounts[index])
                    const previousIndex = amountsOrigin.indexOf(amounts[index])
                    expect(rowsData[previousIndex]).to.contain(line.parent().find(app.rowsData).text())
                    expect(description[previousIndex]).to.contain(line.parent().find(app.descriptionRow).text())
                })
            }
        })
    })
})

describe('Canvas Chart Test', () =>  {
    beforeEach(() =>  {
        /// Navigate to URL
        cy.visit(mainData.url)
        cy.login({ username: mainData.username, password: mainData.password })
        cy.get(app.transactionsTable).should('be.visible')
    })

    it(`Canvas Chart Test`, () => {
        cy.get(app.showExpensesChart).click()
        cy.get(chart.canvas).should('be.visible')
        // ! 'This is not the right tool to test the Chart content' !
    })
})

describe('Dynamic Content Test', () =>  {
    beforeEach(() =>  {
        /// Navigate to URL
        cy.visit(mainData.urlAdds)
        cy.login({ username: mainData.username, password: mainData.password })
        cy.get(app.transactionsTable).should('be.visible')
    })

    it(`Test for the existence of the display ads`, () => {
        cy.get(add.flashSale).should('be.visible')
        cy.get(add.flashSaleTwo).should('be.visible')
    })
})