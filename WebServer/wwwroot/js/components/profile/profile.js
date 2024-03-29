﻿﻿define(["jquery", "knockout", "dataService", "jqcloud"], function($, ko, ds) {
    var inputpassword = ko.observable();
    var inputemail = ko.observable();
    var username;
    var email;
    
    var validate = false;
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
    
    var changeProfile = function() {
        validateForms();
        if(validate && confirm("Are you sure you want to change your information?")){
            ds.changeProfile(data => {
            email(inputemail());
            },username(),inputpassword(),inputemail());
        }
        validate = false;
    };
    var deleteProfile = function() {
        if(confirm("Are you sure you want to delete your profile?"))
        {
            ds.deleteProfile(data => {
            username(undefined);
            },username());
        }
    };
    
    return function (params) {
        username = params.userName;
        email = params.email;
        validateForms();
        return {
            inputpassword,
            inputemail,
            changeProfile,
            deleteProfile,
            username,
            email
        };
    };
});