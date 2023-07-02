const { assert, expect, screen } = require('chai');
const { MockData } = require('../mock');

describe("Тесты на корзину с моками", async () => {
    
    it("Кнопка [добавить в корзину] должна быть нужного размера", async ({browser}) => {
        
         
            const mocker = new MockData();
        
            const productsMock = await browser.mock(
                '**' + '/api/products' + '**',
                { method: 'get' }
            );
            productsMock.respond(async (response) => {
                return (await mocker.getProducts()).data;
            });
        
            const productMock = await browser.mock(
                '**' + '/api/products/' + '**',
                { method: 'get' }
            );
            productMock.respond(async (response) => {
                const id = response.url
                    .split('/')
                    .filter((slug) => Boolean(slug))
                    .at(-1);
                return (await mocker.getProductById(+id)).data;
            });
        

        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto('http://localhost:3000/hw/store/catalog');

        await page.waitForSelector('[data-testid="link-details-222"]', {timeout: 5000});
        await page.click('[data-testid="link-details-222"]');
        await page.waitForSelector('[data-testid="button-add-to-cart"]');

        const button = await browser.$('[data-testid="button-add-to-cart"]');
        const padding = await button.getCSSProperty('padding');
        const paddingY = padding.value.split(" ")[0];
        const paddingX = padding.value.split(" ")[1];

        //console.log(`${padding.value}\nX=${paddingX}\nY=${paddingY}`);

        assert.isAtLeast(Number(paddingX.slice(-paddingX.length,-2)), 15, "button is smaller than expected");
        assert.isAtLeast(Number(paddingY.slice(-paddingY.length,-2)), 7, "button is smaller than expected");

        await browser.assertView("Gone to product page to check button size", "[data-testid=product-content-container]");
    }),

    it("Поля инпута в форме заказа корректно валидируются", async ({browser}) => {
        const mocker = new MockData();
        
            const productsMock = await browser.mock(
                '**' + '/api/products' + '**',
                { method: 'get' }
            );
            productsMock.respond(async (response) => {
                return (await mocker.getProducts()).data;
            });
        
            const productMock = await browser.mock(
                '**' + '/api/products/' + '**',
                { method: 'get' }
            );
            productMock.respond(async (response) => {
                const id = response.url
                    .split('/')
                    .filter((slug) => Boolean(slug))
                    .at(-1);
                return (await mocker.getProductById(+id)).data;
            });

        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto('http://localhost:3000/hw/store/catalog');

        await page.waitForSelector('[data-testid="link-details-222"]', {timeout: 5000});
        await page.click('[data-testid="link-details-222"]');
        await page.waitForSelector('[data-testid="button-add-to-cart"]', {timeout: 5000});
        await page.click('[data-testid="button-add-to-cart"]');
        await page.waitForSelector('[data-testid="cart-link"]');
        await page.click('[data-testid="cart-link"]');
        await page.waitForSelector('[data-testid="address-input"]');
        
        await page.focus('[data-testid="name-input"]');
        await page.type('[data-testid="name-input"]', "Ivan Ivanov");
        await page.type('[data-testid="phone-input"]', "+791234567823");
        await page.type('[data-testid="address-input"]', "Moscow, Red Square, 1, apt.8");
        await page.click('[data-testid="checkout-button"]');


        await browser.assertView("Typed the data into input and clicked submit", ".Application", {
                ignoreElements: [
                    '[data-testid=number]',
                ]
        });
    })
})

