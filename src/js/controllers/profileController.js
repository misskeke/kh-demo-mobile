define(['views/profileView'], function (View) {

	var bindings = [{
		element: '.profile-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.copy-above',
		event: 'click',
		handler: copyAddress
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/profile.json',
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

	function copyAddress() {
		var address = $$('textarea[name="cidAddr"]').val();
		$$('textarea[name="address"]').val(address);
	}

	function nextSubmit() {
		mainView.loadPage('video.html');
	}

	return {
		init: init
	};
});
