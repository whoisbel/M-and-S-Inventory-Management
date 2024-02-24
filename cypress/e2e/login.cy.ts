


describe('Register account and login', () => {
  it("Should open the website",() => {
    cy.visit('http://localhost:3000')
    cy.get('p').contains('Create account here').click()
    cy.get('div').contains('M&S Company').get('input[placeholder="Username"]').click().type('johndoe123')
    cy.get('input[placeholder="First name"]').click().type('John')
    cy.get('input[placeholder="Last name"]').click().type('Doe')
  //   cy.get('input[placeholder="Enter Password"]').click().type('john123')
  //   cy.get('input[placeholder="Confirm Password"]').click().type('john123')
  //   cy.get('button[type="submit"]').click() // Assuming there's a submit button to register
  // })
  })
})