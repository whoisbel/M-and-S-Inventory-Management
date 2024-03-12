describe('Sidepanel', () => {
    it('should display admin management link for admin user', () => {
        // Visit the page where the side panel component is rendered
        cy.visit('http://localhost:3000/');
        cy.get('.login-inputs', { timeout: 10000 }).within(() => {
            cy.get('input[placeholder="Username"]').type('janedoe');
            cy.get('input[placeholder="Password"]').type('123');
            cy.get('button').click();
            cy.get('.sidepanel_link[href="/admin_mngt/inventory_mngt/area_list/"]').should('not.exist');
        })
    });
});