﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    return function (params) {

        var width = params.width || 200;
        var height = params.height || 200;
        var inputusername = ko.observable();
        var inputpassword = ko.observable();
        var username = ko.observable("Test");
        var login = function() {
            ds.login(data => {
                username(data.userName);
        },inputusername(),inputpassword());
        };

        return {
            username,
            inputusername,
            inputpassword,
            login
        };
    };
});