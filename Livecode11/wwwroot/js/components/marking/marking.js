﻿﻿define(['knockout', 'dataService', 'store'], function (ko, ds, store) {
    
    var markings = ko.observableArray([]);
    var username;// = ko.observable("Test");
    
    var deleteMarking = function(marking){
        alert("run marking.js.deleteMarking");
        ds.deleteMark(data => {
            alert(JSON.stringify(data));
    }, username, marking.id);
    };
    return function (params) {
        username = params.userName;
        ds.getMarkings(markings, username);
    
        return {
            markings,
            username,
            deleteMarking
        };
    };
});