﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputusername = ko.observable();
    var inputpassword = ko.observable();
    var username; // = ko.observable("initialValue");
    var login = function() {
        ds.login(data => {
            username(data.userName);
    },inputusername(),inputpassword());
    };
    return function (params) {
        username = params.userName;
        return {
            username,
            inputusername,
            inputpassword,
            login
        };
    };
});