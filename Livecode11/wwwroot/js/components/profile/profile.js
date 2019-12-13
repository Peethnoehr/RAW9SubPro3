﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputusername = ko.observable();
    var inputpassword = ko.observable();
    var inputemail = ko.observable();
    var changedProfile = ko.observable();
    var deletedProfile = ko.observable();
    var username;
    var email;
    var changeProfile = function() {
        ds.changeProfile(data => {
            changedProfile(data);
        },inputusername(),inputpassword(),inputemail());
    };
    var deleteProfile = function() {    
        ds.deleteProfile(data => {
            deletedProfile(data);
    },username());
    };
    
    return function (params) {
        username = ko.observable("Test");//params.userName; //
        email = ko.observable("test@test.test"); //params.email; //
        return {
            inputusername,
            inputpassword,
            inputemail,
            changeProfile,
            changedProfile,
            deleteProfile,
            deletedProfile,
            username,
            email
        };
    };
});