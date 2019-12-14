﻿define(['knockout', 'dataService', 'store'], function (ko, ds, store) {
    
    var markings = ko.observableArray([]);
    var username;// = ko.observable("Test");
    var selectedPost;
    var deleteMarking = function(marking){
        markings.remove(marking);
        ds.deleteMark(data => {
            alert(JSON.stringify(data));
    }, username, marking.id);
    };
    var goToPost = function(marking){
        selectedPost(marking.post.id);
        store.dispatch(store.actions.selectMenu("Post"));  
    };
    return function (params) {
        selectedPost = params.selectedPost;
        username = params.userName;
        ds.getMarkings(markings, username);
    
        return {
            markings,
            username,
            deleteMarking,
            goToPost
        };
    };
});