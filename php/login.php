<?php
include "conn.php";
if(isset($_POST['user']) && isset($_POST['pass'])){
    $user= $_POST['user'];
    $pass = $_POST['pass'];
    $result = $conn->query("select * from registry where username='$user' and password='$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}