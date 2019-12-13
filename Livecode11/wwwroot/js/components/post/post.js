﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var test = ko.observable({a: "abc"});
    var inputid = ko.observable();
    var question = ko.observable();
    var detailedArrayPost = ko.observableArray([]);
    var username;
    var getPost = function() {
        ds.detailPost( data => {
            question(data);
            detailedArrayPost(data.answers)
        },inputid());
    };
    return function (params) {
        username = params.userName;
        return {
            inputid,
            question,
            detailedArrayPost,
            getPost,
            test
        };
    };
});