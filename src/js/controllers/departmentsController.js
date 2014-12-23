define(['views/departmentView'], function (View) {

    var bindings = [{
        element: '.department-next-button',
        event: 'click',
        handler: nextSubmit
    }, {
        element: '.recommend-link',
        event: 'click',
        handler: selectFromRecommend
    }, {
        element: '.nearby-link',
        event: 'click',
        handler: selectFromNearby
    }, {
        element: '.all-link',
        event: 'click',
        handler: selectFromAll
    },{
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

    function init(query) {
        View.render({
            bindings: bindings
        });

        if (query.depsname) {
            View.renderName(query.depsname);
            View.renderBadge('all');
        }

        if (query.depsno) {
            console.log(query.depsno);
        }
    }

    function selectFromRecommend() {
        startSelect('recommendSelect', 'api/department.json');
        View.renderBadge('recommend');
    }

    function selectFromNearby() {
        startSelect('nearbySelect', 'api/deps-near.json');
    }

    function selectFromAll() {
        mainView.loadPage('select/prov.html');
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
        var selectedBadge = $$(this).data('from');
        View.renderName(selectedText);
        View.renderBadge(selectedBadge);
        // console.log($$(this).data('from'));
    }

    function nextSubmit() {
        mainView.loadPage('collect.html');
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

    return {
        init: init
    };
});
