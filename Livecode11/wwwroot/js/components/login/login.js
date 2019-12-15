﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputusername = ko.observable();
    var inputpassword = ko.observable();
    var username; // = ko.observable("initialValue");
    var email;
    var validate = false;
    var loggedIn = ko.observable(false);
    var validateForms = function(){ //Method inspired from https://getbootstrap.com/docs/4.3/components/forms/#validation
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                form.classList.add('was-validated');
                if (form.checkValidity() === true) {
                    validate = true;
                }
                else{
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    };
    var login = function() {
        
        validateForms();
        if(validate === true){
        ds.login(data =>
        {
            username(data.userName);
        email(data.email);
        if (username() !== undefined)
        {
            loggedIn(true);
        }
    },inputusername(),inputpassword())
        };
    validate = false;
    };
    return function (params) {
        username = params.userName;
        email = params.email;
        validateForms();
        return {
            username,
            email,
            inputusername,
            inputpassword,
            login,
            loggedIn,
        };
    };
});