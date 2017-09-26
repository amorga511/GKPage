<?php
//Insert PreMatrícula

	$postdata = file_get_contents("php://input");
	$vPost = json_decode($postdata);
	
	$op = $vPost->opcion;
	
	switch($op)
	{
		case 1: 
			inserta_prematricula($vPost->idkid, $vPost->name1, $vPost->name2, $vPost->lname1, $vPost->lname2,
			 		$vPost->fnac, $vPost->sexo, $vPost->grado, $vPost->idcontact, $vPost->relacioncontact,
					$vPost->name1contact, $vPost->lnamecontact, $vPost->tel, $vPost->email, $vPost->dir,
					$vPost->fech_ingreso);
		break;
		case 2:
			reporte_premas();
		break;
	}
	
function inserta_prematricula($vIdkid, $vFnamekid, $vSnamekid, $vFlnamekid, $vSlnamekid,$vFechnac, $vSexo, $vGradoPrema
							,$vIdcontacto, $vRelacion_contact,$vFnamecontacto, $vFlnamecontacto, $vTelefonocontacto, 
							$vEmailcontacto, $vDirecion, $vFechingreso){
	
	include 'dblink.php';
	
	$sql1 = 'CALL sp_inserta_prematricula(';
	$sql1 .= '\'' . $vIdkid . '\',';
	$sql1 .= '\'' . $vFnamekid . '\',';
	$sql1 .= '\'' . $vSnamekid . '\',';
	$sql1 .= '\'' . $vFlnamekid . '\',';
	$sql1 .= '\'' . $vSlnamekid . '\',';
	$sql1 .= '\'' . $vFechnac . '\',';
	$sql1 .=  $vSexo . ',';	
	$sql1 .=  $vGradoPrema . ',';
	$sql1 .= '\'' . $vIdcontacto . '\',';
	$sql1 .= $vRelacion_contact . ',';
	$sql1 .= '\'' . $vFnamecontacto . '\',';
	$sql1 .= '\'' . $vFlnamecontacto . '\',';
	$sql1 .= '\'' . $vTelefonocontacto . '\',';
	$sql1 .= '\'' . $vEmailcontacto . '\',';
	$sql1 .= '\'' . $vDirecion . '\',';
	$sql1 .= '\'' . $vFechingreso . '\'';
	$sql1 .= ');';
	
	if ($con->query($sql1))
	{
		echo json_encode(array("id"=>0, "msj"=>"Success"));
	}else{
		echo json_encode(array("id"=>1, "msj"=>$con->error));
	}
	
}

function reporte_premas(){
	include 'dblink.php';
	$vSql = "SELECT name1, lname1, fech_nac, namecontact, telefono_contac, direccion_contac, fecha_ingreso FROM prematriculas order by fecha_ingreso desc;";
	$arrfin = array();
	if($res =$con->query($vSql)){
		while($rows = $res->fetch_array()){
			$temp = array("name"=>$rows[0], 
							"lname"=>$rows[1],
							"fnac"=>$rows[2],
							"contact"=>$rows[3],
							"tel"=>$rows[4],
							"dir"=>$rows[5],
							"fingre"=>$rows[6]);
			array_push($arrfin, $temp);
		}
		echo json_encode($arrfin);
	}
	
}

?>