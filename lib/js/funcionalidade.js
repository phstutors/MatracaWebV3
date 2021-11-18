function find()
{
  var urlAl = url
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

  $.ajax({
    type : "GET",
    dataType : "jsonp",
    url : urlAl,
    success: function(data){
      alert(data);
    },
    error: function()
    {
      alert("erro");  
    }
});

$(function () {
    var ex = $('.even');
    $('.novo').click(function () {
        ex.val("");
    });
});

//AREA DE CHECAGEM DE PALAVRAS
$('#some-textarea').wysihtml5({
    "font-styles": false, //Font styling, e.g. h1, h2, etc. Default true
    "emphasis": false, //Italics, bold, etc. Default true
    "lists": false, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
    "html": false, //Button which allows you to edit the generated HTML. Default false
    "link": false, //Button to insert a link. Default true
    "image": false, //Button to insert an image. Default true,
    "color": false //Button to change color of font  
});

var editor = $('.wysihtml5-sandbox').contents().find('body')
editor.on("keypress", function (e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
        var texto = editor[0].innerText
        var splitted = texto.split(" ");
        var last = splitted.splice(splitted.length - 1)[0]
        if (!checkPalavra(last)) {
            mudar()
            e.preventDefault()
        }
    }
});

function checkPalavra(palavra) {
    for (var i in dict) {
        if (dict[i].trim() == palavra) {
            return true;
        }
    }
    return false;
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.overrideMimeType('text/plain; charset=iso-8859-1');
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
                dict = allText.split('\n');
                dict.push("ola")
            }
        }
    }
    rawFile.send(null);
}
function read() {
readTextFile("lib/Brazil.dic")
meSpeak.loadConfig("lib/js/mespeak_config.json");
meSpeak.loadVoice('lib/js/pt-br.json');
function palavraErrada(palavra) {
    palavra = palavra.split("").join(" ");
    
}    
    meSpeak.speakMultipart(
        [
            { text: "palavra incorreta, você digitou:", speed: 130, wordgap: 5 },
            { text: palavra, speed: 90, wordgap: 10 }
        ]
    )
}

function notify() {
    alert( "clicked" );
}

function lerTexto() {
    var handler = function() {}
    var editor = $('.wysihtml5-sandbox').contents().find('body');
    var texto = editor[0].innerText;
    meSpeak.speak(texto, { speed: 110, wordgap: 5 })
}

function falar(texto) {
    var handler = function() {}
    meSpeak.speak(texto, { speed: 110, wordgap: 4 });
}

function salvar() {
    var handler = function() {}
    var input = document.getElementById(".textarea")
    var blob = new Blob([input.value], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "arquivodetexto.txt");

    e.preventDefault()
}

function main() {
    var savefile = document.getElementById("savefile")
    savefile.addEventListener("click", saveFile, false)
}

function novo() {
}

/*
function abrir(){
    type='file';
      var openFile = function(event) {
            var input = event.target;
            var reader = new FileReader();
            reader.onload = function(){
                  var text = reader.result;
                  console.log(reader.result.substring(0, 200));
        }
            reader.readAsText(input.files[0]);
    }
}
*/

//AREA DE ABRIR ARQUIVO
function mudar() {
    var tagcolor = $('.wysihtml5-sandbox').contents().find('#color')
    var tagTexto = $('.wysihtml5-sandbox').contents().find('body')[0]
    if (tagcolor.length > 0) {

        var textoOfTag = tagcolor.text()
        tagcolor.remove()
        tagTexto.innerText = tagTexto.innerText + " " + textoOfTag
    }
    else {
        var texto = tagTexto.innerText
        var splitted = texto.split(" ");
        var last = splitted.splice(splitted.length - 1)
        palavraErrada(last[0])
        last = "<font color= 'red' id='color'>" + last + "</font>"
        var newtext = splitted.join(" ")
        tagTexto.innerHTML = newtext + " " + last
    }
}

window.onload = function (){
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('.textarea');
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            var fileExtension = /text.*/;
            //Get the file object
            var fileTobeRead = fileSelected.files[0];
            //Check of the extension match
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    var fileContents = document.getElementById('.textarea');
                    fileContents.innerText = fileReader.result;
                }
                fileReader.readAsText(fileTobeRead);
            }
            else {
                alert("Por favor selecione arquivo texto");
            }

        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }
}
}