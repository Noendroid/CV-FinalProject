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


    $sql = "SELECT * FROM users WHERE first_name = '" . $_GET["user"] . "'";
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
