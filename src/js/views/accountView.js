define(['utils'], function (Utils) {

	function render(params) {
		checkDefaultSelected();
		Utils.bindEvents(params.bindings);
	}

	function checkDefaultSelected() {
		$$('#accountContent select').each(function () {
			checkSelected(this);
		});
	}

	function checkSelected(select) {
		var valueText = [];
		var itemBefore = $$(select).parent().find('.item-before');
		var itemInner = $$(select).parent().find('.item-inner');

		for (var i = 0; i < select.length; i++) {
			if (select[i].selected) valueText.push(select[i].textContent.trim());
		}

		if (valueText.length > 0) {
			itemBefore.text('已选择');
			itemInner.addClass('selected');
		} else {
			itemBefore.text('请选择');
			itemInner.removeClass('selected');
		}
	}

	return {
		render: render,
		checkSelected: checkSelected
	};
});
