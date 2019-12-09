﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var searchedPost = ko.observableArray([]);
    var postdata = ko.observable();
    var parsed = ko.observable();
    var inputsearch = ko.observable();

    var searchPost = function(){
        alert("TestCall");
        ds.searchPost( data => {
            searchedPost(data);
            postdata(JSON.stringify(data[1].title));
            parsed(JSON.parse(data));
        },inputsearch());
    };
    return function (params) {
        return {
            inputsearch,
            searchedPost,
            postdata,
            parsed,
            searchPost
        };
    };
});

// 