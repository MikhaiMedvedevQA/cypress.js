describe('Проверка авторизации', function () {

    //  1. проверка на позитивный кейс авторизации
     it('Верный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        
        cy.get('#mail').type('german@dolnikov.ru'); // ввёл верный логин
        cy.get('#pass').type('iLoveqastudio1'); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.wait(2500);

        cy.get('#messageHeader').contains('Авторизация прошла успешно');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
    })

    // 2. проверка логики восстановления пароля
     it('Проверка восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        
        cy.get('#forgotEmailButton').click(); // нажал кнопку забыли пароль?
        cy.get('#mailForgot').type('igor@ugolnikov.ru'); // ввёл незарегистрированную почту
        cy.get('#restoreEmailButton').click(); // нажал кнопку отправить код
            
        cy.get('#messageHeader').contains('Такого логина или пароля нет');// проверял, что элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
     })

    // 3. проверка на негативный кейс авторизации
     it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        
        cy.get('#mail').type('german@dolnikov.ru'); // ввёл верный логин
        cy.get('#pass').type('iLoveqastudio11'); // ввёл неверный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
     })

     // 4. проверка на негативный кейс авторизации
     it('Неверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        
        cy.get('#mail').type('dolnikov@german.ru'); // ввёл неверный логин
        cy.get('#pass').type('iLoveqastudio1'); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
     })

     // 5. проверка на негативный кейс валидации
     it('Проверка валидации логина', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        
        cy.get('#mail').type('germandolnikov.ru'); // ввёл логин без @
        cy.get('#pass').type('iLoveqastudio1'); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');// проверял, что после элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
    })

    //6. проверка на приведение к строчным буквам
    it('Приведкние к строчным буквам', function () {
        cy.visit('https://login.qa.studio/'); //зашёл на сайт
        
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // ввёл верный логин
        cy.get('#pass').type('iLoveqastudio1'); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

       
        cy.get('#messageHeader').contains('Авторизация прошла успешно');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
    })
})