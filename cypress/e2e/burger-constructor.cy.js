import { userMockData } from '../../src/utils/mock-data';
import { API_URL } from '../../src/config/api';
import { CYPRESS_URL } from '../../src/config/tests';

describe('service is available', function() {
    beforeEach(function() {
        cy.viewport(1920, 1080);
        cy.visit(CYPRESS_URL);

        cy.get('[data-area="drag"]').as('drag');
        cy.get('[data-area="drop"]').as('drop');
        cy.get('.tab').as('tabIngredients');
        cy.get('[data-area="send-order"]').as('btnOrder');
    });
    
    it('should be scroll categories', function() {
        cy.get('@tabIngredients').eq(2).click();
        cy.get('@tabIngredients').eq(1).click();
    });
    
    it('should be open ingredient modal', function() {
        cy.get('@drag').eq(1).click();

        cy.get('#modals div').contains('Детали ингредиента');
        cy.get('[data-area="close-modal"]').click();
    });

    it("should be dnd and send order", function () {
        cy.intercept('POST', `${API_URL}orders`).as('sendOrder');

        cy.get('@drag').eq(1).drag('@drop');
        cy.get('@drag').eq(3).drag('@drop');
        
        cy.get('@btnOrder').click();
        cy.get('input[type="email"]').type(userMockData.email);
        cy.get('input[type="password"]').type(userMockData.password);
        cy.get('button[type="submit"]').click();
        cy.get('@btnOrder').click();

        cy.wait('@sendOrder');
        cy.get('#modals div').contains('Ваш заказ начали готовить');
    });
}); 