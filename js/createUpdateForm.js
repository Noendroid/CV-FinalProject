$(function(){
/*
    $("form").submit(function(e) {
        $.ajax({ //Send a request to the server with the form content
               type: "POST",
               url: "http://localhost/CV-FinalProject/php/createUpdateUser.php",
               data: $("form").serialize(), // serializes the form's data
               success: function(data) //This code runs when the request was successful
               {
                   console.log('Success! CV Saved', data);
               },
               error: function(error) { //This code runs when there is a problem with sending the request
                 console.error('Error in submitting form: ', error);
               }
        });
        e.preventDefault(); // avoid to execute the actual submit of the form.

    });
    */

    //get the social networks
    $.get('http://localhost/CV-FinalProject/php/getSocialNetworks.php', function(data) {
        console.log('Got the social networks', data); //We just print whatever we got from the server
        var html = '<section>';
        for (var i = 0; i < data.length; i++) {
            if(i == Math.ceil(data.length / 2)){
                html += "</section>";
                html += "<section>";
            }
            html += "<h5>";
            html += data[i].name;
            html += "<input type='text' name='" + data[i].name + "' placeholder='" + data[i].name + " link'>";
            html += "</h5>";
        }
        html += '</section>';// closing the table tytles

        $('#social_networks').append(html);
    });
    //get the pro skills
    $.get('http://localhost/CV-FinalProject/php/getProSkills.php', function(data) {
        console.log('Got the pro skills', data); //We just print whatever we got from the server
        var html = '<section>';
        html += '<h2>Pro skills</h2>';
        html += '<ul>';
        for (var i = 0; i < data.length; i++) {
            html += "<il>";
            html += data[i].name;
            html += "<input type='text' name='" + data[i].name + "' placeholder='insert a number between 1 - 100'>";
            html += "</il>";
        }
        html += '</ul>';// closing the table tytles
        html += "</section>";
        $('#skills').append(html);
    });

    //get the per skills
    $.get('http://localhost/CV-FinalProject/php/getPerSkills.php', function(data) {
        console.log('Got the per skills', data); //We just print whatever we got from the server
        var html = '<section>';
        html += '<h2>Per skills</h2>';
        html += '<ul>';
        for (var i = 0; i < data.length; i++) {
            html += "<il>";
            html += data[i].name;
            html += "<input type='text' name='" + data[i].name + "' placeholder='insert a number between 1 - 100'>";
            html += "</il>";
        }
        html += '</ul>';// closing the table tytles
        html += "</section>";
        $('#skills').append(html);
    });

    //get the hobbies
    $.get('http://localhost/CV-FinalProject/php/getHobbies.php', function(data) {
        console.log('Got the hobbies', data); //We just print whatever we got from the server
        var html = '<section>';
        html += '<h2>Hobbies</h2>';
        html += '<table>';
        for (var i = 0; i < data.length; i++) {
            html += "<tr>";
            html += "<td>";
            html += "<input type='checkbox' name='" + data[i].name + "' value='" + data[i].name + "'><br>";
            html += "</td>";
            html += "<td>";
            var name = data[i].name.replace("_"," ");
            html += name;
            html += "</td>";
            html += "</tr>";
        }
        html += '</table>';
        html += "</section>";
        $('#hobbies').append(html);
    });

    //get the languages
    $.get('http://localhost/CV-FinalProject/php/getLanguages.php', function(data) {
        console.log('Got the languages', data); //We just print whatever we got from the server
        var html = '<section>';
        html += '<h2>Languages</h2>';
        html += '<ul>';
        for (var i = 0; i < data.length; i++) {
            html += "<li>";
            html += "<input type='text' name='" + data[i].name + "' placeholder='" + data[i].name + " level between 1 - 100'>";
            html += "</li>";
        }
        html += '</ul>';
        html += "</section>";
        $('#languages').append(html);
    });

});
