﻿define([], function() {

    var login = async function(callback, inputusername, inputpassword) {
        var credentials = {UserName:inputusername, Password:inputpassword};
        var response = await fetch("api/auth/tokens",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(credentials) // body data type must match "Content-Type" header
        });
        var data = await response.json();
        callback(data);
    };

    var markPost = async function(callback, username, postid, annotation) {
        var marking = {UserName:username(), PostId:postid, Annotation:annotation};
        var response = await fetch("api/mark",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(marking) // body data type must match "Content-Type" header
        });
        var data = await response.json();
        callback(data);
    };

    var deleteMark = async function(callback, username, markid) {
        var response = await fetch("api/mark/"+markid,{
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        });
        callback();
    };
    
    var getMarkings = async function(callback, username) {
        var user = {UserName:username()};
        var response = await fetch("api/mark/markings",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(user) // body data type must match "Content-Type" header
        });
        var data = await response.json();
        callback(data);
    };
    
    var detailPost = async function(callback, inputid) {
        var post = parseInt(inputid,10);
        var postfind = {Id:post};
        var response = await fetch("api/posts", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }, 
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(postfind) // body data type must match "Content-Type" header    
        });
        var data = await response.json();
        callback(data)
    };
    
    var searchPost = async function(callback, inputsearch, username) {
        var postsearch = {searchtext:inputsearch, username:username};
        var response = await fetch ("api/posts/search",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(postsearch) // body data type must match "Content-Type" header  
        });
        var data = await response.json();
        callback(data); 
    };

    var getSearchHistory = async function(callback, inputsearchhid) {
        var historysearch = {UserName:inputsearchhid};
        var response = await fetch ("api/search",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(historysearch) // body data type must match "Content-Type" header  
        });
        var data = await response.json();
        callback(data);
    };
    
    var changeProfile = async function(callback, inputusername, inputpassword, inputemail) {
        var profile = {UserName:inputusername, Password:inputpassword, Email:inputemail};
        var response = await fetch("api/auth",{
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(profile) // body data type must match "Content-Type" header
        });
        callback();
    };

    var deleteProfile = async function(callback, username) { 
        var response = await fetch("api/auth/"+username.toString(),{
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        });
        var data = await response.json();
        callback(data);
    };

    var getSearchWords = async function (callback, inputId) {
        var searchwords = {Id:inputId};
        var response = await fetch("api/words",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(inputId) // body data type must match "Content-Type" header
        });
        var data = await response.json();
        callback(data);
    };

    var getStopWords = async function (callback) {
        var response = await fetch("api/words/stop",{
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        });
        var data = await response.json();
        callback(data);
    };
    
    return {
        getMarkings,
        login,
        detailPost,
        searchPost,
        getSearchHistory,
        changeProfile,
        deleteProfile,
        markPost,
        deleteMark,
        getSearchWords,
        getStopWords
    };
});