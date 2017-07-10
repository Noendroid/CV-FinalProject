$(function(){
/*
    var users = {
        user: {
            `id`: 0,
            `first_name`: 'igal',
            `last_name`: 'Kolihman',
            `phone`: '054-683-0597',
            `email`: 'igalhamer@gmail.com',
            `area`: 'lod',
            `about_me`: 'good stafff',
            `degree`: 'Doctorim'
        }
    };*/
    console.log("sending request");
    var user_id = window.location.hash.substr(1); //Get the section after hash tag from URL, e.g. index.html#Arik return 'Arik'
    console.log("user-> ", user_id);
    if(user_id === '') {
        alert('No user id selected');
    } else {
      $.get('http://localhost/CV-FinalProject/php/getUserData.php?user_id=' + user_id, function(data) { //This code makes an HTTP request to /arik and puts the data in the 'data' variable

          console.log('Got data', data); //We just print whatever we got from the server
          //Basic info
          $('#intro header h1').text(data.first_name); //Let's use the data from server and pub it on page!
          $('#intro header h2').text(data.last_name);
          $('#phone').text(data.phone);
          $('#area').text(data.area);
          $('#email').text(data.email);
          $('#intro article p').text(data.about_me);


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

      });

    }

});
