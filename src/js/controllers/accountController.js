define(['views/accountView', 'GS'], function (View, GS) {

	var APP_account = {
		stockAccount: '',
		fundAccount: '',
		otherAccount: ''
	};

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
		// khApp.showIndicator();
		// $$.ajax({
		// 	url: 'api/account.json',
		// 	type: 'GET',
		// 	success: function (data) {
		// 		data = JSON.parse(data);
		// 		if (data.errorNo === 0) {
		// 			View.render({
		// 				model: data,
		// 				bindings: bindings
		// 			});
		// 		}
		// 		khApp.hideIndicator();
		// 	}
		// });

		GS.getData('api/account.json', initView);

        liveBind();
	}

    function liveBind() {
        $$('body').on('change', 'input[value="3"]', function () {
            if (this.checked === true) {
                if (!$$('input[value="011"]')[0].checked) {
                    $$('input[value="011"]').parent().trigger('click');
                    checkSignature();
                }
            }
        });

        $$('body').on('change', 'input[value="011"]', function () {
            if (this.checked === false) {
                if ($$('input[value="3"]')[0].checked) {
                    $$('input[value="3"]').parent().trigger('click');
                }
            }
        });
    }

	function initView(data) {
		View.render({
			model: data,
			bindings: bindings
		});
	}

	function checkSelected() {
		View.checkSelected(this);
	}

    function checkSignature() {
        var select = $$('select[name="3"]')[0];
        var options = select.options;

        for (var i = 0; i < options.length; i++) {
            if (options[i].value === '99') {
                options[i].selected = true;
                View.checkSelected(select);
            }
        }
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

		APP_account.stockAccount = stockActs;
		APP_account.fundAccount  = fundActs;
		APP_account.otherAccount = otherActs;
	}

	function nextSubmit() {
		collectResult();
		console.log(APP_account);
		if (!APP_account.stockAccount || !APP_account.fundAccount) {
			khApp.alert("需同时选择任意股东户或基金户");
			return;
		}
		// console.log(resultData);
		mainView.loadPage({
			url: 'department.html',
			ignoreCache: true
		});
	}

	return {
		init: init
	};
});
