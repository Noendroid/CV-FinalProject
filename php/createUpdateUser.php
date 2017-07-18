<?php
include_once 'db_connector.php';
/*
PART 1
'first_name' => string '' (length=0)
'last_name' => string '' (length=0)
'degree' => string '' (length=0)
'phone' => string '' (length=0)
'address' => string '' (length=0)
'email' => string '' (length=0)
'about_me' => string '' (length=0)
PART 2
'facebook' => string '' (length=0)
'linkedin' => string '' (length=0)
'instagram' => string '' (length=0)
'medium' => string '' (length=0)
'website' => string '' (length=0)
'google_plus' => string '' (length=0)
'twitter' => string '' (length=0)
PART3
'exp_title_0' => string '' (length=0)
'exp_dates_0' => string '' (length=0)
'exp_company_0' => string '' (length=0)
'exp_description_0' => string '' (length=0)
'exp_title_1' => string '' (length=0)
'exp_dates_1' => string '' (length=0)
'exp_company_1' => string '' (length=0)
'exp_description_1' => string '' (length=0)
'exp_title_2' => string '' (length=0)
'exp_dates_2' => string '' (length=0)
'exp_company_2' => string '' (length=0)
'exp_description_2' => string '' (length=0)
PART 4
'Creativity' => string '' (length=0)
'Hard_Work' => string '' (length=0)
'Team_Work' => string '' (length=0)
'Leader_Ship' => string '' (length=0)
'Photoshop' => string '' (length=0)
'Illustrator' => string '' (length=0)
'JavaScript' => string '' (length=0)
'HTML/CSS' => string '' (length=0)
PART 5
'edu_title_0' => string '' (length=0)
'edu_dates_0' => string '' (length=0)
'edu_place_0' => string '' (length=0)
'edu_description_0' => string '' (length=0)
'edu_title_1' => string '' (length=0)
'edu_dates_1' => string '' (length=0)
'edu_place_1' => string '' (length=0)
'edu_description_1' => string '' (length=0)
PART 6
'English' => string '' (length=0)
'French' => string '' (length=0)
'Hebrew' => string '' (length=0)
'Russian' => string '' (length=0)
'Arabic' => string '' (length=0)
'Italian' => string '' (length=0)
*/
if (isset($_POST) && !empty($_POST)){
	$validated = true;
	$get_user_id_sql = "SELECT MAX(id) FROM users;";
	$result = $mysqli->query($get_user_id_sql);
	$user_id = $result->fetch_assoc();
	$user_id = $user_id['MAX(id)'];
	$user_id++;//this will be the id for the user

	// HEADER - PART 1
	if (empty($_POST['first_name'])) {
		$errs[] = "First name is empty";
		$validated = false;
	}
	if (empty($_POST['last_name'])) {
		$errs[] = "Last name is empty";
		$validated = false;
	}
	if (empty($_POST['degree'])) {
		$errs[] = "degree is empty";
		$validated = false;
	}
	if(!preg_match("/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/", $_POST['phone'])) {
		$errs[] = "Phone number should look like this 000-000-0000";
		$validated = false;
	}
	if (empty($_POST['address'])) {
		$errs[] = "adress is empty";
		$validated = false;
	}
	if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$errs[] = "Email should be an email";
		$validated = false;
	}
	if (empty($_POST['about_me'])) {
		$errs[] = "please tell us somthing about yourself";
		$validated = false;
	}
	// SOCIAL NETWORKS - PART 2
	$social_networks = "SELECT * FROM social_networks;";
    $result = $mysqli->query($social_networks);
	while ($a = $result->fetch_assoc()) {
		$data[] = $a;
	}
	$networks_empty = true;
	for ($i=0; $i < sizeof($data); $i++) {
		if(!empty($_POST[$data[$i]['name']])){
			$networks_empty = false;
			// $networks_values -> [network name, network value]
			$networks_values[] = [$data[$i]['name'], $_POST[$data[$i]['name']]];
		}
	}
	if($networks_empty){
		$errs[] = 'Something is not right with the social networks section';
		$validated = false;
	}
	// EXPERIENCE - PART 3
	$sql_per_skills = "SELECT name FROM per_skills;";//finding the first per skill in the database
	//this way we will know where the experiences ends in the $_POST
	$result = $mysqli->query($sql_per_skills);
	unset($data);
	while ($a = $result->fetch_assoc()) {
		$data[] = $a;
	}
	$exp_empty = true;
	$experience_first = array_search("exp_title_0", array_keys($_POST));
	$experience_last = array_search($data[0]['name'], array_keys($_POST));
	$experience_data = array_slice($_POST, $experience_first, $experience_last - $experience_first);
	//create a dictionary of the experience section
	$counter = 0;
	foreach ($experience_data as $key => $value) { // for each key and value
		$counter++;
		if (!empty($value)) { // if the value is not empty
			$experience_values[] = $value; // add this value and his key to experience_values
			$exp_empty = false;
		}
		if($counter % 5 === 0){// when we got through 4 elements
			//we need to check if all the inputs was OK
			if(isset($experience_values)){
				if(sizeof($experience_values) % 5 == 0){// if the number of not values is also 4
					// it means that all the fields were full
					$values_exp = array(
			            $user_id,
						$experience_values[0],
						$experience_values[1],
						$experience_values[2],
						$experience_values[3],
						$experience_values[4]
					);
					$queries[] = vsprintf('insert into user_experience (user_id,title,company,start_date,end_date,description)
			        values ("%s","%s","%s","%s","%s","%s");', $values_exp);// insert to user_experience table
				}
			}
			else {
				$errs[] = "Something is not right with the experience section";
				$validated = false;
				$exp_empty = true;
				break;
			}
			$counter = 0;
			unset($experience_values);
		}
	}
	// SKILLS - PART 4
	// get all the per and pro skills
	$sql_per_skills = "SELECT * FROM per_skills;";
	$sql_pro_skills = "SELECT * FROM pro_skills;";
	// commit the queries to the database
	$per_result = $mysqli->query($sql_per_skills);
	$pro_result = $mysqli->query($sql_pro_skills);
	// fetch the data from the database
	while ($a = $per_result->fetch_assoc()) {
		$per_skills[] = $a;
	}
	while ($a = $pro_result->fetch_assoc()) {
		$pro_skills[] = $a;
	}
	// get number of per and pro skills
	$per_len = sizeof($per_skills);
	$pro_len = sizeof($pro_skills);
	// get the data from $_POST
	$per_first = array_search($per_skills[0]['name'], array_keys($_POST));
	$per_data = array_slice($_POST, $per_first, $per_len);
	$pro_first = array_search($pro_skills[0]['name'], array_keys($_POST));
	$pro_data = array_slice($_POST, $pro_first, $pro_len);
	$per_empty = true;
	$pro_empty = true;
	$counter = 0;
	// check if all the data in per skills in correct
	foreach ($per_data as $key => $value) {
		if(!empty($value)){
			if(!is_numeric($value)){
				$validated = false;
				$errs[] = "Somthing is not right with per skills";
				break;
			}
			else {
				if($value < 0 or $value > 100){
					$validated = false;
					$errs[] = "Somthing is not right with pro skills";
					break;
				}
				else if($value != 0){
					$per_values = array(
						$per_skills[$counter]['id'],
						$user_id,
						$value
					);
					$per_queries[] = vsprintf('insert into user_per_skills (skill_id,user_id,value)
					values ("%s","%s","%s");', $per_values);// insert to user_per_skills table
				}
			}
			$counter++;
		}
	}
	// check if all the data in pro skills in correct
	$counter = 0;
	foreach ($pro_data as $key => $value) {
		if(!empty($value)){
			if(!is_numeric($value)){
				$validated = false;
				$errs[] = "Somthing is not right with pro skills";
				break;
			}
			else {
				if($value < 0 or $value > 100){
					$validated = false;
					$errs[] = "Somthing is not right with pro skills";
					break;
				}
				else if($value != 0){
					$pro_values = array(
						$pro_skills[$counter]['id'],
						$user_id,
						$value
					);
					$pro_queries[] = vsprintf('insert into user_pro_skills (skill_id,user_id,value)
					values ("%s","%s","%s");', $pro_values);// insert to user_pro_skills table
				}
			}
			$counter++;
		}
	}
	// EDUCATION - PART 5
	die();










	if ($validated){
		// insert line to db
		$values_user = array(
            $_POST['first_name'],
			$_POST['last_name'],
			$_POST['phone'],
			$_POST['email'],
			$_POST['address'],
			$_POST['about_me'],
			$_POST['degree']
		);
		$query = vsprintf('insert into users (first_name,last_name,phone,email,address,about_me,degree)
        values ("%s","%s","%s","%s","%s","%s","%s");', $values_user);// insert to users table

		$res = $mysqli->query($query);

		if ($res) { // if adding the user was a success
			echo "User Added<br/>";
            $query_user_id = "SELECT MAX(id) FROM users;"; // get the user's id in database
            $res = $mysqli->query($query_user_id);
			var_dump($res);
			$res = mysqli_fetch_row($res);
			$user_id = $res[0]; // save user's id
			var_dump($user_id);
			$first_network_key = 7;//array_search('about_me', $_POST) + 1;// get the first network index
			$query_networks_len = "SELECT COUNT(*) FROM social_networks;"; // number of networks in database
			$res = $mysqli->query($query_networks_len);
			$res = mysqli_fetch_row($res);
			$len = $res[0]; // save number of networks
			$links = array_slice($_POST, $first_network_key, $len);// put the networks in an array
			$net = $first_network_key;
			foreach ($links as $i) { // if there is a link for a specific network
				if(!empty($i)){
					$net_name = '';
					$count = 0;
					foreach( $_POST as $key => $value  ) {
					    if ($count > $first_network_key + $len - 2) {
					    	break;
					    } else {
					    	if ($count === $net) {
					    		$net_name = $key;
								break;
					    	}
					    }
						$count++;
					}
					$query_network_id = "SELECT id FROM social_networks WHERE name='" . $net_name . "';"; // get the id of this network
					var_dump($query_network_id);
					$res = $mysqli->query($query_network_id);
					$res = mysqli_fetch_row($res);
					$network_id = $res[0]; // save network id
					// enter the user's link to the database
					$values_user_networks = array(
						$network_id,
						$user_id,
						$i // the social network link
					);
					$query_enter_network = vsprintf("INSERT INTO user_social_networks (network_id, user_id, value)
					VALUES ('%s','%s','%s');", $values_user_networks); // query for inserting the user's link to database
					var_dump($query_enter_network);
					$res = $mysqli->query($query_enter_network);// execute query
					echo "social network added";
					$net++;
				}
			}
			echo "done social networks!";
		} else {
            var_dump($query);
			echo "Error adding user<br/>";
        }
    }
	if (isset($errs)){
		foreach ($errs as $err){
			echo "$err <br/>";
		}
	}
}
?>
