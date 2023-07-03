// https://docs.cypress.io/api/introduction/api.html

describe('Test home page on mobile viewport', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/')
  })

  it('can toggle the navbar menu', () => {
    cy.get('[aria-label="Close menu"]').should('not.exist')
    cy.get('input[placeholder="Search"]').should('not.be.visible')

    cy.get('[aria-label="Open menu"]').click()
    cy.get('[aria-label="Open menu"]').should('not.exist')
    cy.get('input[placeholder="Search"]').should('be.visible')

    cy.get('[aria-label="Close menu"]').click()
    cy.get('[aria-label="Close menu"]').should('not.exist')
    cy.get('input[placeholder="Search"]').should('not.be.visible')
  })

  it('can add and remove a product from the shopping cart', () => {
    // Adding first product.
    cy.get('[aria-label="Toggle shopping cart"]').should('not.be.visible')

    cy.get('[aria-label="Add product"]')
      .should('be.visible')
      .eq(1)
      .should('be.visible')
      .click()

    cy.get('[aria-label="Toggle shopping cart"]')
      .should('be.visible')
      .contains(1)

    cy.contains('My shopping cart:').should('not.be.visible')
    cy.get('button:contains("To checkout")').should('be.not.visible')

    // swiping the carousel.
    cy.get('.carousel-container')
      .first()
      .trigger('touchstart', { touches: [{ clientX: 80 }] })
      .trigger('touchmove', { touches: [{ clientX: 20 }] })
      .trigger('touchend')

    // Adding a second product.
    cy.get('[aria-label="Add product"]')
      .should('be.visible')
      .first()
      .click()

    cy.get('[aria-label="Toggle shopping cart"]')
      .should('be.visible')
      .contains(2)

    cy.get('[aria-label="Toggle shopping cart"]:visible')
      .last()
      .click()

    cy.get('a:contains("To checkout")')
      .filter(':visible')
      .should('to.have.lengthOf', 1)

    cy.get(':contains("Subtotal")')
      .filter(':visible')
      .closest('p')
      .parent()
      .contains('$11.90')

    // Increment first product's quantity.
    cy.get('[aria-label="Increment product quantity"]')
      .filter(':visible')
      .first()
      .dblclick()

    cy.get(':contains("Subtotal")')
      .filter(':visible')
      .closest('p')
      .parent()
      .contains('$27.30')

    // Decrement first product's quantity.
    cy.get('[aria-label="Decrement product quantity"]')
      .filter(':visible')
      .first()
      .click()

    cy.get(':contains("Subtotal")')
      .filter(':visible')
      .closest('p')
      .parent()
      .contains('$19.60')

    // Removing the first product.
    cy.get('[aria-label="Remove product"]')
      .filter(':visible')
      .first()
      .click()

    cy.get(':contains("Subtotal")')
      .filter(':visible')
      .closest('p')
      .parent()
      .contains('$4.20')

    cy.get('[aria-label="Toggle shopping cart"]')
      .should('be.visible')
      .contains(1)
  })
})
