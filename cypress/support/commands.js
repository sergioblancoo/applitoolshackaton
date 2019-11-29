const { loginForm } = require('../fixtures/objectMapping.js');

//
    Cypress.Commands.add("login", ({ username, password }) => { 
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get(loginForm.loginButton).click()
     })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
