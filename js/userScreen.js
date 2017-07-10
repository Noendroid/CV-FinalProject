$(function(){

    /*
    This section gets all the users from the server and lists them in client
    */
    console.log("sending request to get all users data");

    $.get('http://localhost/CV-FinalProject/php/getAllUsersData.php', function(data) { //This code makes an HTTP request to /arik and puts the data in the 'data' variable

          console.log('Got data', data); //We just print whatever we got from the server
          var html = '';
          html += "<table class='table_style'>";
          html += "<tr id='line'>";// starting to build the table
          html += '<td><b>First Name</b></td>';
          html += '<td><b>Last Name</b></td>';
          html += '<td><b>Email</b></td>';
          html += '<td><b>Delete</b></td>';
          html += '<td><b>Edit</b></td>';
          html += '</tr>';// closing the table tytles

          for (index in data){
               // adding user line
              html += "<tr id='line'>";
              html += "<td><a href='http://localhost/CV-FinalProject/index.html#" + data[index].id + "'>" + data[index].first_name + '</a></td>';
              html += '<td>'+ data[index].last_name +'</td>';
              html += '<td>'+ data[index].email +'</td>';
              html += '<td>'+ "<input type='submit' value='delete'>" +'</td>';
              html += '<td>'+ "<input type='submit' value='edit'>" +'</td>';
              html += '</tr>';
              // ending of the user line
          }
          html += '</table>';//closing the table

          $('#screen').append(html);
          /*
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
          */

      });
});
