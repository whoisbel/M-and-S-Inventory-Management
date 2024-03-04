describe('ForgotPasswordModal component test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.get("p").contains("Forgot password?").click();
    });
    it('should add first name, last name, and username in the input fields', () => {

        cy.get('.user-information-modal').within(() => {
        cy.get('input[placeholder="First Name"]').type('John');
        cy.get('input[placeholder="Last Name"]').type('Doe');
        cy.get('input[placeholder="Username"]').type('johndoe1234');
        cy.get('button').should('have.text', 'Recover Account').click()
        });
        cy.fixture('securityQuestionAnswers.json').then((securityQuestions) => {
          cy.wrap(securityQuestions).each((questionObj: any, index: number) => {
              cy.get('.modal-content').should('be.visible').within(() => {
                  const id = questionObj.id;
                  const question = Object.keys(questionObj)[1];
                  const answer = questionObj[question];
                  cy.get("select").should('have.value', id.toString());
                  cy.get(`input#${index}`).type(answer);
                  cy.get('button').click();
              });
              cy.wait(500);
          });
          cy.get('.modal-password').should('be.visible').within(() => {
              cy.get('input[placeholder="New Password"]').type('password1234');
              cy.get('input[placeholder="Confirm New Password"]').type('password1234');
              cy.get('button').click();
          });
          cy.get('div.swal2-popup').within(() => {
            cy.get("h2.swal2-title").should('have.text', 'Success');
            cy.get('button.swal2-confirm').click()
          })
      });
    });
  });