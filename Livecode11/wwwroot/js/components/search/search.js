﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var searchedPosts = ko.observableArray([]);
    var postdata = ko.observable();
    var parsed = ko.observable();
    var inputsearch = ko.observable();
    //var markedPosts = ko.observableArray();
    var username;
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
            postdata(JSON.stringify(data[0].title));
            parsed(JSON.parse(data));
            //getMarkings();
            //checkPosts();
        },inputsearch(), username());
    };

    /*var getMarkings = function(){
        ds.getMarkings( data => {
            markedPosts(data);
    }, username());
    };
    
    var checkPosts = function(){
        searchedPosts.forEach(function (searchedPosts) {
             markedPosts.forEach(function (markedPosts){
                if (searchedPosts.id === markedPosts.postid) {
                    searchedPosts.markCheck = true;
                }
            })
        })
    };
    
    var clickMarkPost = function(){
        if (markCheck !== true){
            ds.markPost( data => {
                markedPost(data);
            var annotation = prompt("Please enter an annotation:", "Text");
            }, username(), postid(), annotation());     
        }
        if (markCheck === true){
            ds.deleteMark( data => {
                deletedMark(data);
            }, username(), postid());
        }
    };*/
    
    return function (params) {
        username = params.userName;
        return {
            inputsearch,
            username,
            searchedPosts,
            postdata,
            parsed,
            pageNumber,
            nbPerPage,
            totalPages,
            paginated,
            hasPrevious,
            hasNext,
            next,
            previous,
            searchPost,
            /*clickMarkPost,
            markedPosts,
            getMarkings,
            postid,
            annotation,
            checkPosts*/
        };
    };
});