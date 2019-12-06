﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    return function (params) {

        var width = params.width || 200;
        var height = params.height || 200;
        var words = [];

        var word = ko.observable();
        var weight = ko.observable();
        var inputusername = ko.observable();
        var inputpassword = ko.observable();
        var addWord2 = function() {
            words.push({ text: inputusername(), weight: inputpassword() });
            word("");
            weight("");
            $('#cloud').jQCloud('update', words);
        };
        var addWord = function() {
            words.push({ text: word(), weight: weight() });
            word("");
            weight("");
            $('#cloud').jQCloud('update', words);
        };

        ds.getWords(data => {
            words = data;
            $('#cloud').jQCloud(words,
                {
                    width: width,
                    height: height
                });
        });

        return {
            word,
            weight,
            addWord
        };
    };
});