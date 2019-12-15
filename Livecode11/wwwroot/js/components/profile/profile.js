﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputpassword = ko.observable();
    var inputemail = ko.observable();
    var username;
    var email;
    var changeProfile = function() {
        ds.changeProfile(data => {
            email(inputemail());
        },username(),inputpassword(),inputemail());
    };
    var deleteProfile = function() {    
        ds.deleteProfile(data => {
            username(undefined);
    },username());
    };
    
    return function (params) {
        username = params.userName; //ko.observable("Test");//
        email = params.email; //ko.observable("test@test.test"); //
        return {
            inputpassword,
            inputemail,
            changeProfile,
            deleteProfile,
            username,
            email
        };
    };
});