define([
	'core',
	'models/tweet',
	'collections/tweets',
	'text!html/tplTwitterFrame.html',
	'views/twitterView'
], function (core, Tweet, Tweets, template, TwitterView) {
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
			'click #voll': 'vollClick',
			'click #searchButton': 'search',
			'submit': 'search'
		},

		initialize: function () {
			this.col = new Tweets();
			this.twitterView = mv.i.views.twitterView = new TwitterView({
				collection: this.col
			});
			this.col.on('change', this.renderTweets);
		},

		renderTweets: function () {
			this.twitterView.$el = $('#tweetHole', this.$el);
			this.twitterView.render();
		},

		baskClick: function () {
			$('#tweetHole').html('<img src="http://localhost/badgerSocial/src/img/spinner.gif">');
			var self = this;
			$.when(this.col.fetch({
				data: {
					handle: '@BadgerMBB'
				}
			}))
				.done(function () {
					self.renderTweets();
				})
				.fail(function (error) {
					console.log('view failed');
				});
		},

		footClick: function () {
			$('#tweetHole').html('<img src="http://localhost/badgerSocial/src/img/spinner.gif">');
			var self = this;
			$.when(this.col.fetch({
				data: {
					handle: '@BadgerFootball'
				}
			}))
				.done(function () {
					self.renderTweets();
				})
				.fail(function (error) {
					console.log('view failed');
				});
		},

		hockClick: function () {
			$('#tweetHole').html('<img src="http://localhost/badgerSocial/src/img/spinner.gif">');
			var self = this;
			$.when(this.col.fetch({
				data: {
					handle: '@BadgerWHockey'
				}
			}))
				.done(function () {
					self.renderTweets();
				})
				.fail(function (error) {
					console.log('view failed');
				});
		},

		vollClick: function () {
			$('#tweetHole').html('<img src="http://localhost/badgerSocial/src/img/spinner.gif">');
			var self = this;
			$.when(this.col.fetch({
				data: {
					handle: '@BadgerVBall'
				}
			}))
				.done(function () {
					self.renderTweets();
				})
				.fail(function (error) {
					console.log('view failed');
				});
		},

		search: function () {
			var handleValue = $('#searchField').val();
			var self = this;
			if (handleValue !== '') {
				console.log(handleValue);
				$('#tweetHole').html('<img src="http://localhost/badgerSocial/src/img/spinner.gif">');
				$.when(this.col.fetch({
					data: {
						handle: handleValue
					}
				}))
					.done(function () {
						self.renderTweets();
					})
					.fail(function (error) {
						console.log('view failed');
						$('#tweetHole').html('This handle was not found');
					});
			}
		},

		render: function () {
			this.$el.html(this.template({}));
		}
	});

	return mv.views.TwitterFrameView;
});
