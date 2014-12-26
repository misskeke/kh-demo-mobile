define(['views/depositoryDetailView'], function (View) {

	var bindings = [{
		element: '.depository-next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init(query) {
		console.log(query);
		var type = query.type;
		var name = query.name;
		var econtract_id = query.econtract_id;

		View.init({bindings: bindings});
		View.changeTitle(name);

		switch (type) {
			case '00':
				View.noNeedInput(); // 00: 无需填写卡号密码
				break;
			case '01':
				View.onlyCardNoInput(); // 01: 只需填写卡号
				break;
			case '11':
				View.bothCardNoPswInput(); // 11: 同时需要填写卡号和密码
				break;
		}

		View.syncProtocal(name, econtract_id);
	}

	function nextSubmit() {
		mainView.loadPage('risk.html');
	}

	return {
		init: init
	};
});
