﻿define(["knockout", "dataService"], function (ko, ds) {
    var firstName = ko.observable("Peter");
    var lastName = ko.observable("Smith");

    var fullName = ko.computed(function() {
        return firstName() + " " + lastName();
    });

    var names = ko.observableArray([]);

    var addName = function(data) {
        names.push(fullName());
    };

    var delName = function(name) {
        names.remove(name);
    };

    //ds.getNamesWithJQyery(function(data) {
    //    names(data);
    //});

    //ds.getNamesWithFetch(function(data) {
    //    names(data);
    //});

    ds.getNamesWithFetchAsync(function (data) {
        names(data);
    });

    return {
        firstName,
        lastName,
        fullName,
        names,
        addName,
        delName
    };
});