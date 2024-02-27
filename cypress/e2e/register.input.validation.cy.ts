
interface SecurityQuestion {
    id: number;
    question: string;
  }
  
  describe('Return error due to invalid or blank inputs', () => {
    it("should open a swal modal due to invalid input in first name",() => {
      cy.intercept('GET', '/api/auth/register', { fixture: 'registrationData.json' }).as('getRegistrationData');
      cy.visit('http://localhost:3000');
      cy.wait('@getRegistrationData');
      cy.get('p').contains('Create account here').click();
      cy.get('p.top-text').should('have.text', 'Create Account');
      cy.get('.register-modal').within(() => {
        cy.get('input[placeholder="First name"]').type('John12');
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
        cy.get('div.swal2-html-container').should('have.text', 'Please enter a valid first name')
      })
    });
    it("should open a swal modal due to blank input in first name",() => {
      cy.intercept('GET', '/api/auth/register', { fixture: 'registrationData.json' }).as('getRegistrationData');
      cy.visit('http://localhost:3000');
      cy.wait('@getRegistrationData');
      cy.get('p').contains('Create account here').click();
      cy.get('p.top-text').should('have.text', 'Create Account');
      cy.get('.register-modal').within(() => {
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
        cy.get('div.swal2-html-container').should('have.text', 'Please enter a valid first name')
      })
    });
    it("should open a swal modal due to invalid input in last name",() => {
      cy.intercept('GET', '/api/auth/register', { fixture: 'registrationData.json' }).as('getRegistrationData');
      cy.visit('http://localhost:3000');
      cy.wait('@getRegistrationData');
      cy.get('p').contains('Create account here').click();
      cy.get('p.top-text').should('have.text', 'Create Account');
      cy.get('.register-modal').within(() => {

        cy.get('input[placeholder="First name"]').type('John');
        cy.get('input[placeholder="Last name"]').type('Doe2');
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
        cy.get('div.swal2-html-container').should('have.text', 'Please enter a valid last name')
      })
    });
    it("should open a swal modal due to blank input in last name",() => {
      cy.intercept('GET', '/api/auth/register', { fixture: 'registrationData.json' }).as('getRegistrationData');
      cy.visit('http://localhost:3000');
      cy.wait('@getRegistrationData');
      cy.get('p').contains('Create account here').click();
      cy.get('p.top-text').should('have.text', 'Create Account');
      cy.get('.register-modal').within(() => {

        cy.get('input[placeholder="First name"]').type('John');
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
        cy.get('div.swal2-html-container').should('have.text', 'Please enter a valid last name')
      })
    });
    it("should open a swal modal due to password and confirm password being not the same",() => {
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
        cy.get('input[placeholder="Confirm password"]').type('john1232');
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
        cy.get('div.swal2-html-container').should('have.text', 'Passwords do not match')
      })
    });
    it("should open a swal modal due to security questions not answered",() => {
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
        cy.get('input[placeholder="Confirm password"]').type('john1232');
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
        cy.get('button').should('have.text', 'Request').click()
      });
      cy.get('div.swal2-popup').within(() => {
        cy.get('div.swal2-html-container').should('have.text', 'Please enter a valid security question answer')
      })
    });
  });
  