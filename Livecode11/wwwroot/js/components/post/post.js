﻿﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var test = ko.observable({a: "abc"});
    var inputId = ko.observable();
    var question = ko.observable();
    var selectedPost;
    var username;
    var getPost = function() {
        ds.detailPost( data => {
            question(data);
        },inputId());
    };
    var getPostAuto = function(postId) {
        ds.detailPost( data => {
            question(data);
    },postId);
    };

    return function (params) {
        question(undefined);
        inputId(undefined);
        selectedPost = params.selectedPost;
        username = params.userName;
        if(selectedPost() !== undefined){
            alert("calling getPost("+selectedPost()+");");
            getPostAuto(selectedPost());
            selectedPost(undefined);
        }
        return {
            inputId,
            question,
            getPost,
            test
        };
    };
});