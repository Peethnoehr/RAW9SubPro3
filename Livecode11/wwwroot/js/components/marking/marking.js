﻿define(['knockout', 'dataService', 'store'], function (ko, ds, store) {
    
    var markings = ko.observableArray([]);
    var username;// = ko.observable("Test");
    
    return function (params) {
        username = params.userName;
        ds.getMarkings(markings, username);
    
        return {
            markings,
            username
        };
    };
});