﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var searchedPosts = ko.observableArray([]);
    var inputsearch = ko.observable();
    var markedPosts = ko.observableArray([]);
    var markedPost = ko.observable();
    var deletedMark = ko.observable();
    var username;
    var annotation;
    var pageNumber = ko.observable(0);
    var nbPerPage = 25;
    var totalPages = ko.computed(function() {
        var div = Math.floor(searchedPosts().length / nbPerPage);
        div += searchedPosts.length % nbPerPage > 0 ? 1 : 0;
        return div - 1;
    });

    var paginated = ko.computed(function() {
        var first = pageNumber() * nbPerPage;
        return searchedPosts.slice(first, first + nbPerPage);
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
    
    var searchPost = function(){
        alert("TestCall");
        ds.searchPost( data => {
            searchedPosts(data);
            alert("Searched: "+JSON.stringify(searchedPosts()));
            alert("Marked: "+JSON.stringify(markedPosts()));
            checkPosts(searchedPosts(), markedPosts());
    },inputsearch(), username(), markedPosts());
    };
    
    var getMarkings = function(){
        alert("Does getMarkings get called?");
        ds.getMarkings(markedPosts, username);
    };
    
    var checkPosts = function(searchedPosts, markedPosts){
        alert("CheckPosts SearchedPosts: "+JSON.stringify(searchedPosts));
        alert("CheckPosts MarkedPosts: "+JSON.stringify(markedPosts));
        searchedPosts.forEach(function (a) {
            a.markCheck = false;
             markedPosts.forEach(function (b){
                if (a.id === b.postId) {
                    a.markCheck = true;
                    a.markId = b.id;
                    alert("IsMarked");
                }
            })
        })
    };
    
    var clickMarkPost = function(post){
        if (post.markCheck !== true){
            var annotation = prompt("Please enter an annotation:", "Text");
            post.markCheck = true;
            ds.markPost( data => {
                post.markId = data.id;
            }, username, post.id, annotation);     
        }
        else {
            post.markCheck = false;
            ds.deleteMark( data => {
                deletedMark(data);
            }, username, post.markId);
        }
    };
    
    return function (params) {
        username = params.userName;
        getMarkings();
        return {
            inputsearch,
            username,
            searchedPosts,
            pageNumber,
            nbPerPage,
            totalPages,
            paginated,
            hasPrevious,
            hasNext,
            next,
            previous,
            searchPost,
            clickMarkPost,
            markedPosts,
            getMarkings,
            annotation,
            checkPosts,
            markedPost,
            deletedMark,
        };
    };
});