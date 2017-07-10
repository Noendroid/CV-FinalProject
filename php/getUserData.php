<?php
include_once 'db_connector.php';

    $dataB = [
        "basicInfo" => [
            "id" => "",
            "firstName" => "",
            "lastName" => "",
            "phone" => "",
            "email" => "",
            "area" => "",
            "about_me" => "",
            "degree" => ""
        ]
    ];

    //REMEMBER TO CHANGE IT TO TAKE DATA FROM THE ID OF THE USER!!!
    //NOT BY HIS NAME!!
    $sql = "SELECT * FROM users WHERE id = '" . $_GET["user_id"] . "'";
    //echo var_dump($sql);
    $result = $mysqli->query($sql);

    if ($result) {
        // output data of each row
        header('Content-Type: application/json');
        $data = $result->fetch_assoc();
        echo json_encode($data);
    } else{
        echo json_encode($dataB);
    }
?>
