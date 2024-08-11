import { browser, by, element } from 'protractor';
import * as path from "path";
import { AppBasePage } from '../app.base.po';

export class AppProductPage extends AppBasePage {
    constructor() { super(); }

    async browsingToProducts() {
       this.browsingByLink('Products');
    }

    async browsingToNewProducts() {
        this.browsingByLink('New Product');
    }

    async startBrowsing() {
      this.browsingToHome();
      this.login();
      await this.browsingToProducts();
    }

    async getProductTitle() {
        return await this.getElementXpath("/html/body/app-root/app-product-app/app-product-list/div/h1").getText();
    }

    setupSupplier() {
        this.supplierList.get(2).click();
    }

    supplierList = element.all(by.tagName('option'));
    name = element(by.id('name'));
    description = element(by.id('description'));
    value = element(by.id('value'));
    active = element(by.name('active'));
    registerProductButton = element(by.buttonText('Register'));

    setImageFilePathToForm() {
        let caminho = path.resolve(__dirname, 'image_test.jpg');
        element(by.id('image')).sendKeys(caminho);
    }

}