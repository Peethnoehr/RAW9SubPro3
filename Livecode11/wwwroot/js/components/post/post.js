﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
   
    var inputid = ko.observable();
    var detailedPost = ko.observable();
    var detailedArrayPost = ko.observableArray([]);
    var username;
    var detailPost = function() {
        alert("TESTCall");
        ds.detailPost( data => {
            detailedPost(data);
            detailedArrayPost(data.answers)
        },inputid());
    };
    return function (params) {
        username = params.userName;
        return {
            inputid,
            detailedPost,
            detailedArrayPost,
            detailPost
        };
    };
});

