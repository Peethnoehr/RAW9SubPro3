define(["knockout", "dataService"], function (ko, ds) {
    var post = ko.observableArray([]);
    
    ds.getPostWithFetchAsync(function(data){
       post(data) 
    });

    return {
        post
    };
});