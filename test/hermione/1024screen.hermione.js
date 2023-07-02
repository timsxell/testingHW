const { assert } = require('chai');


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
    });
    
});
