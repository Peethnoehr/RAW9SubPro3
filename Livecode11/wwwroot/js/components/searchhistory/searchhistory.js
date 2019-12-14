﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    
    var inputsearchhid = ko.observable();
    var username;
    var searchHistory = ko.observableArray();
    var getHistory = function(){
        ds.getSearchHistory( data => {
            searchHistory(data);
        },username());
    };
    return function (params) {
        username = params.userName;
        getHistory();
        return {
            inputsearchhid,
            searchHistory
        };
    };
});