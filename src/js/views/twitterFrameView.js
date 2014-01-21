define([
	'core',
	'models/tweet',
	'collections/tweets',
	'text!html/tplTwitterFrame.html',
	'views/twitterView'
], function(core, Tweet, Tweets, template, TwitterView) {
	//@BadgerFootball
	//@BadgerWHockey
	//@BadgerMBB
	//@BadgerVBall
	//@UWBadgers
	mv.views.TwitterFrameView = Backbone.View.extend({
		el: '',
		template: _.template(template),
		
		events: {
			'click #bask': 'baskClick',
			'click #foot': 'footClick',
			'click #hock': 'hockClick',
			'click #voll': 'vollClick'
		},

		initialize: function() {
			this.col = new Tweets();
			this.twitterView = mv.i.views.twitterView = new TwitterView({collection: this.col});
			this.col.on('change', this.renderTweets);
		},

		renderTweets: function() {
			this.twitterView.$el = $('#tweetHole', this.$el);
			this.twitterView.render();
		},

		baskClick: function() {
			$('#tweetHole').html('<img src="http://localhost/badgerSocial/src/img/spinner.gif">');
			var self = this;
			$.when(this.col.fetch({ data: { handle: "@BadgerMBB" } }))
				.done(function() {
					self.renderTweets();
				})
				.fail(function (error) {
					console.log('view failed');
				});
		},

		footClick: function() {
			$('#tweetHole').html('<img src="http://localhost/badgerSocial/src/img/spinner.gif">');
			var self = this;
			$.when(this.col.fetch({ data: { handle: "@BadgerFootball" } }))
				.done(function() {
					self.renderTweets();
				})
				.fail(function (error) {
					console.log('view failed');
				});
		},

		hockClick: function() {
			$('#tweetHole').html('<img src="http://localhost/badgerSocial/src/img/spinner.gif">');
			var self = this;
			$.when(this.col.fetch({ data: { handle: "@BadgerWHockey" } }))
				.done(function() {
					self.renderTweets();
				})
				.fail(function (error) {
					console.log('view failed');
				});
		},

		vollClick: function() {
			$('#tweetHole').html('<img src="http://localhost/badgerSocial/src/img/spinner.gif">');
			var self = this;
			$.when(this.col.fetch({ data: { handle: "@BadgerVBall" } }))
				.done(function() {
					self.renderTweets();
				})
				.fail(function (error) {
					console.log('view failed');
				});
		},

		render: function() {
			this.$el.html(this.template({
			}));
		}



		// setup: function() {
		// 	//this.collections = new Tweets();
		// 	//var dfd = $.Deferred(),
		// 	self = this;
		// 	$.when(self.collection.fetch())
		// 	.done(function() {
		// 		//dfd.resolve();
		// 		self.render();
		// 	})
		// 	.fail(function(error) {
		// 		console.log('error in setup of TwitterView', error);
		// 		//dfd.reject();
		// 	})
		// 	//return dfd.promise();
		// },
	});

	return mv.views.TwitterFrameView;
});
