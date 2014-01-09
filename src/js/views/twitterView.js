define([
	'core',
	'models/tweet',
	'collections/tweets',
	'text!html/tplTwitter.html'
], function(core, Tweet, Tweets, template) {

	mv.views.TwitterView = Backbone.View.extend({
		el: '',
		template: _.template(template),

		initialize: function() {
			this.collection = new Tweets();
			this.setup();
			//this.collections = new Tweets();
			//this.collections.fetch();
		},

		setup: function() {
			//this.collections = new Tweets();
			//var dfd = $.Deferred(),
			self = this;
			$.when(self.collection.fetch())
			.done(function() {
				//dfd.resolve();
				self.render();
			})
			.fail(function(error) {
				console.log('error in setup of TwitterView', error);
				//dfd.reject();
			})
			//return dfd.promise();
		},

		render: function() {
			this.$el.html(this.template({
				collection: this.collection.toJSON()
			}));
		}
	});

	return mv.views.TwitterView;
});
