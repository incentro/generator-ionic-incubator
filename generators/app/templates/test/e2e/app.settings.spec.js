/* globals describe, it, by, expect, browser, require, beforeEach */
'use strict';

var MainPageObject = require('./pageObjects/MainPageObjects.js');

describe('The app/settings page', function(){

	var mainPageObject = new MainPageObject();

	beforeEach(function() {
        browser.get('/#/app/settings');
    });

	it('URL should be app/settings', function(){
        expect(browser.getCurrentUrl()).toMatch('/app/settings');
    });

    it('Checking the header bar for the title and the menu button', function(){
    	expect(mainPageObject.header.isDisplayed()).toBeTruthy();

        expect(mainPageObject.headerTitle.getText()).toMatch('Settings');

        expect(mainPageObject.menuButton.isDisplayed()).toBeTruthy();
    });

    it('Checking the page content', function(){
    	var itemList = mainPageObject.activeView.element(by.className('list')).all(by.className('item'));

    	expect(itemList.count()).toBe(2);

    	expect(itemList.first().element(by.className('settings-item__text')).getText()).toMatch('Allow Push Notifications');

    	expect(itemList.get(1).element(by.className('settings-item__text')).getText()).toMatch('Allow cookies');

    	itemList.first().element(by.tagName('label')).click();

    	expect(itemList.first().element(by.tagName('input')).isSelected()).toBeTruthy();

    	expect(itemList.get(1).element(by.tagName('input')).isSelected()).toBeFalsy();
    });
});
