<?php
include_once 'db_connector.php';
/*
  'name' => string '' (length=0)
  'last_name' => string '' (length=0)
  'degree' => string '' (length=0)
  'phone' => string '' (length=0)
  'address' => string '' (length=0)
  'email' => string '' (length=0)
  'about_me' => string '' (length=0)
  'facebook' => string '' (length=0)
  'linkedin' => string '' (length=0)
  'instagram' => string '' (length=0)
  'website' => string '' (length=0)
  'medium' => string '' (length=0)
  'google_plus' => string '' (length=0)
  'title' => string '' (length=0)
  'dates' => string '' (length=0)
  'company' => string '' (length=0)
  'description' => string '' (length=0)
  'pro_1' => string '' (length=0)
  'pro_2' => string '' (length=0)
  'pro_3' => string '' (length=0)
  'pro_4' => string '' (length=0)
  'per_1' => string '' (length=0)
  'per_2' => string '' (length=0)
  'per_3' => string '' (length=0)
  'per_4' => string '' (length=0)
*/
if (isset($_POST) && !empty($_POST)){
	$validated = true;
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
    if (empty($_POST['facebook']) && empty($_POST['linkedin']) && empty($_POST['instagram']) &&
     empty($_POST['medium']) && empty($_POST['website']) && empty($_POST['google_plus'])) {
		$errs[] = "enter at least one link to one of your social networks";
		$validated = false;
	}

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
