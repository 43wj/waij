<?php
include "conn.php";
if(isset($_POST['name']) || isset($_POST['submit'])){
    $user = $_POST['name'];
    $result=$conn->query("select * from registry where username='$user'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}else{
    exit('非法操作');
}
if(isset($_POST['submit'])){
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    $email = $_POST['email'];
    $conn->query("insert registry values(default,'$user','$pass','$email',NOW())");
    header('location:http://localhost/p/xiangmu/src/login.html');
}