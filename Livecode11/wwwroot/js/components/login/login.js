﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
        var inputusername = ko.observable();
        var inputpassword = ko.observable();
        var username; // = ko.observable("initialValue");
        var email;
        var login = function() {
            ds.login(data => {
                username(data.userName);
                email(data.email);
        },inputusername(),inputpassword());
        };
    return function (params) {    
        username = params.userName;
        email = params.email;
        return {
            username,
            email,
            inputusername,
            inputpassword,
            login
        };
    };
});