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
          //Social networks
          $ul = $('<ul>', {
              'id': 'social-networks'
          });

          for(i in data.socialNetworks) { //We also got the social networks from the server, which is acceable from data.socialNetworks.
              var $templi = $('<li>');

              $templi.append('<i class="fa fa-'+data.socialNetworks[i].iconName+'"></i>');
              $templi.append('<a href="'+data.socialNetworks[i].link+'">'+data.socialNetworks[i].name+'</a>');

              $templi.click(function(){
                  alert($(this).children('a').text() + ' clicked!');
              });

              //Add the new li element to the ul
              $ul.append($templi);
          }

          $ul.insertAfter('#intro');
*/

    }

});
