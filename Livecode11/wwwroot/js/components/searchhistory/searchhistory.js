﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    
    var inputsearchhid = ko.observable();
    var username;
    var searchHistory = ko.observableArray();
    var pageNumber = ko.observable(0);
    var nbPerPage = 10;

    var totalPages = ko.computed(function() {
        var div = Math.floor(searchHistory().length / nbPerPage);
        div += searchHistory.length % nbPerPage > 0 ? 1 : 0;
        return div - 1;
    });

    var paginated = ko.computed(function() {
        var first = pageNumber() * nbPerPage;
        return searchHistory.slice(first, first + nbPerPage);
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
    
    var getHistory = function(){
        ds.getSearchHistory( data => {
            searchHistory(data);
        },username());
    };
    return function (params) {
        username = params.userName;
        getHistory();
        return {
            inputsearchhid,
            searchHistory,
            paginated,
            next,
            previous,
            hasNext,
            hasPrevious,
            nbPerPage,
            pageNumber
        };
    };
});