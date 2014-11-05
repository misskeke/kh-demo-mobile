define(['views/profileView', 'text!tpl/date.html'], function (View, dateTemplate) {

	var bindings = [{
		element: '.profile-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.select-date',
		event: 'click',
		handler: dateSelect
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

	function isLongTerm() {
		var longTerm = $$('#longTerm')[0];

		if (longTerm) {
			return longTerm.checked
		} else {
			return false;
		}
	}

	// function liveBindChange() {
	// 	$$(document).on('click', '#longTerm', function () {
	// 		if (this.checked) {
	// 			$$('#dateWrap').hide();
	// 		} else {
	// 			$$('#dateWrap').show();
	// 		}
	// 	});
	// }

	// liveBindChange();

	function dateSelect() {
		var input = this;
        var isLongTermFlag = $$(input).data('isLongTerm');
        var longTermTemplate = '<label class="label-checkbox date-content agree-block"> <input type="checkbox"' + (isLongTermFlag? 'checked' : '') + ' id="longTerm"> <div class="item-media"> <i class="icon icon-form-checkbox"></i> </div> <div class="item-inner"> <div class="item-title">身份证有效期是否为长期有效</div> </div> </label>'
        var cidStartDateTemplate = '<div id="dateSelector">' + dateTemplate + '</div>';
        var cidEndDateTemplate = '<div id="dateSelector">' + dateTemplate + longTermTemplate + '</div>';

		khApp.modal({
			title: '请选择',
			text: input.id === 'cidEndDate' ? cidEndDateTemplate : cidStartDateTemplate,
			buttons: [
				{
					text: '取消'
				},
				{
					text: '确定',
					onClick: function () {
						var collectValue;

						if (isLongTerm()) {
                            $$(input).data('isLongTerm', true);
							collectValue = '长期有效';
						} else {
							var selectedData = khApp.formToJSON('#dateSelector');
							var selectedCollect = [];

							for (var property in selectedData) {
								selectedCollect.push(selectedData[property]);
							}

							collectValue = selectedCollect.join('.');
                            $$(input).data('isLongTerm', false);
						}

						input.value = collectValue;
					}
				}
			]
		});
	}

	function nextSubmit() {
		mainView.loadPage('video.html');
	}

	return {
		init: init
	};
});
