define([
	'main',
	'text!html/tplAlerts.html'
], function (main, template) {

	mv.views.AlertsView = Backbone.View.extend({

		el: '',

		template: _.template(template),

		initialize: function () {},

		render: function () {
			this.$el.html(
				this.template({})
			);
		},

		events: {
			'click .btn-success': 'successClick',
			'click .btn-warning': 'warningClick',
			'click .btn-danger': 'dangerClick'
		},

		successClick: function (event) {
			event.preventDefault();
			Backbone.trigger('alerts/showMainAlert', {
				type: mv.enums.alertTypes.SUCCESS,
				message: 'we succeeded'
			});
		},

		warningClick: function (event) {
			event.preventDefault();
			Backbone.trigger('alerts/showMainAlert', {
				type: mv.enums.alertTypes.WARNING,
				message: 'this could be bad'
			});
		},

		dangerClick: function (event) {
			event.preventDefault();
			Backbone.trigger('alerts/showMainAlert', {
				type: mv.enums.alertTypes.DANGER,
				message: 'all is failed'
			});
		}
	});

	return mv.views.AlertsView;
});
