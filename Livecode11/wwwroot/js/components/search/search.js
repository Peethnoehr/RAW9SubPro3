﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    
    var inputsearch = ko.observable();

    var searchPost = function(){
        alert("TestCall");
        ds.searchPost( data => {
            searchedPost(data);
        },inputsearch());
    };
    return function (params) {
        return {
            inputsearch,
            searchPost
        };
    };
});