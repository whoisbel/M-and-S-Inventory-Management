interface SecurityQuestion {
  id: number;
  question: string;
}

const fillForm = (firstName: string, lastName: string, username: string, password: string, confirmPassword: string, answers: string[]) => {

  if(firstName){
    cy.get('input[placeholder="First name"]').type(firstName);
  }
  if(lastName){
    cy.get('input[placeholder="Last name"]').type(lastName);
  }
  if(username){
    cy.get('input[placeholder="Username"]').type(username);
  }
  if(password){
    cy.get('input[placeholder="Enter password"]').type(password);
  }
  if(confirmPassword){
    cy.get('input[placeholder="Confirm password"]').type(confirmPassword);
  }


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
        if (answers[divIndex]) {
          cy.wrap($input).type(answers[divIndex]);
        }
      });
    });
  });

  cy.get('button').should('have.text', 'Request').click()
}

describe('Return error due to invalid or blank inputs', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/register', { fixture: 'registrationData.json' }).as('getRegistrationData');
    cy.visit('http://localhost:3000');
    cy.wait('@getRegistrationData');
    cy.get('p').contains('Create account here').click();
    cy.get('p.top-text').should('have.text', 'Create Account');
  });

  const testCases = [
    {firstName: 'John12', lastName: 'Doe', username: 'johndoe123', password: 'john123', confirmPassword: 'john123', answers: ["Red", "Spaghetti", "Jane Doe"], errorMessage: 'Please enter a valid first name'},
    {firstName: '', lastName: 'Doe', username: 'johndoe123', password: 'john123', confirmPassword: 'john123', answers: ["Red", "Spaghetti", "Jane Doe"], errorMessage: 'Please enter a valid first name'},
    {firstName: 'John', lastName: 'Doe2', username: 'johndoe123', password: 'john123', confirmPassword: 'john123', answers: ["Red", "Spaghetti", "Jane Doe"], errorMessage: 'Please enter a valid last name'},
    {firstName: 'John', lastName: '', username: 'johndoe123', password: 'john123', confirmPassword: 'john123', answers: ["Red", "Spaghetti", "Jane Doe"], errorMessage: 'Please enter a valid last name'},
    {firstName: 'John', lastName: 'Doe', username: 'johndoe123', password: 'john123', confirmPassword: 'john1232', answers: ["Red", "Spaghetti", "Jane Doe"], errorMessage: 'Passwords do not match'},
    {firstName: 'John', lastName: 'Doe', username: 'johndoe123', password: 'john123', confirmPassword: 'john123', answers: [], errorMessage: 'Please enter a valid security question answer'},
  ];

  testCases.forEach(({firstName, lastName, username, password, confirmPassword, answers, errorMessage}) => {
    it(`should open a swal modal with message "${errorMessage}"`, () => {
      cy.get('.register-modal').within(() => {
        fillForm(firstName, lastName, username, password, confirmPassword, answers);
      });
      cy.get('div.swal2-popup').within(() => {
        cy.get('div.swal2-html-container').should('have.text', errorMessage)
      });
    });
  });
});