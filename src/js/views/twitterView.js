define([
	'core',
	'models/tweet',
	'collections/tweets',
	'text!html/tplTwitter.html'
], function (core, Tweet, Tweets, template) {

	mv.views.TwitterView = Backbone.View.extend({
		//el: '#tweetHole',
		//el: '#alert-container',
		template: _.template(template),

		initialize: function () {},

		setup: function () {
			var self = this;
			$.when(self.collection.fetch())
				.done(function () {
					self.render();
				})
				.fail(function (error) {
					console.log('error in setup of TwitterView', error);
				});
		},

		render: function () {
			console.log(this.collection.toJSON());
			this.$el.html(this.template({
				collection: this.collection.toJSON()
			}));
		}
	});

	return mv.views.TwitterView;
});
