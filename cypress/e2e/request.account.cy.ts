
interface SecurityQuestion {
  id: number;
  question: string;
}

describe('Register account and this should request access', () => {
  it("Should open the website, register account, and request access",() => {
    cy.intercept('GET', '/api/auth/register', { fixture: 'registrationData.json' }).as('getRegistrationData');
    cy.visit('http://localhost:3000');
    cy.wait('@getRegistrationData');
    cy.get('p').contains('Create account here').click();
    cy.get('p.top-text').should('have.text', 'Create Account');
    cy.get('.register-modal').within(() => {
      cy.get('input[placeholder="First name"]').type('John');
      cy.get('input[placeholder="Last name"]').type('Doe');
      cy.get('input[placeholder="Username"]').type('johndoe123');
      cy.get('input[placeholder="Enter password"]').type('john123');
      cy.get('input[placeholder="Confirm password"]').type('john123');
      const securityQuestions: SecurityQuestion[] = require('../fixtures/registrationData.json').securityQuestions;
      const desiredQuestions = securityQuestions.filter(question => {
        return question.question === "What is your favorite color?" ||
               question.question === "What is your favorite food?" ||
               question.question === "What is your mother's maiden name?";
      });
      cy.get('select').each(($select, index) => {
        const question = desiredQuestions[index];
        if (question) {
          cy.wrap($select).select(question.id.toString());
        }
      });
      cy.get('div.questions-input').each(($div, divIndex) => {
        cy.wrap($div).within(() => {
          cy.get('input').each(($input, inputIndex) => {
            const answers = [
              "Red",
              "Spaghetti",
              "Jane Doe"
            ];
            cy.wrap($input).type(answers[divIndex]);
          });
        });
      });
      cy.get('button').should('have.text', 'Request').click()
    });
    cy.get('div.swal2-popup').within(() => {
      cy.get('button.swal2-confirm').click()
    })
  });
});
