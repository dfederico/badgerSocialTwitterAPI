define([
	'core',
	'models/alert',
	'text!html/tplAlert.html',
], function (core, Alert, template) {

	mv.views.AlertView = Backbone.View.extend({

		el: '#alert-container',

		template: _.template(template),

		initialize: function () {
			this.model = new Alert();
		},

		render: function () {
			this.$el.html(
				this.template({
					alert: this.model.toJSON()
				}));
		},

		events: {
			'click #purge': 'hideMainAlert',
			'global alerts/showMainAlert': 'showMainAlert',
			'global alerts/hideMainAlert': 'hideMainAlert'
		},

		showMainAlert: function (alertData) {
			this.model.clear();
			//this.model.set(alertData);
			this.populateAlertValues(alertData);
			this.render();
			$('html, body').animate({
				scrollTop: 0
				// scrollTop: $("#alert-container").offset().top
			}, 500);
		},

		hideMainAlert: function (alertData) {
			this.$el.html('');
			this.model.clear();
		},

		populateAlertValues: function (alertData) {
			switch(alertData.type){
				case mv.enums.alertTypes.SUCCESS:
					this.model.set({
						type: alertData.type,
						icon: 'ok',
						message: alertData.message,
						scheme: 'success'
					});
				break;
				case mv.enums.alertTypes.WARNING:
					this.model.set({
						type: alertData.type,
						icon: 'minus',
						message: alertData.message,
						scheme: 'warning'
					});
				break;
				case mv.enums.alertTypes.DANGER:
					this.model.set({
						type: alertData.type,
						icon: 'remove',
						message: alertData.message,
						scheme: 'danger'
					});
				break;
				default:
					this.model.set({
						type: 'Default',
						icon: 'stop',
						message: 'Alert improperly triggered: please check your work',
						scheme: 'default'
					});
			}
		}

	});

	return mv.views.AlertView;
});
