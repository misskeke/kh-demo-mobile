define(['views/reviewView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}];

	var afterBindings = [{
		element: '.review-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.select-trigger',
		event: 'click',
		handler: selectTrigger
	}];

	function init() {
		View.init({
			bindings: bindings
		});
		khApp.showIndicator();
		$$.ajax({
			url: 'api/review.json',
			type: 'POST',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					var model = data.model;
					View.render({
						model: model,
						bindings: afterBindings
					});
					khApp.hideIndicator();
				}
			}
		});
	}

	function nextSubmit() {
		var checked = checkDefault();

		if (checked.length > 0) {
			khApp.alert(checked[0].warn);
			return;
		}

		var resultData = khApp.formToJSON('#reviewContent');
		var resultArray = [];
		var result;
		for (var i in resultData) {
			var _result = i + '&' + resultData[i];
			resultArray.push(_result);
		}
		console.log(resultData);

		result = resultArray.join('|');
		console.log(result);
		mainView.loadPage('audit.html');
	}

	/**
	 * 点击跟随选择
	 * @return {void}
	 */
	function selectTrigger() {
		var radio = $$(this).parent().find('input[type=radio]');
		var value = radio[0].value;

		radio[0].checked = true;
	}

	/**
	 * 检查选择是否为默认
	 * @return {Array} 返回错误序列与错误信息
	 */
	function checkDefault() {
		var result = [];

		$$('.default').each(function (index) {
			if (!this.checked) {
				var warn = $$(this).data('warn');
				result.push({
					index: index + 1,
					warn: warn
				});
			}
		});

		return result;
	}

	return {
		init: init
	};
});
