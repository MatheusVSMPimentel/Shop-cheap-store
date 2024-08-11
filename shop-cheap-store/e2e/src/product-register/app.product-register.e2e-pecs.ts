import { AppProductPage } from './app.product-register.po';
import { browser, by, element, logging, protractor } from 'protractor';

describe('Tests from register form', () => {
  let page: AppProductPage;

  beforeEach(() => {
    page = new AppProductPage();

  });

   it('Should Broswer to products', async () => {
    await page.startBrowsing();
    var EC = protractor.ExpectedConditions;
    var yourElement = element(by.xpath('/html/body/app-root/app-product-app/app-product-list/div/h1'));
    browser.wait(EC.presenceOf(yourElement),500000, 'Element taking too long to appear in the DOM');
     expect((await page.getProductTitle())).toEqual('List of Products');
  });


  it('Should fill new product form succesfully', async () => {

    page.browsingToNewProducts();
    page.setupSupplier();

    page.name.sendKeys('Product Automated Test');
    page.description.sendKeys('Product \nAutomated Test');
    page.value.sendKeys('1234,50');
    page.setImageFilePathToForm();
    browser.driver.actions().mouseMove(page.registerProductButton).perform();
    //page.active.sendKeys(' ');
    page.registerProductButton.submit();

    await page.wait(7500);

    expect( await page.getProductTitle()).toEqual('List of Products');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
