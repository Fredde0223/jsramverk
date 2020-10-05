"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;



test.describe("min app", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("min-app.frah19.me/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("me" + target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    test.it("testing login page", function(done) {
        // try use nav link
        goToNavLink("Login");

        assertH1("Logga in");
        matchUrl("/login" );

        done();
    });

    test.it("testing edit page", function(done) {
        // try use nav link
        goToNavLink("Edit Reports");

        assertH1("Ändra i rapport");
        matchUrl("/edit" );

        done();
    });

    test.it("testing week 1 page", function(done) {
        // try use nav link
        goToNavLink("Week 1");

        assertH1("Week 1: Frontend");
        matchUrl("/reports/week/1" );

        done();
    });
});
