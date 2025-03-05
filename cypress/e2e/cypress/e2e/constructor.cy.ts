/// <reference types="cypress" />

describe('Burger Constructor Page', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
      cy.viewport(1300,800); 
      cy.visit('http://localhost:4000'); 
    });

    it  ('should add bun', () => {
        cy.get('[data-cy=bun-ingredients]').contains('Добавить').click()
        cy.get('[data-cy=constructor-bun-1]')
            .contains('Ингредиент 1')
            .should('exist');
        cy.get('[data-cy=constructor-bun-2]')
            .contains('Ингредиент 1')
            .should('exist');
    })


    it  ('should add ingredient', () => {
        cy.get('[data-cy=mains-ingredients]').contains('Добавить').click()
        cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click()
        cy.get('[data-cy=constructor-ingredients]')
            .contains('Ингредиент 3')
            .should('exist');
        cy.get('[data-cy=constructor-ingredients]')
            .contains('Ингредиент 7')
            .should('exist');
    });
});

describe('ingredient modal works correctly', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
        cy.viewport(1300,800);
        cy.visit('http://localhost:4000');
    });

    it('should work open modal', () => {
        cy.contains('информация об ингредиенте').should('not.exist');
        cy.contains('Ингредиент 1').click();
        cy.contains('информация об ингредиенте').should('exist');
        cy.get('#modals').contains('Ингредиент 1').should('exist');
    });

    it('should work close modal on overlay click', () => {
        cy.contains('информация об ингредиенте').should('not.exist');
        cy.contains('Ингредиент 1').click();
        cy.contains('информация об ингредиенте').should('exist'); 
        cy.get('#modals').click('left', { force: true});
        cy.contains('Детали Ингредиента').should('not.exist');
    });

    it('should work close modal on button click', () => {
        cy.contains('информация об ингредиенте').should('not.exist');
        cy.contains('Ингредиент 1').click();
        cy.contains('информация об ингредиенте').should('exist'); 
        cy.get('#modals button[aria-label="Закрыть"]').click();
        cy.contains('информация об ингредиенте').should('not.exist');
    });
})

describe('order modal works correctly', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
        cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as('postOrder');
    
        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('test-refreshToken')
        );
        cy.setCookie('accessToken', 'test-accessToken');
        cy.viewport(1300,800);
        cy.visit('http://localhost:4000');
    })

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    it('should order burger work', () => {
        cy.get('[data-cy=bun-ingredients]').contains('Добавить').click()
        cy.get('[data-cy=mains-ingredients]').contains('Добавить').click()
        cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click()
        cy.get('[data-cy=order-summ] button').click();

        cy.wait('@postOrder')
            .its('request.body')
            .should('deep.equal', {
                ingredients: ['1', '2', '3', '1']
            })

        cy.get('[data-cy=order-number]').contains('123456').should('exist');
        cy.get('#modals button[aria-label="Закрыть"]').click();
        cy.get('[data-cy=order-number]').should('not.exist');

        cy.get('[data-cy=constructor-bun-1]').should('not.exist');
        cy.get('[data-cy=constructor-mains]').should('contain.text', 'Выберите начинку');    
    })
})