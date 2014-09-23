define(['views/signView'], function (View) {

	var bindings = [{
		element: '.sign-next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/sign.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					var model = data.model;
					View.render({
						bindings: bindings,
						model: model
					});
					khApp.hideIndicator();
				}
			}
		});
	}

	function nextSubmit() {
		mainView.loadPage('password.html');
	}

	return {
		init: init
	};
});
