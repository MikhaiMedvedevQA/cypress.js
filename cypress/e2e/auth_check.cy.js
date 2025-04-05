import * as main_pg from "../locators/main_page.json";
import * as recovery_pg from "../locators/recovery_pass_page.json";
import * as result_pg from "../locators/result_page.json";
import * as data from "../helpers/default_reg_data.json";


describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
      cy.visit('/'); //зашёл на сайт
      cy.get(main_pg.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверил цвет кнопки
        });
        
   afterEach('Конец теста', function () {
      cy.get(result_pg.close).should('be.visible'); // крестик есть и он виден пользователю
      cy.get(result_pg.close).click(); // нажал на крестик   
      });

      it('Верный логин и верный пароль', function () {
        cy.get(main_pg.email).type(data.login); // ввёл верный логин
        cy.get(main_pg.pass).type(data.pass); // ввёл верный пароль
        cy.get(main_pg.login_button).click(); // нажал кнопку войти

        cy.wait(1000);

        cy.get(result_pg.title).contains('Авторизация прошла успешно');// проверял, что после авторизации элемент содержит текст
        cy.get(result_pg.title).should('be.visible'); // и текст виден  пользователю                                                
        
     })

     it('Верный логин и неверный пароль', function () {
       
        cy.get(main_pg.email).type(data.login); // ввёл верный логин
        cy.get(main_pg.pass).type('iLoveqastudio11'); // ввёл неверный пароль
        cy.get(main_pg.login_button).click(); // нажал кнопку войти

        cy.get(result_pg.title).contains('Такого логина или пароля нет');// проверял, что после авторизации элемент содержит текст
        cy.get(result_pg.title).should('be.visible'); // и текст виден  пользователю                                                
              
     })

     it('Проверка валидации логина', function () {
        
        cy.get(main_pg.email).type('germandolnikov.ru'); // ввёл логин без @
        cy.get(main_pg.pass).type('data.pass'); // ввёл верный пароль
        cy.get(main_pg.login_button).click(); // нажал кнопку войти

        cy.get(result_pg.title).contains('Нужно исправить проблему валидации');// проверял, что после элемент содержит текст
        cy.get(result_pg.title).should('be.visible'); // и текст виден  пользователю                                                
               
     })

     it('Проверка восстановления пароля', function () {
        
        cy.get(main_pg.fogot_pass_btn).click(); // нажал кнопку забыли пароль?
        cy.get(recovery_pg.email).type(data.login); // ввёл почту для восстановления пароля
        cy.get(recovery_pg.send_button).click(); // нажал кнопку отправить код
        
        cy.get(result_pg.title).contains('Успешно отправили пароль на e-mail');// проверял, что элемент содержит текст
        cy.get(result_pg.title).should('be.visible'); // и текст виден  пользователю                                                
                
     })

        it('Неуспешная проверка восстановления пароля', function () {
                
            cy.get(main_pg.fogot_pass_btn).click(); // нажал кнопку забыли пароль?
            cy.get(recovery_pg.email).type('german@dolnikov'); // ввёл почту без .ru
            cy.get(recovery_pg.send_button).click(); // нажал кнопку отправить код
                
            cy.get(result_pg.title).contains('Нужно исправить проблему валидации');// проверял, что элемент содержит текст
            cy.get(result_pg.title).should('be.visible'); // и текст виден  пользователю                                                
            
     })
 }) 

// План
// Найти поле логин и вести правильный логин
// Найти поле пароль и вести правильный пароль
// Найти кнопку войти и нажать на неё
// Проверить, что авторизация прошла успешно