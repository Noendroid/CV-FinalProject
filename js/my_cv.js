$(function(){

    console.log("sending request");
    var user_id = window.location.hash.substr(1); //Get the section after hash tag from URL, e.g. index.html#Arik return 'Arik'
    console.log("user-> ", user_id);
    if(user_id === '') {
        alert('No user id selected');
    } else {
      $.get('http://localhost/CV-FinalProject/php/get_user_data/getUserData.php?user_id=' + user_id, function(data) { //This code makes an HTTP request to /arik and puts the data in the 'data' variable

          console.log('user data:', data); //We just print whatever we got from the server
          //Basic info
          $('#intro header h1').text(data.first_name); //Let's use the data from server and pub it on page!
          $('#intro header h2').text(data.last_name);
          $('#intro header h3').text(data.degree);
          $('#phone').text(data.phone);
          $('#area').text(data.address);
          $('#email').text(data.email);
          $('#intro article p').text(data.about_me);


    });
    /*
    <li>
        <i class="fa fa-facebook-official" aria-hidden="true"></i>
        <a href="#">Facebook</a>
    </li>
    */
    $.get('http://localhost/CV-FinalProject/php/get_user_data/getUserSocialNetworks.php?user_id=' + user_id, function(data) { //This code makes an HTTP request to /arik and puts the data in the 'data' variable

        console.log('social-networks:', data); //We just print whatever we got from the server

        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += "<li>";
            html += "<i class='" + getNetworkIcon(data[i].network_id) + "' aria-hidden='true'></i>";
            html += "<a href='" + data[i].value + "'>" + getNetworkName(data[i].network_id) + "</a>";
            html += "</li>";
        }
        $("#social-networks").html(html);
    });

    function getNetworkIcon(id){
        var msg = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/getSocialNetworks.php",
            async: false
        }).responseText;
        msg = JSON.parse(msg);
        for (var i = 0; i < msg.length; i++) {
            if(msg[i].id == id){
                return msg[i].icon_name;
            }
        }
        return null;
    }
    function getNetworkName(id){
        var msg = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/getSocialNetworks.php",
            async: false
        }).responseText;
        msg = JSON.parse(msg);
        for (var i = 0; i < msg.length; i++) {
            if(msg[i].id == id){
                return msg[i].name;
            }
        }
        return null;
    }
    /*
    <h2 class='secondary_tytle'>experience</h2>
    <section>
        <aside>
            <h5>SENIOR WEB DEVELOPER</h5>
            <span>Jan 2017 - Dec 2015</span>
        </aside>
        <article>
            <h4>Works In Lorem Ipsum - United States</h4>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at felis libero. Proin pretium mauris id dignissim consequat. Sed ante mi, aliquam et sollicitudin in, molestie eget neque. Nulla facilisi. Duis id nisi eu ante eleifend dictum u
            </p>
        </article>
    </section>
    */
    $.get('http://localhost/CV-FinalProject/php/get_user_data/getUserExperience.php?user_id=' + user_id, function(data) { //This code makes an HTTP request to /arik and puts the data in the 'data' variable

        console.log('experience:', data); //We just print whatever we got from the server
        var monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];

        var html = "<h2 class='secondary_tytle'>experience</h2>";
        for (var i = 0; i < data.length; i++) {
            html += "<section>";
            html += "<aside>";
            html += "<h5>" + data[i].title + "</h5>";
            var start_date = new Date(data[i].start_date);
            var end_date = new Date(data[i].end_date);
            html += "<span>";
            html += monthNames[start_date.getMonth()] + " " + start_date.getFullYear();
            html += " to " + monthNames[end_date.getMonth()] + " " + end_date.getFullYear();
            html += "</span>";
            html += "</aside>";
            html += "<article>";
            html += "<h4>" + data[i].company + "</h4>";
            html += "<p>";
            html += data[i].description;
            html += "</p>";
            html += "</article>";
            html += "</section>";
        }
        $("#experience").html(html);
    });
    }

});
