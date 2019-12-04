﻿define(["jquery"], function($) {
    var getNamesWithJQyery = function(callback) {
        $.getJSON("api/names", callback);
    };

    var getNamesWithFetch = function(callback) {
        fetch("api/names")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                callback(data);
            });
    };

    var getNamesWithFetchAsync = async function(callback) {
        var response = await fetch("api/names");
        var data = await response.json();
        callback(data);
    };


    return {
        getNamesWithJQyery,
        getNamesWithFetch,
        getNamesWithFetchAsync
    }
});