var appmain = angular.module('appmain', []);

appmain.controller('appcontrol1', function($scope, $http){
	$scope.flag_buscarPda = false;
	$scope.flag_nuevaPda = true;
	$scope.vDH = "0";
	$scope.cuentas = []; //{"cod":"0","cta":"-","debe":0, "haber":0}];
	$scope.listCtas = [{"cod":"3101", "name":"Capital Social"},{"cod":"310101", "name":"Aport. AMG"}]
	//alert('Work');
	d = new Date();
	
	$("#txt_fechPDA").datepicker(
	{
		dateFormat: "yy-mm-dd",
		changeYear : true,
		changeMonth: true,
		yearRange: "2010:" + d.getFullYear()
	});
	
	$("#txt_Fini").datepicker(
	{
		dateFormat: "yy-mm-dd",
		changeYear : true,
		changeMonth: true,
		yearRange: "2010:" + d.getFullYear()
	});
	$("#txt_Ffin").datepicker(
	{
		dateFormat: "yy-mm-dd",
		changeYear : true,
		changeMonth: true,
		yearRange: "2010:" + d.getFullYear()
	});
	
	$scope.f_addCta = function(){
		addCuenta();
	}
	
	$scope.f_remove = function(vcod){
		//alert(vcod.target.id);
		$scope.cuentas = removeItem($scope.cuentas, vcod.target.id);
	}
	
	$scope.f_submenu_diarios = function(vflag){

		switch(parseInt(vflag))
		{
			case 1:
				$scope.flag_nuevaPda = true;
				$scope.flag_buscarPda = false;
			break;
			case 2:
				$scope.flag_nuevaPda = false;
				$scope.flag_buscarPda = true;
			break;
			default:
				$scope.flag_nuevaPda = true;
				$scope.flag_buscarPda = false;
			break;
		}
	}
	
	function addCuenta(){
		if(parseFloat($scope.vMonto) > 0){
			switch(parseInt($scope.vDH))
			{
				case 0:
					$scope.cuentas.push({"cod":$scope.vCta, "cta":$scope.vNameCtaT, "debe":$scope.vMonto, "haber":0});
				break;
				case 1:
					$scope.cuentas.push({"cod":$scope.vCta, "cta":$scope.vNameCtaT, "debe":0, "haber":$scope.vMonto});
				break;
			}
			cleanCtas();		
		}else{
			
		}
	}
	
	function removeItem(vArray, idItem){
		var temp_arr = [];
		
		for(var i=0; i< vArray.length; i++){
			if(vArray[i].cod != idItem){
				temp_arr.push(vArray[i]);
			}
		}
		return temp_arr;
	}
	
	function cleanCtas(){
		$scope.vDH = "0";
		$scope.cta = "0";
		$scope.vMonto = 0;
	}
	
	$scope.validaKey = function(e){
		if(parseInt(e.keyCode) == 13){
			//alert(e.keyCode);			
			vResp = buscaCuentas($scope.vCta);
			if(vResp != "NA"){
				$scope.vNameCtaT = vResp;
				$("#txt_monto").focus();
			}else{
				$scope.vNameCtaT = '';
				alert('Cuenta no Encontrada');
			}
		}else if((parseInt(e.keyCode) >= 48 && parseInt(e.keyCode) <= 57) || parseInt(e.keyCode)==8 || parseInt(e.keyCode)==46 || parseInt(e.keyCode)==190 || parseInt(e.keyCode)==110 || (parseInt(e.keyCode) >= 96 && parseInt(e.keyCode) <= 105))
		{	
			return true;
		}
		else{
			e.preventDefault();
			return false;
		}
	}
	
	$scope.validaDigitos = function(e){
		
		if((parseInt(e.keyCode) >= 48 && parseInt(e.keyCode) <= 57) || parseInt(e.keyCode)==8 || parseInt(e.keyCode)==46 || parseInt(e.keyCode)==190 || parseInt(e.keyCode)==110 || (parseInt(e.keyCode) >= 96 && parseInt(e.keyCode) <= 105))
		{	
			return true;
		}
		else{
			e.preventDefault();
			return false;
		}
	}
	
	$scope.openCatCtas = function(){
		window.open("cat_ctas.html", "_Blank", "width=400; height=600");
		return false;
	}
	
	function buscaCuentas(vCodCta){
		for(i=0; i < $scope.listCtas.length; i++){
			if(vCodCta == $scope.listCtas[i].cod){
				return $scope.listCtas[i].name;
			}
		}
		return 'NA';
	}
});




	


	

