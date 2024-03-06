//Check if links can be opened even without logging in.
const links = [
    'http://localhost:3000/admin_mngt/inventory_mngt/area_list',
    'http://localhost:3000/admin_mngt/inventory_mngt/grade_and_price',
    'http://localhost:3000/admin_mngt/users_mngt/requests',
    'http://localhost:3000/admin_mngt/users_mngt/manage_users',
    'http://localhost:3000/inventory_input/add_inventory',
    'http://localhost:3000/inventory_input/harvest_logs',
    'http://localhost:3000/inventory/inventory',
    'http://localhost:3000/inventory/available_products',
    'http://localhost:3000/inventory/stockout',
    'http://localhost:3000/order_details',
    'http://localhost:3000/history',
    'http://localhost:3000/user_settings/settings/recovery',
    'http://localhost:3000/user_settings/settings/change_password',
    'http://localhost:3000/user_settings/settings/user_info',
]
describe('Check if links can be opened even without logging in', () => {
    links.forEach((link) => {
        it(`should be rerouted to / if not logged in`, () => {
            cy.visit(link);
            cy.url().should('include', 'http://localhost:3000/');
        });
    });
});


describe("Check links that should only  accesible for employee", () => {
    
})