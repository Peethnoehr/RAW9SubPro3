﻿define(['knockout', 'dataService', 'store'], function (ko, ds, store) {
    return function (params) {
    var markings = ko.observableArray([]);
    
    var selectPerson = function (person) {
        store.dispatch(store.actions.selectPerson(person));
        store.dispatch(store.actions.selectMenu("Component 2"));
        //postman.publish("selectperson", person);
    };

    ds.getNames(persons);

    
        return {
            markings
        };
    };
});