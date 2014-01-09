define([
	'core',
	'models/link',
	'collections/links',
	'text!html/tplHome.html'
], function (core, Link, Links, template) {

	mv.views.HomeView = Backbone.View.extend({

		el: '',

		initialize: function () {
			this.collection = new Links();
		},

		render: function () {
			this.$el.html(_.template(template, {
				links: this.collection.toJSON()
			}));
		},

		events: {
			'click .example-links': 'processClick'
		},

		processClick: function (event) {
			event.preventDefault();
			alert('you clicked a link');
		}

	});

	return mv.views.HomeView;
});
