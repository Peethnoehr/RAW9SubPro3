﻿define(['knockout', 'dataService', 'store'], function (ko, ds, store) {
    
    var markings = ko.observableArray([]);
    var username;// = ko.observable("Test");

    var alertMarkings = function(){
        alert(markings().length);
        markings().forEach(function(marking) {
            alert(marking.id);
        });
    };
    
    return function (params) {
        ds.getMarkings(markings, username);
        username = params.userName;
    
        return {
            markings,
            username,
            alertMarkings
        };
    };
});