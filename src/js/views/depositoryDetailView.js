define(['utils'], function (Utils) {

	function init(params) {
		Utils.bindEvents(params.bindings);
	}

	function noNeedInput() {
		$$('#inputGroup').hide();
		$$('#agreeProtocal').show();
		$$('#agreeProtocal').css('display', '-webkit-flex');
	}

	function onlyCardNoInput() {
		$$('#inputGroup').show();
		$$('#agreeProtocal').show();
		$$('#agreeProtocal').css('display', '-webkit-flex');

		$$('.cardno-input').show().addClass('bare');
		$$('.cardpsw-input').hide();
	}

	function bothCardNoPswInput() {
		$$('#inputGroup').show();
		$$('#agreeProtocal').show();
		$$('#agreeProtocal').css('display', '-webkit-flex');

		$$('.cardno-input').show().removeClass('bare');
		$$('.cardpsw-input').show();
	}

	function syncProtocal(text, id) {
		var protocalLink = document.querySelector('#protocalLink');
		replaceQueryId(protocalLink, id);
		$$('#bankName').text(text);
	}

	function replaceQueryId(link, id) {
		link.search = '?econtract_id=' + id;
	}

	function changeTitle(title) {
		$$('.navbar').find('.sliding').eq(1).text(title);
	}

	return {
		init: init,
		noNeedInput: noNeedInput,
		onlyCardNoInput: onlyCardNoInput,
		bothCardNoPswInput: bothCardNoPswInput,
		syncProtocal: syncProtocal,
		changeTitle: changeTitle
	};
});
