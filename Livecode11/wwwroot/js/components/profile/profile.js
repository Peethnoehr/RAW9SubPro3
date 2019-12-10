﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputusername = ko.observable();
    var inputpassword = ko.observable();
    var inputemail = ko.observable();
    var inputusername2 = ko.observable();
    var changedProfile = ko.observable();
    var deletedProfile = ko.observable();
    
    var changeProfile = function() {
        ds.changeProfile(data => {
            changedProfile(data);
        },inputusername(),inputpassword(),inputemail());
    };
    var deleteProfile = function() {    
        ds.deleteProfile(data => {
            deletedProfile(data);
    },inputusername2());
    };
    
    return function (params) {
        return {
            inputusername,
            inputusername2,
            inputpassword,
            inputemail,
            changeProfile,
            deleteProfile
        };
    };
});