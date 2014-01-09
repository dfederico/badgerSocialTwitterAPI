define([
	'core'
], function (core) {

	mv.models.Tweet = Backbone.Model.extend({

		// showing what attributes to expect in this model
		defaults: {
			firstName: '',
			lastName: ''
		},

		initialize: function () {}

	});

	return mv.models.Tweet;
});
