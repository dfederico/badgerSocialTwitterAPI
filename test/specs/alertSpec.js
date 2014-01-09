define([
	'core',
	'views/alertView'
], function(core, AlertView) {

	describe ("Alert view spec ", function(){
		var alertView, type;
	  beforeEach(function() {
	    alertView = new AlertView();
	  });
		
		it('Create success alert ', function() {
			type = mv.enums.alertTypes.SUCCESS;
			Backbone.trigger('alerts/showMainAlert', {
				type: type,
				icon: 'ok',
				message: 'we succeeded',
				scheme: 'success'
			});
			expect(alertView.model.get('type')).toEqual(type);
		});

		it('Create success alert ', function() {
			type = mv.enums.alertTypes.WARNING;
			Backbone.trigger('alerts/showMainAlert', {
				type: type,
				icon: 'minus',
				message: 'this could be bad',
				scheme: 'warning'
			});
			expect(alertView.model.get('type')).toEqual(type);
		});

		it('Create success alert ', function() {
			type = mv.enums.alertTypes.DANGER;
			Backbone.trigger('alerts/showMainAlert', {
				type: type,
				icon: 'remove',
				message: 'all is failed',
				scheme: 'danger'
			});
			expect(alertView.model.get('type')).toEqual(type);
		});

		it('Validate icon for success type alert ', function() {
			type = mv.enums.alertTypes.SUCCESS;
			Backbone.trigger('alerts/showMainAlert', {
				type: type,
				message: 'proper message'
			});
			expect(alertView.model.get('icon')).toEqual('ok');
		});

		it('Validate scheme for success type alert ', function() {
			type = mv.enums.alertTypes.SUCCESS;
			Backbone.trigger('alerts/showMainAlert', {
				type: type,
				message: 'proper message'
			});
			expect(alertView.model.get('scheme')).toEqual('success');
		});

		it('Create invalid alert type ', function() {
			type = 'invalid';
			Backbone.trigger('alerts/showMainAlert', {
				type: type
			});
			expect(alertView.model.get('type')).toEqual('Default');
		});

	});

});