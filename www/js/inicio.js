function getStatusDeAtendimento(){
	var negocio='http://printsource.jelasticlw.com.br/gestor/ajax/getListaTabela';
	var funcao='';
	var parms='&nomeTabela=GtStatusAtendimento&campoSort=nome';
	putMemo('retornoAx','retornoStatusAtendimento');
	putMemo('encoda', 'S');
	chamaJSon(negocio,funcao,parms);
}
function retornoStatusAtendimento(dados){
	var lista=dados.registros;
	var saida="";
	for (var i = 0; i < lista.length; i++) {
		var estado=lista[i];
		if (saida != ''){
			saida+='<br>';
			saida+='['+saida.id+'-'+saida.nome;
		}
	}
	document.getElementById('spanSaida').innerHTML=saida;
}
function testa(){
	var url = "http://printsource.jelasticlw.com.br/gestor/ajax/getListaTabela.html?Funcao=&nomeTabela=GtStatusAtendimento&campoSort=nome";

}
function callWebService(){

  // We don't want API call to be made and data refreshed
  if ($('#spanSaida').is(':empty')){

    // Adding spinner image until we will get response
    $("#spanSaida").append("<img class='spinner' src='img/loadinfo.net.gif' />");

   	//var question = $("#question").val();

    // Log
    //console.log("Questions value: " + question);

    //create request url
    //var url = "http://your.test.server.url/?q=" + question + "&requirePictures=true";

    var url = "http://printsource.jelasticlw.com.br/gestor/ajax/getListaTabela.html?Funcao=&nomeTabela=GtStatusAtendimento&campoSort=nome";

    // Log
    console.log("Request string: " + url);

    // Call to web server
    $.get(url, function(data) {

    // Clear spinner
    $("#spanSaida").empty();

    // Add results to HTML
    $("#spanSaida").html(data);

    // Log received content
    console.log("Received string: " + data);

  }
 );

	}
}

function ws(){

    var url = "http://printsource.jelasticlw.com.br/gestor/ajax/getListaTabela.html?Funcao=&nomeTabela=GtStatusAtendimento&campoSort=nome";
    $.get(url, function(data) {

    // Clear spinner
    $("#spanSaida").empty();

    // Add results to HTML
    $("#spanSaida").html(data);

    // Log received content
    console.log("Received string: " + data);

  }
);

}


function getNome(){
    var nome = window.localStorage.getItem('nome');
    return nome;
}
function processaDadosCliente(dados){
    //var resposta=document.getElementById('hResp').value;
    var empresa=dados;
    document.getElementById('divResultado').style.display='block';
    document.getElementById('tRS').innerHTML=empresa.razaoSocial;
    document.getElementById('tFanta').innerHTML=empresa.fantasia;
    document.getElementById('tEmail').innerHTML=empresa.email;
    document.getElementById('tSite').innerHTML=empresa.website;
    document.getElementById('tContato').innerHTML=empresa.contatoEmpresa;
    document.getElementById('tCargo').innerHTML=empresa.cargoContato;
    document.getElementById('tDepto').innerHTML=empresa.deptoContato;
    document.getElementById('tMC').innerHTML=empresa.emailContato;
    document.getElementById('tPabx').innerHTML=empresa.pabx;
}
function doBusca(){
    var nome=document.getElementById('tNome').value;
    if (nome == ''){
        alert("Informe o nome para pesquisa");
        document.getElementById('tNome').focus();
    } else {
       var url = "http://printsource.jelasticlw.com.br/gestor/ajax/getRegistro.jsonx?Funcao=&nosuf=S&valor="+nome+"&nomeClasse=GtEmpresas&campo=fantasia&tipoCampo=String";
       $.get(url, function(data){
            var dados=getJson(data);
            processaDadosCliente(dados);
       });
       
    }
}