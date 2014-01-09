define([
	'core',
	'models/tweet'
], function (core, Tweet) {

	mv.collections.Tweets = Backbone.Collection.extend({

		url: "/appstrapular-main/src/php/hellophp.php",
		//url: "/appstrapular-main/src/block.json",
		//url: "/appstrapular-main/src/php/jsonData.json",
		model: Tweet
	});

	return mv.collections.Tweets;
});