﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    return function (params) {
        var username = ko.observable("Test");
        var markings = [];

        ds.getMarkings(data => {
            markings = data;
        }, username);
        
        return {
            username
         };
    };
});