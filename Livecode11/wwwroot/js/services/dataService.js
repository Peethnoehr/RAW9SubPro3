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

    var login = async function(callback) {
        alert("test");
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
            body: JSON.stringify({"UserName":"Test","Password":"TestPW"}) // body data type must match "Content-Type" header
        });
        alert("test2");
        var data = await response.json();
        alert(JSON.stringify(data));
        callback(data);
    };

    return {
        getNames,
        getWords,
        login,
    };
});