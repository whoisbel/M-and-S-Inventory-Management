describe('AddInventory', () => {
    it('should add an inventory item', () => {
        // Visit the page and login
        cy.visit('http://localhost:3000/');
        cy.get('.login-inputs', { timeout: 10000 }).within(() => {
            cy.get('input[placeholder="Username"]').type('janedoe');
            cy.get('input[placeholder="Password"]').type('123');
            cy.get('button').click();
        });
        cy.get('.sidepanel_link[href="/inventory_input/add_inventory"]').click();
        cy.visit('http://localhost:3000/inventory_input/add_inventory');
        cy.get('button').contains('Create New').click();
        const quantity = Math.floor(Math.random() * 100);
        cy.get('input[name="quantity"]').first().type(quantity.toString());
        cy.get('button').contains('Save').click();
        cy.contains('Harvest Added').should('be.visible');
    });
});