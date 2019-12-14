﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var test = ko.observable({a: "abc"});
    var inputid = ko.observable();
    var question = ko.observable();
    var selectedPost;
    var detailedArrayPost = ko.observableArray([]);
    var username;
    var getPost = function() {
        ds.detailPost( data => {
            question(data);
            detailedArrayPost(data.answers)
        },inputid());
    };
    var getPostAuto = function(postId) {
        ds.detailPost( data => {
            question(data);
        detailedArrayPost(data.answers)
    },postId);
    };

    return function (params) {
        selectedPost = params.selectedPost;
        username = params.userName;
        if(selectedPost() !== undefined){
            alert("calling getPost("+selectedPost()+");");
            getPostAuto(selectedPost());
        }
        return {
            inputid,
            question,
            detailedArrayPost,
            getPost,
            test
        };
    };
});