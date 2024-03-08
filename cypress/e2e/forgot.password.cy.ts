const TEST_URL = 'http://localhost:3000';
const FORGOT_PASSWORD_TEXT = "Forgot password?";
const FIRST_NAME = 'John';
const LAST_NAME = 'Doe';
const USERNAME = 'johndoe1234';
const NEW_PASSWORD = 'password1234';
const WRONG_PASSWORD = 'wrongpassword1234';
const SUCCESS_TITLE = 'Success';
const ERROR_TITLE = 'Error';

const fillUserInformation = () => {
    cy.get('.user-information-modal').within(() => {
        cy.get('input[placeholder="First Name"]').type(FIRST_NAME);
        cy.get('input[placeholder="Last Name"]').type(LAST_NAME);
        cy.get('input[placeholder="Username"]').type(USERNAME);
        cy.get('button').should('have.text', 'Recover Account').click();
    });
};

const answerSecurityQuestions = () => {
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
    });
};

describe('ForgotPasswordModal component test', () => {
    beforeEach(() => {
      cy.visit(TEST_URL);
      cy.get("p").contains(FORGOT_PASSWORD_TEXT).click();
    });

    it('should add first name, last name, and username in the input fields', () => {
        fillUserInformation();
        answerSecurityQuestions();

        cy.get('.modal-password').should('be.visible').within(() => {
            cy.get('input[placeholder="New Password"]').type(NEW_PASSWORD);
            cy.get('input[placeholder="Confirm New Password"]').type(NEW_PASSWORD);
            cy.get('button').click();
        });

        cy.get('div.swal2-popup').within(() => {
            cy.get("h2.swal2-title").should('have.text', SUCCESS_TITLE);
            cy.get('button.swal2-confirm').click();
        });
    });

    it('should return error for invalid/wrong inputs', () => {
        fillUserInformation();
        answerSecurityQuestions();

        cy.get('.modal-password').should('be.visible').within(() => {
            cy.get('input[placeholder="New Password"]').type(NEW_PASSWORD);
            cy.get('input[placeholder="Confirm New Password"]').type(WRONG_PASSWORD);
            cy.get('button').click();
        });

        cy.get('div.swal2-popup').within(() => {
            cy.get("h2.swal2-title").should('have.text', ERROR_TITLE);
            cy.get('button.swal2-confirm').click();
        });
    });
});