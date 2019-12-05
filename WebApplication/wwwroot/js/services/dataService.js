define(["jquery"], function($) {
   
    var getPostWithFetchAsync = async function(callback) {
        var response = await fetch("api/posts");
        var data = await response.json();
        callback(data);
    };

    return {
        getPostWithFetchAsync
    }
}); 