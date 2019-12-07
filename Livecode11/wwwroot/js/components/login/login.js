﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    return function (params) {
        
        var inputusername = ko.observable();
        var inputpassword = ko.observable();
        var username = ko.observable("test");
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