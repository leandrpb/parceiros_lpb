/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zappfreestyle_lpb/parceiros_lpb/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
