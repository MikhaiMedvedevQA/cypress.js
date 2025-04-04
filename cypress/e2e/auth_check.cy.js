describe('Проверка авторизации', function () {

    it('Верный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверил цвет кнопки

        cy.get('#mail').type('german@dolnikov.ru'); // ввёл верный логин
        cy.get('#pass').type('iLoveqastudio1'); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.wait(5000);

        cy.get('#messageHeader').contains('Авторизация прошла успешно');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
        // cy.get('#exitMessageButton > .exitIcon').click(); // нажал на крестик
     })

     it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверил цвет кнопки

        cy.get('#mail').type('german@dolnikov.ru'); // ввёл верный логин
        cy.get('#pass').type('iLoveqastudio11'); // ввёл неверный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
        // cy.get('#exitMessageButton > .exitIcon').click(); // нажал на крестик
     })

     it('Проверка валидации логина', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверил цвет кнопки

        cy.get('#mail').type('germandolnikov.ru'); // ввёл логин без @
        cy.get('#pass').type('iLoveqastudio1'); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');// проверял, что после элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').click(); // нажал на крестик
     })

     it('Проверка восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверил цвет кнопки

        cy.get('#forgotEmailButton').click(); // нажал кнопку забыли пароль?
        cy.get('#mailForgot').type('german@dolnikov.ru'); // ввёл почту для восстановления пароля
        cy.get('#restoreEmailButton').click(); // нажал кнопку отправить код
        
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');// проверял, что элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
        //cy.get('#exitMessageButton > .exitIcon').click(); // нажал на крестик
     })

        it('Неуспешная проверка восстановления пароля', function () {
            cy.visit('https://login.qa.studio/'); //зашёл на сайт
            cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверил цвет кнопки
    
            cy.get('#forgotEmailButton').click(); // нажал кнопку забыли пароль?
            cy.get('#mailForgot').type('german@dolnikov'); // ввёл почту без .ru
            cy.get('#restoreEmailButton').click(); // нажал кнопку отправить код
                
            cy.get('#messageHeader').contains('Нужно исправить проблему валидации');// проверял, что элемент содержит текст
            cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
            cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
            cy.get('#exitMessageButton > .exitIcon').click(); // нажал на крестик
     })
 }) 

// План
// Найти поле логин и вести правильный логин
// Найти поле пароль и вести правильный пароль
// Найти кнопку войти и нажать на неё
// Проверить, что авторизация прошла успешно