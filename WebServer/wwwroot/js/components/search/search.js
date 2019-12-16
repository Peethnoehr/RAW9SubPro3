﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var searchedPosts = ko.observableArray([]);
    var inputsearch = ko.observable();
    var markedPosts = ko.observableArray([]);
    var username;
    var annotation;
    var pageNumber = ko.observable(0);
    var nbPerPage = 25;
    var words = ko.observableArray([]);
    
    var totalPages = ko.computed(function() {
        var div = Math.floor(searchedPosts().length / nbPerPage);
        div += searchedPosts.length % nbPerPage > 0 ? 1 : 0;
        return div - 1;
    });

    var paginated = ko.computed(function() {
        var first = pageNumber() * nbPerPage;
        return searchedPosts.slice(first, first + nbPerPage);
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
        ds.searchPost( data => {
            searchedPosts(data);
            checkPosts(searchedPosts(), markedPosts());
            jQCloud(searchedPosts());
    },inputsearch(), username(), markedPosts());
    };
    
    var jQCloud = function(){
        words([]);
        $('#search').jQCloud('destroy');
            ds.getSearchWords(data => {
                ko.utils.arrayForEach(data, function(item){
                    words.push(item);
                });
        $('#search').jQCloud(words(),
                {
                    width: 300,
                    height: 300
                });
    }, searchedPosts());
    };
    
    var getMarkings = function(){
        ds.getMarkings(markedPosts, username);
    };
    
    var checkPosts = function(searchedPosts, markedPosts){
        searchedPosts.forEach(function (a) {
            a.markCheck = false;
             markedPosts.forEach(function (b){
                if (a.id === b.postId) {
                    a.markCheck = true;
                    a.markId = b.id;
                }
            })
        })
    };
    
    var clickMarkPost = function(post){
        if (post.markCheck !== true){
            var annotation = prompt("Please enter an annotation:", "Text");
            alert("Created as Mark");
            post.markCheck = true;
            ds.markPost( data => {
                post.markId = data.id;
            }, username, post.id, annotation);     
        }
        else {
            post.markCheck = false;
            ds.deleteMark( data => {
                alert("Deleted the Mark");
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
            paginated,
            next,
            previous,
            searchPost,
            clickMarkPost,
            markedPosts,
            getMarkings,
            annotation,
            checkPosts,
            jQCloud
        };
    };
});