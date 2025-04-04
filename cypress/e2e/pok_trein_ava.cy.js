describe('Покупка аватара тренера', function () {

    it('НАЗВАНИЕ_ТЕСТ', function () {
        cy.visit('https://pokemonbattle.ru/'); // зашел на сайт
        cy.get('#k_email').type('USER_LOGIN') // ввел логин
        cy.get('#k_password').type('USER_PASSWORD') // ввел пароль
        cy.get('.MuiButton-root').click(); // нажал Войти
        cy.wait(2000);
// вошел в Покемоны
        cy.get('.style_1_heading_38_400_pokemon_classic').contains('Покемоны'); // проверил, что вошел на главн. стр. Покемонов
        
        cy.get('.header_card_trainer').click(); // нажал на кнопку тренера
        cy.wait(2000);
// перешел на страницу тренера
        cy.url().should('include', 'pokemonbattle.ru/trainer/') // проверил, что зашел на стр.тренера
        cy.get('.k_mobile > :nth-child(5)').click(); // нажал на кнопку Смена аватара
// перешел в Магазин
        cy.get('.pokemon__title').contains('Магазин'); // проверил, что на стр. Магазин
        cy.get('.available > button').first().click(); // кликнуть на первый доступный аватар
// переход на стр. оплаты
        cy.url().should('include', 'pokemonbattle.ru/payment/'); // проверил, что перешел на стр оплаты 
        cy.get('.payment_form_card_form > :nth-child(2) > .style_1_base_input').type('2200 0000 0000 0053'); // ввел номер карты
        cy.get(':nth-child(1) > .style_1_base_input').type('12/34'); // ввел врок действия
        cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type('125'); // ввел CVC
        cy.get('.payment_form_card_form_input_last > .style_1_base_input').type('JOНN LORD'); // ввел ИФ
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // нажал Оплатить

        cy.get('.payment_form_3ds_title').contains('Подтверждение покупки') // перешел в форму подтвержднения
        cy.get('.style_1_base_input').type('56456'); // ввел код СМС
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // нажал оплатить

        cy.get('.payment_status_top_title').contains('Покупка прошла успешно') // покупка подтверждена
      
        // cy.get('.style_1_base_link_blue').click(); // нажал Вернуться в магазин
     })
}) 
