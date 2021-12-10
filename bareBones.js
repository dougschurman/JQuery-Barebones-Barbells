/**************************************
 TITLE: bareBones.js
 AUTHOR: Doug Schurman
 CREATE DATE: 9 December 2021
 PURPOSE: Add function to BareBones
 LAST MODIFIED ON: 9/12/21
 LAST MODIFIED BY: Doug Schurman
***************************************/

$(document).ready(function(){
    
    var availableTags = [ //List to fill autocomplete
        "cross fit",
        "lifter",
        "casual",
        "noobie",
        "noob",
        "beginner",
        "gym rat",
        "runner",
        "bodybuilder"
    ];

    //Sources autocomplete tags for autocomplete input
    $( "#level" ).autocomplete({
        source: availableTags
    });

    //Enables tab widget
    $( "#tabs" ).tabs();

    $("#equals").click(function(){
        var equation = document.getElementById('answer').textContent;
        document.getElementById("answer").innerHTML = eval(equation);
    
    });

    //Enables dialog widget
    $( "#login" ).dialog({
        autoOpen: false,
    });

    //opens dialog on click
    $("#openLogin").click(function () {
        $("#login").dialog("open");
    });

    //Login form closing on submit
    $("#loginSubmit").click(function () {
        if($("#loginForm").valid()){
            var infoList = [];
            var email = $("#email").val();
            var password = $("#password").val();
            var tel = $("#tel").val();

            infoList.push(email + " " + password + " " + tel);
            

            $("#loginInfo").empty();
            $("#loginInfo").append(infoList);
        }
    });

    //enables radio buttons widget
    $( "#radioset" ).buttonset();

    //enables datepicker widget
    $( "#datepicker" ).datepicker({
        inline: true
    });

    //enables spinner widget
    $( "#horizontal-spinner" ).spinner();

    //handles submit button functions
    $( "#submit" ).click( function(){
        if($("#workoutForm").valid()){
            var strCheckedBoxes = []; //list to hold checked box values
        
            var level = $('#level').val();//holds level value
        
            //holds spinner value
            var spinVal = $('#horizontal-spinner').spinner("value");

            //holds date value from datepicker
            var date = $('#datepicker').datepicker('getDate');

            //holds name value from username input textbox
            var username = $('#username').val();

            //holds radio button selected
            var strRadioBox = $('input[name="radio"]:checked').val();

            $('input[name="workouts"]:checked').each(function(){
                strCheckedBoxes += $(this).val() + ", ";
            });
        
            $('#workoutOut').append(
                `You are a ${level} named ${username}, who is ${strRadioBox}. You will workout on ${date}. You will do ${strCheckedBoxes}${spinVal} times.`
            );
        }

        return false;   // Prevents the DOM from reloading on submit
      });


    //login form validation
    $("#loginForm").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            },
            tel: {
                required: true,
                digits: true
            }
        },
        messages: {
            email: "Type a valid email address",
            password: {
                required: "Enter a password",
                minlength: "Must be atleast 8 characters long"
            },
            tel: {
                required: "Enter your phone number with only digits",
                digits: "Must be digits"
            }
        }
    });

    //workout form validation
    $("#workoutForm").validate({
        rules: {
            level: {
                required: true
            },
            radio: {
                required: true
            },
            datepicker: {
                required: true
            },
            workouts: {
                required: true
            },
            value: {
                required: true
            },
            username: {
                required: true
            }
        },
        messages: {
            level: "Enter a level",
            radio: "Select a gender",
            datepicker: "Select a date",
            workouts: "Select atleast one workout",
            value: "Enter a value",
            username: "Enter your name"

        },
        errorPlacement: function(error, element){
            if(element.attr("name")=="workouts"){
                error.insertAfter(".checkboxLabel");
            } else
            {
                error.insertAfter(element);
            }
        }
    });
      
}); // end of $(document).ready()
    