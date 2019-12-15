﻿define(['knockout', 'dataService', 'store'], function (ko, ds, store) {
    
    var markings = ko.observableArray([]);
    var username;// = ko.observable("Test");
    var selectedPost;
    var pageNumber = ko.observable(0);
    var nbPerPage = 10;

    var totalPages = ko.computed(function() {
        var div = Math.floor(markings().length / nbPerPage);
        div += markings.length % nbPerPage > 0 ? 1 : 0;
        return div - 1;
    });

    var paginated = ko.computed(function() {
        var first = pageNumber() * nbPerPage;
        return markings.slice(first, first + nbPerPage);
    });

    var hasPrevious = ko.computed(function() {
        return pageNumber() !== 0;
    });

    var hasNext = ko.computed(function() {
        return pageNumber() !== totalPages();
    });

    var next = function() {
        if(pageNumber() < totalPages()) {
            pageNumber(pageNumber() + 1);
        }
    };

    var previous = function() {
        if(pageNumber() != 0) {
            pageNumber(pageNumber() - 1);
        }
    };


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
            goToPost,
            paginated,
            hasPrevious,
            hasNext,
            next,
            previous,
            pageNumber,
            nbPerPage
        };
    };
});