define(['views/accountListView', 'models/accountModel'], function (View, Model) {

	var bindings = [{
		element: '#accountList input[type="checkbox"]',
		event: 'change',
		handler: function () {
			var source = $$('#accountContent input[name="' + this.name + '"]');
			syncSelect(this, source[0]);
		}
	}];

	var groupName;

	function init(query) {
		var valueString = decodeURIComponent(query.value);
		var title = query.title;
		var subentry = query.subentry;
		groupName = query.groupName;

		var saved = Model.saved();
		var model;

		View.renderTitle(title);

		if (saved) {
			model = Model.fetch(subentry);
			View.render({
				model: model,
				groupName: groupName,
				bindings: bindings
			});
			checkDefault(valueString);
		} else {
			$$.ajax({
				url: 'api/account.json',
				type: 'GET',
				success: function (data) {
					data = JSON.parse(data);
					if (data.errorNo === 0) {
						Model.save(data.accountTypeListMap);
						model = Model.fetch(subentry);
						View.render({
							model: model,
							groupName: groupName,
							bindings: bindings
						});
						checkDefault(valueString);
					}
				}
			});
		}
	}

	/**
	 * 默认选中
	 * @param  {String} values
	 */
	function checkDefault(values) {
		$$('#accountList input[type="checkbox"]').each(function () {
			if (values.indexOf(this.value) !== -1) {
				this.checked = true;
			}
		});
	}

	/**
	 * 全选
	 * 目前传不同的 type 值还有一些问题，先不用
	 */
	// function selectAll() {
	// 	var source = $$('#accountContent input[name="' + groupName + '"]');

	// 	$$('#accountList input[type="checkbox"]').each(function () {
	// 		this.checked = true;
	// 		syncSelect(this, source[0]);
	// 	});
	// }

	/**
	 * 选择同步
	 * @param  {HTMLElement} target
	 * @param  {HTMLElement} source
	 */
	function syncSelect(target, source) {
		var syncValue = target.checked ? add(source.value, target.value) : remove(source.value, target.value);
		var type = $$(target).data('type');
		var code = $$(target).data('code');

		$$(source).trigger('toSelect', [source, syncValue, code, type]);
	}

	/**
	 * 在原值中增加目标值
	 * @param {String} sourceValue 原值
	 * @param {String} targetValue 目标值
	 */
	function add(sourceValue, targetValue) {
		if (sourceValue.length === 0) {
			return targetValue;
		} else {
			var values = sourceValue.split(' ');

			if (values.indexOf(targetValue) === -1) {
				values.push(targetValue);
			}

			return values.join(' ');
		}
	}

	/**
	 * 在原值中删除目标值
	 * @param {String} sourceValue 原值
	 * @param {String} targetValue 目标值
	 */
	function remove(sourceValue, targetValue) {
		var values = sourceValue.split(' ');

		if (values.indexOf(targetValue) !== -1) {
			if (values.length === 1) {
				return '';
			} else {
				var valueReverse = [];
				values.map(function (v, i) {
					if (v !== targetValue) {
						valueReverse.push(v);
					}
				});
				return valueReverse.join(' ');
			}
		}
	}

	return {
		init: init
	};
});
