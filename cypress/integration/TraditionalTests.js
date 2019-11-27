const { mainData } = require('../fixtures/dataInputs.js');
const { loginForm } = require('../fixtures/objectMapping.js');
const { loginFormData } = require('../fixtures/objectData.js');

it(`Login Page UI Elements Test`, () => {
    /// Navigate to URL
    cy.visit(mainData.url)
    /// Assert that the page title is the expected by checking the page title
    cy.title().should('eq', mainData.titlePage)
    /// Assert that the page logo is the correct file source
    cy.get(loginForm.logo).should('have.attr', 'src', loginFormData.logoImageSource)
    /// Assert the header 4 is the expected one
    cy.get(loginForm.header).should('contain', loginFormData.headerText)
    /// Assert the pre icon it's the expected one
    cy.get(loginForm.username.icon).should('have.attr', 'class').should('contain', loginFormData.username.iconReference)
    /// Assert that there is a label for Username
    cy.get(loginForm.username.label).should('contain', loginFormData.username.labelText)
    /// Assert the placeholder for Username text field
    cy.get(loginForm.username.textbox).should('have.attr', 'placeholder', loginFormData.username.textboxPlaceholder)
    /// Assert the pre icon 2 it's the expected one
    cy.get(loginForm.password.icon).should('have.attr', 'class').should('contain', loginFormData.password.iconReference)
    /// Assert that there is a label for Password
    cy.get(loginForm.password.label).should('contain', loginFormData.password.labelText)
    /// Assert the placeholder for Password text field
    cy.get(loginForm.password.textbox).should('have.attr', 'placeholder', loginFormData.password.textboxPlaceholder)
    /// Assert the text in Log In button
    cy.get(loginForm.loginButton).should('have.text', loginFormData.loginButtonText)
    /// Assert there is a 'Remember Me' text
    cy.get(loginForm.rememberMeLabel).should('have.text', loginFormData.rememberMeLabelText)
    /// Assert that twitter button has the correct image source
    cy.get(loginForm.socialIcons.twitter).find('img').should('have.attr', 'src', loginFormData.socialIcons.twitterSource)
    /// Assert that facebook button has the correct image source
    cy.get(loginForm.socialIcons.facebook).should('have.attr', 'src', loginFormData.socialIcons.facebookSource)
    /// Assert that linkedin button has the correct image source
    cy.get(loginForm.socialIcons.linkedin).should('have.attr', 'src', loginFormData.socialIcons.linkedinSource)
})