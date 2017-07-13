$(function(){

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

    $.get('http://localhost/CV-FinalProject/php/getSocialNetworks.php', function(data) { //This code makes an HTTP request to /arik and puts the data in the 'data' variable

        console.log('Got the social networks', data); //We just print whatever we got from the server
        var html = '<section>';
        for (var i = 0; i < data.length; i++) {
            if(i == Math.ceil(data.length / 2)){
                html += "</section>";
                html += "<section>";
            }
            html += "<h5>";
            html += data[i].name;
            html += "</h5>";
            html += "<input type='text' name='" + data[i].name + "' placeholder='" + data[i].name + " link'><br><br>";
        }
        html += '</section>';// closing the table tytles

        $('#social_networks').append(html);


    });
    /*
    $("#exp_num").onchange = function(){
        var experiences = document.getElementsById("#exp_num");
        var num = experiences.options[experiences.selectedIndex].value;
        console.log(num);
        var html = "";
        for (var i = 0; i < num; i++) {
            html += "<section id='experience'>";
            html += "<section>";
            html += "<input type='text' name='title' placeholder='Title'><br><br>";
            html += "<input type='text' name='dates' placeholder='Work dates'><br><br>";
            html += "</section>";
            html += "<section>";
            html += "<input type='text' name='company' placeholder='Company name'><br><br>";
            html += "<textarea rows='4' cols='35' name='description' placeholder='Description'></textarea><br><br>";
            html += "</section>";
            html += "</section>";
        }
        $('#part3').append(html);
        /*
        <section id='experience'>
            <section>
                <input type='text' name='title' placeholder='Title'><br><br>
                <input type='text' name='dates' placeholder='Work dates'><br><br>
            </section>
            <section>
                <input type='text' name='company' placeholder='Company name'><br><br>
                <textarea rows='4' cols='35' name='description' placeholder='Description'></textarea><br><br>
            </section>
        </section>

    };*/

});
