// https://docs.cypress.io/api/introduction/api.html
asdfasdfasd
describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'BZoatnet')
  })
})
