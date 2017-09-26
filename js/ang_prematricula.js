
var appmain = angular.module('appmain', []);

appmain.controller('appcontrol1', function($scope, $http){
	limpiar();
	d = new Date();
	$("#txt_fechnac").datepicker(
	{
		dateFormat: "yy-mm-dd",
		changeYear : true,
		changeMonth: true,
		yearRange: "2010:" + d.getFullYear()
	});
	

	$scope.f_guardar = function(){
		if(validaCampos() == true)
		{
			$http.post("PHP/insert_db.php", {opcion:1, idkid:$scope.idkid, name1:$scope.name1, name2:$scope.name2,
							lname1:$scope.lname1, lname2:$scope.lname2, sexo:$scope.sexo, fnac:$scope.fechNac, 
							grado:$scope.grado, idcontact:$scope.idcontact, relacioncontact:$scope.relacion_contacto,
							name1contact:$scope.namecontact, lnamecontact:$scope.lnamecontact, tel:$scope.telefono,
							email:$scope.email, dir:$scope.dir, fech_ingreso:getFechaHora()}).then(function(resp){
	
				
				if(resp.data.id == 0){
					var divstr = 	"<div><center> ";
            			divstr += 	"<h3>Datos Guardados Exitosamente</h3> ";
					    divstr += 	"<p>Muy pronto nos pondremos en contacto para confirmar su información.";
                		divstr += 	"			<br>Gracias por preferirno. Genius Kids.</p>";
                		divstr += 	"<br> <a href=\"index.html\">Regresar al Inicio</a></center></div>";
						
					$("#dv_prema").html(divstr);
				}else{
					alert(resp.data.msj);
				}
			});
		}else{
			alert('Campos Incompletos');
		}
	}
	
	$scope.f_limpiar = function(){
		limpiar();
	}
	
function limpiar(){
	$scope.idkid = "";
	$scope.fechNac = "";
	$scope.sexo = "1";
	$scope.grado = "1";
	$scope.name1 = "";
	$scope.name2 = "";
	$scope.lname1 = "";
	$scope.lname2 = "";
	$scope.idcontact = "";
	$scope.namecontact = "";
	$scope.lnamecontact = "";
	$scope.telefono ="";
	$scope.email = "";
	$scope.dir = "";
	$scope.relacion_contacto ="2";
	
}

function getFecha(){
	var d = new Date();
	var fech = "";
	fech = d.getFullYear();
	if((d.getMonth()+1)<10){
		fech += "-0" + (d.getMonth() +1);
	}else{
		fech += "-" + (d.getMonth() +1);
	}
	
	if(d.getDate() < 10){
		fech += "-0" + d.getDate();
	}else{
		fech += "-" + d.getDate();
	}
	
	return fech;
}

function getFechaHora(){
	var d = new Date();
	var fech = getFecha();
	fech += " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	return fech;
}

function validaCampos(){
	var bolean = true;
	
	if($scope.idkid.length != 13){
		return false;
	}	
	if($scope.name1.trim().length == 0){
		return false;
	}
	if($scope.lname1.trim().length == 0){
		return false;
	}
	if($scope.fechNac.trim().length == 0){
		return false;
	}
	if($scope.idcontact.trim().length == 0){
		return false;
	}
	if($scope.namecontact.trim().length == 0){
		return false;
	}
	if($scope.telefono.trim().length == 0){
		return false;
	}
	if($scope.dir.trim().length == 0){
		return false;
	}	
	
	return bolean;
}

});

$(document).ready(function(){
});