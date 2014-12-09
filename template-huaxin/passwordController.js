define(['views/passwordView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '.password-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '#toggleSwitch',
		event: 'click',
		handler: handleSync
	},{
		element: '#password_nav .left',
		event: 'click',
		handler: returnPre
	}];

	

	function returnPre(){
		CRHloadPage("/returnAccount.do");
	}
	
	function init() {
		View.render({
			bindings: bindings
		});
	}
	
	function handleSync() {
		setTimeout(toggleDisplay, 100);
	}

	function toggleDisplay() {
		var checkSync = document.querySelector('#checkSync');
		if (checkSync.checked) {
			View.toggleInputs('hide');
		} else {
			View.toggleInputs('show');
		}
	}

	var APP_password            = {};
	APP_password.tradePwd       = "";
	APP_password.tradePwdRepeat = "";
	APP_password.capitalPwd     = "";
	APP_password.commPwd        = "";
	APP_password.commPwdRepeat  = "";
	
	
	function nextSubmit() {
		if($$("#checkSync")[0].checked){
			APP_password.tradePwd = $$("input[name=tradePwd]").val();
			APP_password.tradePwdRepeat = $$("input[name=tradePwdRepeat]").val();
			APP_password.commPwd = APP_password.tradePwd;
			APP_password.commPwdRepeat = APP_password.tradePwdRepeat;
			APP_password.capitalPwd = APP_password.tradePwd;
			
			if(APP_password.tradePwd == "" || APP_password.tradePwd == null){
				khApp.alert('请输入交易密码');
				return;
			}
			
			var validateRst = devValidatePwd(APP_password.tradePwd);
			if(validateRst != "success") {
				khApp.alert(validateRst);
				$$("input[name=tradePwd]").val("");
				$$("input[name=tradePwdRepeat]").val("");
				return;
			}
			
			if(APP_password.tradePwd != APP_password.tradePwdRepeat){
				khApp.alert('两次交易密码输入不一致，请重新输入');
				$$("input[name=tradePwd]").val("");
				$$("input[name=tradePwdRepeat]").val("");
				return;
			}
		}else{
			APP_password.tradePwd = $$("input[name=tradePwd]").val();
			APP_password.tradePwdRepeat = $$("input[name=tradePwdRepeat]").val();
			APP_password.capitalPwd = $$("input[name=capitalPwd]").val();
			APP_password.capitalPwdRepeat = $$("input[name=capitalPwdRepeat]").val();
			APP_password.commPwd = APP_password.tradePwd;
			
			if(APP_password.tradePwd == "" ||APP_password.tradePwd == null){
				khApp.alert('请输入交易密码');
				return;
			}
			
			var validateRst = devValidatePwd(APP_password.tradePwd);
			if(validateRst != "success") {
				khApp.alert(validateRst);
				$$("input[name=tradePwd]").val("");
				$$("input[name=tradePwdRepeat]").val("");
				return;
			}
			
			if(APP_password.tradePwd != APP_password.tradePwdRepeat){
				khApp.alert('两次交易密码输入不一致，请重新输入');
				$$("input[name=tradePwd]").val("");
				$$("input[name=tradePwdRepeat]").val("");
				return;
			}
			
			if(APP_password.capitalPwd == "" ||APP_password.capitalPwd == null){
				khApp.alert('请输入资金密码');
				return;
			}
			
			var validateRst = devValidatePwd(APP_password.capitalPwd);
			if(validateRst != "success") {
				khApp.alert(validateRst);
				$$("input[name=capitalPwd]").val("");
				$$("input[name=capitalPwdRepeat]").val("");
				return;
			}
			
			if(APP_password.capitalPwd != APP_password.capitalPwdRepeat){
				khApp.alert('两次资金密码输入不一致，请重新输入');
				$$("input[name=capitalPwd]").val("");
				$$("input[name=capitalPwdRepeat]").val("");
				return;
			}
			
			if(APP_password.tradePwd == APP_password.capitalPwd){
				khApp.alert('交易密码与资金密码相同，请重新输入资金密码');
				$$("input[name=capitalPwd]").val("");
				$$("input[name=capitalPwdRepeat]").val("");
				return;
			}
		}
		$$(".password-next-button").addClass('disabled');
		khApp.showIndicator();
		$$.ajax({
			url: '/setPassword.do?rnd=' + new Date().getTime(),
			method: "POST",
			timeout: 15000,
			data: {
				"tradePwd"         : APP_password.tradePwd,
				"capitalPwd"       : APP_password.capitalPwd,
				"communicationPwd" : APP_password.tradePwd
			},
			success: function(data){
				var data = JSON.parse(data);
				if(data.errorNo === 0){
					mainView.loadPage('/setbank');
				}else{
					khApp.hideIndicator();
					$$(".password-next-button").removeClass('disabled');
				    khApp.alert(data.errorInfo);
				}
	   		 },
			error: function(){
	   			khApp.hideIndicator();
				$$(".password-next-button").removeClass('disabled');
	   			khApp.alert(MESSAGE_TIMEOUT);
	   		},
	   		timeout: function(){
	   			khApp.hideIndicator();
	   			$$(".password-next-button").removeClass('disabled');
	   			khApp.alert(MESSAGE_TIMEOUT);
	   		}
		 });
	}

	return {
		init: init
	};
});
