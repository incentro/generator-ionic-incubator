/* globals element, by, module */
'use strict';

var MainPageObject = function() {
	this.activeView = element(by.css('ion-view[nav-view="active"]'));

	this.header = this.activeView.element(by.css('ion-header-bar'));
	this.headerTitle = this.activeView.element(by.css('ion-header-bar .title'));
	this.menuButton = this.activeView.element(by.css('ion-header-bar .ion-navicon'));

	this.pageContent = this.activeView.element(by.css('ion-content'));
};

module.exports = MainPageObject;
