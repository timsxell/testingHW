const { assert } = require('chai');
const Catalog = require('./pageobjects/Catalog.js')


describe('microsoft', async function() {
    
    it('Тест на адаптивность главной страницы под ширину экрана', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto('http://localhost:3000/hw/store');
        await browser.assertView('plain', '.Application');
    });
    
    it('Тест, что в шапке работает ссылка на каталог', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store');
        
        await page.click('[data-testid=catalog-link]')
        await browser.assertView('plain', '.navbar'); 
    });
    
    it('Тест, что в шапке работает ссылка на условия доставки', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store');
        
        await page.click('[data-testid=delivery-link]')
        await browser.assertView('plain', '.navbar'); 
    });
    
    it('Тест, что в шапке работает ссылка на контакты', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store');
        
        await page.click('[data-testid=contacts-link]')
        await browser.assertView('plain', '.navbar'); 
    });
    
    it('Тест, что в шапке работает ссылка на корзину', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store');
        
        await page.click('[data-testid=cart-link]')
        await browser.assertView('plain', '.navbar'); 
    });
    
    it('Тест, что в шапке работает ссылка на главную', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store/catalog');
        
        await page.click('[data-testid=main-page-link]')
        await browser.assertView('plain', '.navbar'); 
    });
    
    it('Тест, что Главная имеет статическое содержимое', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto('http://localhost:3000/hw/store');
        await browser.assertView('plain', '[data-testid=home]');
    });
    
    it('Тест, что страница Доставки имеет статическое содержимое', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto('http://localhost:3000/hw/store/delivery');
        await browser.assertView('plain', '[data-testid=delivery]');
    });
    
    it('Тест, что страница Контактов имеет статическое содержимое', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto('http://localhost:3000/hw/store/contacts');
        await browser.assertView('plain', '[data-testid=contacts]');
    });
    
    it('В пустой корзине есть ссылка на каталог, она работает и переводит на каталог', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto('http://localhost:3000/hw/store/cart');
        
        await page.click('[data-testid=link-from-cart-to-catalog]');
        await browser.assertView('plain', '.navbar');
        
        
    });
    
    it('Кнопка очистить корзину удаляет элементы из корзины', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store/cart');
        await page.evaluate(() => { 
            localStorage.setItem('example-store-cart', JSON.stringify({0: {name: 'a', price: 1, count: 2}}));
        });
        await page.goto('http://localhost:3000/hw/store/cart');
        await page.click('[data-testid=button-clear-cart]');
        await browser.assertView('plain', '.Application');
        await page.evaluate(() => { 
            localStorage.clear();
        });
    });
    
    it('Тест, что содержимое корзины сохраняться между перезагрузками страницы', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store/catalog/0');
        await page.waitForSelector('[data-testid=button-add-to-cart]', {timeout: 1000});
        await page.click('[data-testid=button-add-to-cart]');
        
        await page.click('[data-testid=cart-link]');
        await page.goto('http://localhost:3000/hw/store/cart');
        
        await page.click('[data-testid=button-clear-cart]');
        
        await browser.assertView('plain', '.navbar');
        
    });
    
    it('Тест, что в детализированной карточке товара корректно присутствует информация о товаре', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store/catalog/2');
        await page.waitForSelector('[data-testid=button-add-to-cart]', {timeout: 1000});

        await browser.assertView('plain', '.Application', {
            ignoreElements: [
                '[data-testid=product-ignore-element]',
                '[data-testid=button-add-to-cart]',
            ]
        });
    });
    
    it('Тест, что форма корректно отправляет данные и выдает корректный ответ', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store/cart');
        await page.evaluate(() => { 
            localStorage.setItem('example-store-cart', JSON.stringify({0: {name: 'a', price: 1, count: 2}}));
        });
        await page.goto('http://localhost:3000/hw/store/cart');
        
        await page.focus('[data-testid=name-input]');
        await page.keyboard.type("Name");
        await page.focus('[data-testid=phone-input]');
        await page.keyboard.type("79122223344");
        await page.focus('[data-testid=address-input]');
        await page.keyboard.type("Address");
        
        await page.click('[data-testid=checkout-button]');
        
        await browser.assertView('plain', '.Application');
        await page.evaluate(() => { 
            localStorage.clear();
        });
    });
    
    it('Тест, что по нажатии на кнопку добавить в корзину - товар должен добавиться в корзину', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store/catalog/0');
        await page.waitForSelector('[data-testid=button-add-to-cart]', {timeout: 1000});
        await page.click('[data-testid=button-add-to-cart]');
        
        await browser.assertView('plain', '.navbar');
    });
    
        it('В каталоге должны корректно отображаться названия продуктов', async ({ browser }) => {
            const catalog = new Catalog(browser, hermione.ctx, false);
            await catalog.goTo();
            const name = await browser.$(
                '[data-testid="0"] [data-testid="product-name-0"]'
            );

            expect(name).toBeDefined();
            expect(await name.getText()).not.toEqual('');
        });
    
});
