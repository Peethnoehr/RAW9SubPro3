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
        callback(data);
    };

    return {
        getNames,
        getWords,
        login,
    };
});