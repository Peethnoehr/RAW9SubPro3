﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputusername = ko.observable();
    var inputpassword = ko.observable();
    var inputemail = ko.observable();
    var username = ko.observable("initialValue");
    var login = function() {
        ds.login(data => {
            username(data.userName);
        },inputusername(),inputpassword(),inputemail());
    };
    return function (params) {
        return {
            username,
            inputusername,
            inputpassword,
            inputemail,
            login
        };
    };
});