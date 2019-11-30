const { loginForm } = require('../fixtures/objectMapping.js');

    Cypress.Commands.add("login", ({ username, password }) => { 
        cy.get(loginForm.username.textbox).click().clear().type(username)
        cy.get(loginForm.password.textbox).click().clear().type(password)
        cy.get(loginForm.loginButton).click()
     })