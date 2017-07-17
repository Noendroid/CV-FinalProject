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
			$all_empty = false;
			// $networks_values -> [network name, network value]
			$networks_values[] = [$data[$i]['name'], $_POST[$data[$i]['name']]];
		}
	}
	// EXPERIENCE - PART 3
	$per_skills = "SELECT name FROM per_skills;";
	$result = $mysqli->query($per_skills);
	unset($data);
	while ($a = $result->fetch_assoc()) {
		$data[] = $a;
	}
	$exp_empty = true;
	$experience_first = array_search("exp_title_0", array_keys($_POST));
	$experience_last = array_search($data[0]['name'], array_keys($_POST));
	$experience_data = array_slice($_POST, $experience_first, $experience_last - $experience_first);
	foreach ($experience_data as $key => $value) {
		if (!empty($value)) {
			$exp_empty = false;
		}
	}
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
