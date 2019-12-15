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
    var words = ko.observableArray([]);
    var testArray = [{text: "Lorem", weight: 13},{text: "Ipsum", weight: 10.5},{text: "Dolor", weight: 9.4},{text: "Sit", weight: 8},{text: "KFOADSKFO", weight: 2},{text: "Akol", weight: 5},{text: "Car", weight: 12},{text: "Hello", weight: 5}];
    
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
        ds.searchPost( data => {
            searchedPosts(data);
            checkPosts(searchedPosts(), markedPosts());
            jQCloud(searchedPosts());
    },inputsearch(), username(), markedPosts());
    };
    
    var jQCloud = function(){
        alert("Something may be wrong here; JCloud");
        alert("JCloud SearchedPosts: "+JSON.stringify(searchedPosts()));
            ds.getSearchWords(data => {
                ko.utils.arrayForEach(data, function(item){
                    words.push(item);
                });
                alert("Data JCloud: "+JSON.stringify(data));
                alert("Words gotten: "+JSON.stringify(words()));
                alert("testArray: "+JSON.stringify(testArray));
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
            post.markCheck = true;
            ds.markPost( data => {
                post.markId = data.id;
            }, username, post.id, annotation);     
        }
        else {
            post.markCheck = false;
            ds.deleteMark( data => {
                alert("deletedMark");
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
            jQCloud
        };
    };
});