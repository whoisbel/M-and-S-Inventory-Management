
interface SecurityQuestion {
    id: number;
    question: string;
  }
  
  describe('This should allow user to setup for first time registration', () => {
    it("Should open the website and register account",() => {
      cy.intercept('GET', '/api/auth/register', { fixture: 'setupData.json' }).as('getSetupData');
      cy.visit('http://localhost:3000');
      cy.wait('@getSetupData');
      cy.get('p.top-text').should('have.text', 'Setup Account');
      cy.get('.register-modal', { timeout: 5000}).within(() => {
        cy.get('input[placeholder="First name"]').type('John');
        cy.get('input[placeholder="Last name"]').type('Doe');
        cy.get('input[placeholder="Username"]').type('johndoe123');
        cy.get('input[placeholder="Enter password"]').type('john123');
        cy.get('input[placeholder="Confirm password"]').type('john123');
        const securityQuestions: SecurityQuestion[] = require('../fixtures/setupData.json').securityQuestions;
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
        cy.get('input[placeholder="Enter code"]').type('123456789');
        cy.get('button').should('have.text', 'Create').click()
      });
      cy.get('div.swal2-popup').within(() => {
        cy.get('button.swal2-confirm').click()
      })
    });
  });
  