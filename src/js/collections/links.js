define([
	'core',
	'models/link'
], function (core, Link) {

	mv.collections.Links = Backbone.Collection.extend({

		initialize: function () {
			this.generateLinks();
		},

		model: Link,

		/**
		 * Generate some sample/dummy data
		 */
		generateLinks: function () {
			var link1, link2;

			link1 = new Link({
				url: 'http://www.google.com',
				display: 'Google',
				target: '_blank'
			});

			link2 = new Link({
				url: 'http://www.github.com',
				display: 'github',
				target: '_blank'
			});

			this.add(link1);
			this.add(link2);

			//alternate way of defining the dummy data
			/*
			var links = [
				{
					url: 'http://www.google.com',
					display: 'Google',
					target: '_blank'
				},
				{
					url: 'http://www.github.com',
					display: 'github',
					target: '_blank'
				}
			];
			this.add(links);
			*/
		}

	});

	return mv.collections.Links;
});
