/* globals element, by, module */
'use strict';

var SideMenuPageObject = function() {
	this.sideMenu = element(by.css('ion-side-menu'));
	this.sideMenuHeader = element(by.css('ion-side-menu ion-header-bar'));
	this.sideMenuTitle = element(by.css('ion-side-menu ion-header-bar .title'));
	this.sideMenuItems = element(by.css('ion-side-menu ion-content .list'));
};

module.exports = SideMenuPageObject;
