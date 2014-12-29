define(['views/departmentView'], function (View) {

	var bindings = [{
		element: '.department-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.nearby-link',
		event: 'click',
		handler: selectFromNearby
	}, {
		element: '.all-link',
		event: 'click',
		handler: selectFromAll
	}, {
		element: '.package-detail',
		event: 'click',
		handler: redirectToDetail
	}, {
        element:'.item-search',
        event:'click',
        handler: selectResult
    }];

	var afterBindings = [{
		element: '[name=nearby]',
		event: 'change',
		handler: selectedName
	}, {
		element: '[name=all]',
		event: 'change',
		handler: selectedName
	}];

	var packsBindings = [{
		element: '#packages li',
		event: 'click',
		handler: handlePackage
	}];

	function init() {
		View.render({
			bindings: bindings
		});

		laodRecDepartment();
	}

	function laodRecDepartment() {
		$$.ajax({
			url: 'api/department.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.renderName(data.model.recDepartment);
					View.renderCommission(data.model.commission);
					View.renderPackage({
						bindings: packsBindings,
						model: data.model
					});
				}
			}
		});
	}

	function selectFromNearby() {
		startSelect('nearbySelect', 'api/deps-near.json');
	}

	function selectFromAll() {
		startSelect('allSelect', 'api/deps-all.json');
	}

	function startSelect(id, url) {
		var isSelectLocal = $$('#' + id)[0];
		if (isSelectLocal) {
			openSelect(id);
		} else {
			remoteSelect(id, url);
		}
	}

	function remoteSelect(id, url) {
		var _id = id;
		khApp.showIndicator();
		$$.ajax({
			url: url,
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.renderSelect({
						bindings: afterBindings,
						model: data.model
					});
					khApp.hideIndicator();
					openSelect(_id);
				}
			}
		});
	}

	function openSelect(id) {
		khApp.smartSelectOpen('#' + id);
	}

	function selectedName() {
		var selectedText = this.options[this.selectedIndex].text;
		var deptId = this.options[this.selectedIndex].value;
		var commission = $$(this.options[this.selectedIndex]).data('commission');

		View.renderName(selectedText);
		View.renderBadge();
		View.renderCommission(commission);
		getPacksBy(deptId);
	}

	function handlePackage() {
		if (isSelectedPackage(this)) {
			View.deselectPackage(this);
		} else {
			var commission = $$(this).data('commission');
			View.selectPackage(this, commission);
		}
	}

	function isSelectedPackage(li) {
		return $$(li).hasClass('selected');
	}

	// function choosePackage() {
	// 	var commission = $$(this).data('commission');

	// 	View.choosePackage(this);
	// 	View.changeCommission(commission);
	// }

	function redirectToDetail() {
		mainView.loadPage('package.html');
	}

	function getPacksBy(id) {
		$$.ajax({
			url: 'api/department.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.renderPackage({
						bindings: packsBindings,
						model: data.model
					});
				}
			}
		});
	}

	function isValidQuery(str) {
	    var reg = /^[1][34578]\d{9}$/;
	    return reg.test(str);
	}

	var queryCache = [];

	function selectResult() {
	    var verifyValue = $$('#recphone').val();
	    var isPassed = isValidQuery(verifyValue);
	    var isCached;

	    for (var i = 0; i < queryCache.length; i++) {
	        if (queryCache[i] === verifyValue) {
	            isCached = true;
	        }
	    }

	    if(isPassed) {
	        if (isCached) {
	            console.log(queryCache);
	        } else {
	            khApp.showIndicator();
	            $$.ajax({
	                url: 'api/verify-marketer.json',
	                type: 'GET',
	                success: function (data) {
	                    data = JSON.parse(data);
	                    if (data.error_no === 0) {
	                        $$('.have-result').show();
	                        $$('.error-result').hide();
	                        View.renderSearch({model: data.resultList});
	                        queryCache.push(verifyValue);
	                        khApp.hideIndicator();
	                    } else {
	                        $$('.have-result').hide();
	                        $$('.error-result').show();
	                        khApp.hideIndicator();
	                    }
	                }
	            });
	        }
	    } else {
	        $$('.have-result').hide();
	        $$('.error-result').show();
	        khApp.hideIndicator();
	    }
	}

	function nextSubmit() {
		mainView.loadPage('collect.html');
	}

	return {
		init: init
	};
});
