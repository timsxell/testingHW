describe('microsoft', async function() {
    
    it('Тест на адаптивность главной страницы под ширину экрана', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto('http://localhost:3000/hw/store');
        await browser.assertView('plain', '.Application');
    });
    
    it('Тест на появление "гамбургера" при ширине менее 576px', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto('http://localhost:3000/hw/store');
        await browser.assertView('plain', '.navbar');
    });
    
    
        it('Тест, что при выборе элемента из меню "гамбургера", меню должно закрываться', async function({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        
        await page.goto('http://localhost:3000/hw/store');
        
        await page.click('[data-testid=burger-button]')
        await page.click('[data-testid=catalog-link]')
        await browser.assertView('plain', '.navbar');
        
    });
    
    // it('Тест на адаптивность главной страницы под ширину экрана', async function({browser}) {
    //     const puppeteer = await browser.getPuppeteer();
    //     const [page] = await puppeteer.pages();
    //     await page.goto('http://localhost:3000/hw/store');
    //     await browser.assertView('plain', '.Application');
    // });
    
    // it('Тест, что шапка отображается на главной', async function() {
    //     await this.browser.url('http://localhost:3000/hw/store');
    //     await this.browser.assertView('plain', '.navbar'); 
    // });
});
