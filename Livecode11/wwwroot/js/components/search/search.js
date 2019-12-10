﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var searchedPosts = ko.observableArray([]);
    var postdata = ko.observable();
    var parsed = ko.observable();
    var inputsearch = ko.observable();
    var username;

    var searchPost = function(){
        alert("TestCall");
        ds.searchPost( data => {
            searchedPosts(data);
            postdata(JSON.stringify(data[0].title));
            parsed(JSON.parse(data));
        },inputsearch());
    };
    return function (params) {
        username = params.userName;
        return {
            inputsearch,
            searchedPosts,
            postdata,
            parsed,
            searchPost
        };
    };
});

// 