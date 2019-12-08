﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
   
    var inputid = ko.observable();
  
    var detailPost = function() {
        alert("TESTCall");
        ds.detailPost( data => {
            detailedPost(data);
        },inputid());
    };
    return function (params) {
        return {
            inputid,
            detailPost
        };
    };
});

