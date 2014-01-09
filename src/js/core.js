define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'backboneGlobal'
], function ($, _, Backbone) {
	_.templateSettings = {
		evaluate: /{{([\s\S]+?)}}/g,
		interpolate: /{{=([\s\S]+?)}}/g,
		escape: /{{-([\s\S]+?)}}/g
	};

	// Prototyped view functions
	Backbone.View.prototype.setup = function () {};
	Backbone.View.prototype.close = function () {
		this.remove();
		this.unbind();
		this.undelegateEvents();
		if (this.onClose) {
			this.onClose();
		}
	};

	//listen for any ajax errors in the site
	$(document).ajaxError(function (event, jqxhr, settings, exception) {
		console.log(event, jqxhr, settings, exception);
	});
});
