﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputusername = ko.observable();
    var inputpassword = ko.observable();
    var username; // = ko.observable("initialValue");
    var email;
    var loggedIn = ko.observable(false);
    var testAlert = function(){
        {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }
    };
    /*var login = function() {
        ds.login(data => {
            username(data.userName);
        email(data.email);
        if (username() !== undefined){
            loggedIn(true);
        }
    },inputusername(),inputpassword());
    };*/
    return function (params) {
        username = params.userName;
        email = params.email;
        return {
            username,
            email,
            inputusername,
            inputpassword,
            testAlert,
        //    login,
            loggedIn
        };
    };
});