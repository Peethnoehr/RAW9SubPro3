﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputusername = ko.observable();
    var inputpassword = ko.observable();
    var inputemail = ko.observable();
    var inputusername2 = ko.observable();
    var inputpassword2 = ko.observable();
    var inputemail2 = ko.observable();
    var changedProfile = ko.observable();
    var deletedProfile = ko.observable();
    
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
        },inputusername2(),inputpassword2(),inputemail2());
    };
    return function (params) {
        return {
            inputusername2,
            inputpassword2,
            inputemail2,
            deleteProfile
        };
    };
});