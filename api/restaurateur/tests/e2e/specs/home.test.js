// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')

    cy.contains('Eco food Market')
    cy.contains('Discounted goods')
    cy.contains('What to cook?')
    cy.contains('New additions')
    cy.contains('How we work')
  })
})
