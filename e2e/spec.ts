//I couldn't test it on my machine due to the configurtions issues
//You can run the config.js version for the same output

import { browser, element, by, protractor } from "protractor";

describe('angular-weather App', function() {
    let cityInput = element(by.id("city"));
    let searchSubmitButton = element(by.css("button[type = 'submit']"));

    beforeEach(function(){
        browser.get("http://localhost:4200/");
        cityInput.sendKeys("London");
        searchSubmitButton.click();
        browser.waitForAngular();
    });

    it("should return one city", () => {  
        let list = element.all(by.css('.table tr'));
        expect(list.count()).toBe(2);
    });

    it("should return invalid city", () => {  
        cityInput.clear();
        cityInput.sendKeys("xxxx");
        searchSubmitButton.click();
        let EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 5000);

        browser.wait(function () {
            return browser.switchTo().alert().then(
                function () {return true;},
                function () {return false;}
            );
        }, 5000);

        var popupAlert = browser.switchTo().alert();
        let alertText = popupAlert.getText();
        expect(alertText).toMatch('Error: city not found');
        popupAlert.dismiss();
    });

    it("should have two cities", () => {  
        cityInput.clear();
        cityInput.sendKeys("Madrid");
        searchSubmitButton.click();

        let list = element.all(by.css('.table tr'));
        expect(list.count()).toBe(3);
    });

    it("should not duplicate cities", () => {  
        cityInput.clear();
        cityInput.sendKeys("Madrid");
        searchSubmitButton.click();

        cityInput.clear();
        cityInput.sendKeys("London");
        searchSubmitButton.click();

        let list = element.all(by.css('.table tr'));
        expect(list.count()).toBe(3);
    });

  });