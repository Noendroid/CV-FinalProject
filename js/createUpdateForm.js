$(function(){

    var user_id = window.location.hash.substr(1); //Get the section after hash tag from URL, e.g. index.html#Arik return 'Arik'
    console.log("user: ", user_id);
    function get_user_data(user_id){
        var data = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/get_user_data/getUserData.php?user_id=" + user_id,
            async: false
        }).responseText;
        data = JSON.parse(data);
        return data;
    }

    function get_user_networks(user_id, network_name){
        var data = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/get_user_data/getUserSocialNetworks.php?user_id=" + user_id,
            async: false
        }).responseText;
        data = JSON.parse(data);
        return data;
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

    function get_user_education(user_id){
        var data = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/get_user_data/getUserEducation.php?user_id=" + user_id,
            async: false
        }).responseText;
        data = JSON.parse(data);
        return data;
    }

    function get_user_experience(user_id){
        var data = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/get_user_data/getUserExperience.php?user_id=" + user_id,
            async: false
        }).responseText;
        data = JSON.parse(data);
        return data;
    }

    function get_user_pro(user_id){
        var data = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/get_user_data/getUserProSkills.php?user_id=" + user_id,
            async: false
        }).responseText;
        data = JSON.parse(data);
        return data;
    }
    function getProSkillName(id){
        var msg = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/getProSkills.php",
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
    function get_user_per(user_id){
        var data = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/get_user_data/getUserPerSkills.php?user_id=" + user_id,
            async: false
        }).responseText;
        data = JSON.parse(data);
        return data;
    }
    function getPerSkillName(id){
        var msg = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/getPerSkills.php",
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
    function get_user_hobbies(user_id){
        var data = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/get_user_data/getUserHobbies.php?user_id=" + user_id,
            async: false
        }).responseText;
        data = JSON.parse(data);
        return data;
    }
    function get_user_languages(user_id){
        var data = $.ajax({
            type: "GET",
            url: "http://localhost/CV-FinalProject/php/get_user_data/getUserLanguages.php?user_id=" + user_id,
            async: false
        }).responseText;
        data = JSON.parse(data);
        return data;
    }
/*
    console.log("get_user_data:",get_user_data(1));
    console.log("get_user_networks:",get_user_networks(1));
    console.log("get_user_experience:",get_user_experience(1));
    console.log("get_user_education:",get_user_education(1));
    console.log("get_user_per:",get_user_per(1));
    console.log("get_user_pro:",get_user_pro(1));
    console.log("get_user_hobbies:",get_user_hobbies(1));
    console.log("get_user_languages:",get_user_languages(1));*/

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
        if(user_id > 0){
            data = get_user_networks(user_id);
            console.log("user_networks: ",data);
            for (var i = 0; i < data.length; i++) {
                document.getElementsByName(getNetworkName(data[i].network_id))[0].value = data[i].value;
            }
        }
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
        if(user_id > 0){
            data = get_user_pro(user_id);
            console.log("user_pro_skills: ",data);
            for (var i = 0; i < data.length; i++) {
                document.getElementsByName(getProSkillName(data[i].skill_id))[0].value = data[i].value;
            }
        }
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
        if(user_id > 0){
            data = get_user_per(user_id);
            console.log("user_per_skills: ",data);
            for (var i = 0; i < data.length; i++) {
                document.getElementsByName(getPerSkillName(data[i].skill_id))[0].value = data[i].value;
            }
        }
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

    if(user_id > 0){
        //  user data
        data = get_user_data(user_id);
        console.log(data);
        document.getElementsByName("first_name")[0].value = data.first_name;
        document.getElementsByName("last_name")[0].value = data.last_name;
        document.getElementsByName("degree")[0].value = data.degree;
        document.getElementsByName("phone")[0].value = data.phone;
        document.getElementsByName("address")[0].value = data.address;
        document.getElementsByName("email")[0].value = data.email;
        document.getElementsByName("about_me")[0].value = data.about_me;


    }
});
