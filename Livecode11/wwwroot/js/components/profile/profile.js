﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputusername = ko.observable();
    var inputpassword = ko.observable();
    var inputemail = ko.observable();
    
    var changeProfile = function() {
        ds.changeProfile(data => {
            changedProfile(data);
        },inputusername(),inputpassword(),inputemail());
    };
    return function (params) {
        return {
            inputusername,
            inputpassword,
            inputemail,
            changeProfile
        };
    };
    var deleteProfile = function() {
        ds.deleteProfile(data => {
            deletedProfile(data);
        },inputusername(),inputpassword(),inputemail());
    };
    return function (params) {
        return {
            inputusername,
            inputpassword,
            inputemail,
            deleteProfile
        };
});