﻿define([], function() {
    var getNames = async function(callback) {
        var response = await fetch("api/names");
        var data = await response.json();
        callback(data);
    };

    var getWords = async function(callback) {
        var response = await fetch("api/words");
        var data = await response.json();
        callback(data);
    };

    var login = async function(callback, inputusername, inputpassword) {
        alert("username input: "+inputusername);
        alert("password input: "+inputpassword);
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
        alert("After fetch");
        var data = await response.json();
        alert("Stringified credentials: "+JSON.stringify(credentials));
        alert("Stringified hardcoded input: "+JSON.stringify({"UserName":"Test","Password":"TestPW"}));
        alert("Stringified output: "+JSON.stringify(data));
        alert("returned username: "+data.userName);
        alert("returned email: "+data.email);
        alert("returned token: "+data.token);
        callback(data);
    };

    var markPost = async function(callback, username, postid, annotation) {
        alert("username: "+username());
        alert("id: "+postid);
        alert("annotation: "+annotation);
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
        alert("After fetch");
        var data = await response.json();
        alert("Stringified input: "+JSON.stringify(marking));
        alert("Stringified output: "+JSON.stringify(data));
        callback(data);
    };

    var deleteMark = async function(callback, username, markid) { 
        alert("username input: "+username());
        alert("markID input: "+markid)
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
        alert("After fetch");
        var data = await response.json();
        alert("Stringified output: "+JSON.stringify(data));
        callback(data);
    };
    
    var getMarkings = async function(callback, username) {
        alert("user:"+username());
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
        alert("After fetch");
        var data = await response.json();
        alert("GetMarkings output: "+JSON.stringify(data));
        callback(data);
    };
    
    var detailPost = async function(callback, inputid) {
        var post = parseInt(inputid,10);
        //alert("id input: "+post);
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
        //alert("After fetch");
        var data = await response.json();
        //alert("Stringified postfind: "+JSON.stringify(postfind));
        //alert("Stringified output: "+JSON.stringify(data));
        callback(data)
    };
    
    var searchPost = async function(callback, inputsearch, username) {
        alert(JSON.stringify(inputsearch)+JSON.stringify(username));
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
        alert("After fetch");
        var data = await response.json();
        alert("Stringified output: "+JSON.stringify(data));
        callback(data)
    };

    var searchHistory = async function(callback, inputsearchhid) {
        alert("Test input: "+inputsearchhid);
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
        alert("After fetch");
        var data = await response.json();
        alert("Stringified historysearch: "+JSON.stringify(historysearch));
        alert("Stringified hardcoded input: "+JSON.stringify({"historysearch":"TEST"}));
        alert("Stringified output: "+JSON.stringify(data));
        alert("Returned search: "+data);
        callback(data)
    };
    
    var changeProfile = async function(callback, inputusername, inputpassword, inputemail) {
        var profile = {UserName:inputusername, Password:inputpassword, Email:inputemail};
        alert(JSON.stringify(profile));
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
        alert("After fetch");
        //var data = await response.json();
        callback();
    };

    var deleteProfile = async function(callback, username) { //DOES NOT WORK...
        alert("username input: "+username);
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
        alert("After fetch");
        var data = await response.json();
        alert("Stringified output: "+JSON.stringify(data));
        callback(data);
    };

    var getSearchWords = async function (callback, inputid) {
        alert("id input: "+inputid);
        var searchwords = {Id:inputid};
        var response = await fetch("api/words",{
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
            body: JSON.stringify(searchwords) // body data type must match "Content-Type" header
        });
        alert("After fetch");
        var data = await response.json();
        alert("Stringified output: "+JSON.stringify(data));
        callback(data);
    };

    var getStopWords = async function (callback) {
        alert("Before fetch");
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
        alert("After fetch");
        var data = await response.json();
        alert("Stringified output: "+JSON.stringify(data));
        callback(data);
    };
    
    return {
        getMarkings,
        getNames,
        getWords,
        login,
        detailPost,
        searchPost,
        searchHistory,
        changeProfile,
        deleteProfile,
        markPost,
        deleteMark,
        getSearchWords,
        getStopWords
    };
});