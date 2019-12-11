﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    
    var inputsearchhid = ko.observable();
    var username;
    var searchHistory = function(){
        alert("TestCall");
        ds.searchHistory( data => {
            searchedHistory(data);
        },inputsearchhid());
    };
    return function (params) {
        username = params.userName;
        return {
            inputsearchhid,
            searchHistory
        };
    };
});