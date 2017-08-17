/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function startaLeitura(){
    alert("vou ler...");
     window.requestFileSystem(LocalFileSystem.PERSISTENT,0,  onFileSystemSuccess, onErrorRead);
}

function onFileSystemSuccess(fs) {
    alert("Sucesso");
    var pathInicial=fs.root.fullPath;
    alert("Entrando com "+pathInicial+"...");
    fs.root.fullPath = '/mnt/sdcard';
    alert("mudou o path...");
    var dirReader = fs.root.createReader();
    alert("reader criado para ler de "+fs.root.fullPath+"...");
    dirReader.readEntries(successRead,onErrorRead);
}

function successRead(entries){
    alert("sucesso lendo");
     var i;
     var objectType;
     var n=entries.length;
     alert("varrendo "+n+"...");
     for (i=0; i < entries.length; i++) {
        if(entries[i].isDirectory == true) {
            objectType = 'Directory';
        } else {
            objectType = 'File';
            alert("arquivo");
            alert(entries[i].name);
        }
        $('#dirList').append('<li><h3>' + entries[i].name + '</h3><p>' + entries[i].toURI() + '</p><p class="ui-li-aside">Type:<strong>' + objectType + '</strong></p></li>');
    }
    $('#dirList').listview("refresh");
}

function onErrorRead(error) {
    alert("Failed to list directory contents: " + error.code+","+error.message);
}

function testaLeitura(){

    new ExternalStorageSdcardAccess( fileHandler ).scanPath( "file:///storage/sdcard1/music" );
    function fileHandler( fileEntry ) {
        //alert( fileEntry.name + " | " + fileEntry.toURL() );
        $('#dirList').append(fileEntry.name+'<br>');
    }
}

function mostraLeitura(){
    $('#dirList').append(saida);
}


function chamaComParms(){
    var nome=document.getElementById('tNome').value;
    if (nome == ''){
        alert("Informe o nome");
        document.getElementById('tNome').focus();
    } else {
        window.localStorage.setItem('nome', nome);
        window.open("tela2.html");
    }
}
function gravaTexto(){
    var nome=document.getElementById('tNome').value;
    if (nome == ''){
        alert("Informe o nome");
        document.getElementById('tNome').focus();
    } else {
        db.transaction(populateDB, errorCB, successCB);
    }
}

function populateDB(tx){
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "'+nome+'")');
}


function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!");
}

var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);


function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    console.log("Returned rows = " + results.rows.length);
    alert("Returned rows = " + results.rows.length);
    // this will be true since it was a select statement and so rowsAffected was 0
    if (!results.rowsAffected) {
        console.log('No rows affected!');
        alert('No rows affected!');
        return false;
    } else {
        var n=results.rows.length;
        for (var i=0; i< n; i++){
            var resultado=results.rows.item(i);
            var id=resultado.id;
            var nome=resultado.data;
            alert(""+id+") "+nome);
        }
    }
    // for an insert statement, this property will return the ID of the last inserted row
    console.log("Last inserted row ID = " + results.insertId);
}

function leTexto(){
    db.transaction(queryDB, errorCB);
}
