define(['views/accountView'], function (View) {

	var bindings = [{
		element: '.account-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '#accountContent select',
		event: 'change',
		handler: checkSelected
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function checkSelected() {
		View.checkSelected(this);
	}

	function collectResult() {
		var option = $$('#accountContent option');
		var	stockActs = '';
		var	fundActs = '';
		var	otherActs = '';

		option.each(function () {
			var selected = $$(this).prop('selected');
			if (!selected) return;

			var type = $$(this).data('type');
			var code = this.value;


			if (type === '1002') {
				stockActs += code + ',';
			} else if (type === '1003') {
				fundActs += code + ',';
			} else {
				otherActs += code + ',';
			}
		});

		return {
			stockActs: stockActs,
			fundActs: fundActs,
			otherActs: otherActs
		}
	}

	function nextSubmit() {
		var resultData = collectResult();
		console.log(resultData);
		mainView.loadPage('department.html');
	}

	return {
		init: init
	};
});
