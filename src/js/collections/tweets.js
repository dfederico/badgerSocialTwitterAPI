define([
	'core',
	'models/tweet'
], function (core, Tweet) {

	mv.collections.Tweets = Backbone.Collection.extend({

		//url: "/appstrapular-main/src/php/twitterSort.php",
		url: '/badgerSocial/src/php/twitterSort.php',
		model: Tweet
	});

	return mv.collections.Tweets;
});
