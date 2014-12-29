define(['views/depositoryView'], function (View) {

	var bindings = [{
		element: '.depository-list a',
		event: 'click',
		handler: selectBank
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/depository.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.render({
						model: data.bankList,
						bindings: bindings
					});
				}
				khApp.hideIndicator();
			}
		});
	}

	function selectBank() {
		var name = $$(this).find('.bank-name').text();
		var type = $$(this).data('type');
		var protocalId = $$(this).data('protocal-id');

		mainView.loadPage('depository-detail.html?name=' + name + '&type=' + type + '&econtract_id=' + protocalId);
	}

	return {
		init: init
	}
});
