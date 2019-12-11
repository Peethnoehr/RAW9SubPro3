﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
   
    var inputid = ko.observable();
    var detailedPost = ko.observable();
    var username;
    var detailPost = function() {
        alert("TESTCall");
        ds.detailPost( data => {
            detailedPost(data);
        },inputid());
    };
    return function (params) {
        username = params.userName;
        return {
            inputid,
            detailedPost,
            detailPost
        };
    };
});

