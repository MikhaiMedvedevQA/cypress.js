import * as data from "../helpers/default_reg_data.json";

describe('Проверка авторизации', function () {
   
   beforeEach('Начало теста', function () {
      cy.visit('/'); //зашёл на сайт   
    });
   afterEach('Конец теста', function () {
      cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик есть и он виден пользователю
    });

    //  1. проверка на позитивный кейс авторизации
     it('Верный логин и верный пароль', function () {
           
        cy.get('#mail').type(data.login); // ввёл верный логин
        cy.get('#pass').type(data.pass); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.wait(2500);

        cy.get('#messageHeader').contains('Авторизация прошла успешно');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        
    })

    // 2. проверка логики восстановления пароля
     it('Проверка восстановления пароля', function () {
                
        cy.get('#forgotEmailButton').click(); // нажал кнопку Забыли пароль?
        cy.get('#mailForgot').type('igor@ugolnikov.ru'); // ввёл незарегистрированную почту
        cy.get('#restoreEmailButton').click(); // нажал кнопку отправить код
            
        cy.get('#messageHeader').contains('Такого логина или пароля нет');// проверял, что элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
       
     })

    // 3. проверка на негативный кейс авторизации
     it('Верный логин и неверный пароль', function () {
                
        cy.get('#mail').type(data.login); // ввёл верный логин
        cy.get('#pass').type('iLoveqastudio11'); // ввёл неверный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
       
     })

     // 4. проверка на негативный кейс авторизации
     it('Неверный логин и верный пароль', function () {
         
        cy.get('#mail').type('dolnikov@german.ru'); // ввёл неверный логин
        cy.get('#pass').type(data.pass); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
      
     })

     // 5. проверка на негативный кейс валидации
     it('Проверка валидации логина', function () {
        
        cy.get('#mail').type('germandolnikov.ru'); // ввёл логин без @
        cy.get('#pass').type(data.pass); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');// проверял, что после элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
      
    })

    //6. проверка на приведение к строчным буквам
    it('Приведение к строчным буквам', function () {   
        
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // ввёл ВерНый Логин
        cy.get('#pass').type(data.pass); // ввёл верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти
       
        cy.get('#messageHeader').contains('Авторизация прошла успешно');// проверял, что после авторизации элемент содержит текст
        cy.get('#messageHeader').should('be.visible'); // и текст виден  пользователю                                                
        
    })
})
