import { browser, by, element, ExpectedConditions } from 'protractor';

export abstract class AppBasePage {

    constructor() {
        browser.driver.manage().window().maximize();
      browser.ready;
    }

     browsingToHome() {
        return browser.driver.get(browser.baseUrl) as Promise<any>;
    }

     browsingByUrl(url: string) {
        return browser.driver.get(url) as Promise<any>;
    }

    async browsingByLink(link: string) {
      await browser.driver.wait(ExpectedConditions.elementToBeClickable(element(by.linkText(link)))).then( () => {
            return element(by.linkText(link)).click();
        });
    }

    getElementXpath(xpath: string) {
        return element(by.xpath(xpath));
    }

    wait = async (milisegundos: number) => {
       browser.sleep(milisegundos);
    }

    /* LOGIN */
    email = element(by.id('email'));
    password = element(by.id('password'));

    async login(){
        this.browsingByLink('Login');
         this.email.sendKeys('guard@guard.com');
         this.password.sendKeys('Teste@123');

        element(by.id('login')).click();
        this.wait(9000);
    }
}