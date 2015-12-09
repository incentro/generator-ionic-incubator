/* globals describe, it, element, by, expect, browser, require, beforeEach */
'use strict';

var MainPageObject = require('./pageObjects/MainPageObjects.js');
var SideMenuPageObject = require('./pageObjects/SideMenuPageObjects.js');

describe('The sidemenu', function(){

	var mainPageObject = new MainPageObject();
	var sideMenuPageObject = new SideMenuPageObject();

	beforeEach(function() {
        browser.get('/#/app/home');
    });

	it('Sidemenu interactions', function(){
		var sideMenuItems = sideMenuPageObject.sideMenuItems.all(by.css('a'));

		mainPageObject.menuButton.click();

		expect(element(by.tagName('body')).getAttribute('class')).toMatch('menu-open');

		expect(sideMenuPageObject.sideMenu.isDisplayed()).toBeTruthy();

		expect(sideMenuPageObject.sideMenuHeader.isDisplayed()).toBeTruthy();

		expect(sideMenuPageObject.sideMenuTitle.getText()).toMatch('Side Menu');

		expect(sideMenuItems.count()).toBe(2);

		var items = sideMenuItems.map(function(elem, index) {
			return {
				index: index,
				state: elem.getAttribute('ui-sref')
			};
		});

		expect(items).toEqual([
			{index: 0, state: 'app.home'},
			{index: 1, state: 'app.settings'}
		]);

		expect(sideMenuItems.first().getAttribute('class')).toContain('active');

		sideMenuItems.get(1).click();
    	expect(browser.getCurrentUrl()).toMatch('/app/settings');
    });
});
