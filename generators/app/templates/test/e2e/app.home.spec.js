/* globals describe, it, by, expect, browser, require, beforeEach */
'use strict';

var MainPageObject = require('./pageObjects/MainPageObjects.js');

describe('The app/home page', function(){

	var mainPageObject = new MainPageObject();

	beforeEach(function() {
        browser.get('/#/app/home');
    });

	it('URL should be app/home', function(){
        expect(browser.getCurrentUrl()).toMatch('/app/home');
    });

    it('Checking the header bar for the title and the menu button', function(){
        expect(mainPageObject.header.isDisplayed()).toBeTruthy();

        expect(mainPageObject.headerTitle.getText()).toMatch('<%= ngModulName %>');

        expect(mainPageObject.menuButton.isDisplayed()).toBeTruthy();
    });

    it('Checking the page content', function(){
        var title = mainPageObject.pageContent.element(by.tagName('h2'));
        expect(title.getText()).toMatch('<%= ngModulName %>');
    });
});
