<?php

$server = "mysql.hostinger.mx";
$db = "u620003613_dbgk";
$user = "u620003613_amg";
$pwd = "misael.19";

/*
$server ="localhost";
$db	= "dbprematriculas";
$user = "root";
$pwd = "morga2";
*/

$con = new mysqli($server, $user, $pwd, $db);
if($con->connect_error)
{
	echo $con->connect_error();
}

?>