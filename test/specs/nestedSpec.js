define([
	'core',
	'models/alert'
], function(core, Alert) {
	describe("spy on a model ", function() {
		var alert, type;
		beforeEach(function() {
			alert = new Alert();
			type = {
				icon: 'ok',
				message: 'we succeeded',
				scheme: 'success'
			};
			spyOn(alert, 'fetch').andCallFake(function(e) {
				//console.log("hello");
				alert.set(type);
			});
		});
		it('expect model.fetch to have been called ', function() {
			alert.fetch();
			console.log(alert.get('icon'));
			expect(alert.fetch).toHaveBeenCalled();
		});
		describe("post fetch data validation ", function() {
			beforeEach(function() {
				alert.fetch();
			});
			it('verify data present when spy activated on model.fetch ', function() {
				console.log(alert.get('icon'));
				expect(alert.get('icon')).toEqual('ok');
			});
		});
	});
});