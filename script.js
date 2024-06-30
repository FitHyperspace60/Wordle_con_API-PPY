const botonRefrescar = document.getElementById('reiniciar');
const url = 'https://random-word-api.herokuapp.com/word?lang=es&length=5';
let respuesta = null;
let respuestaImprimir = null;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    return response.json();
    })

    .then(data => {
        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
    respuesta = data[0];
    respuesta = respuesta.toUpperCase();
    respuesta = removeAccents(respuesta);
    respuestaImprimir = respuesta;
    respuesta =  respuesta.split('');
    console.log(respuestaImprimir); 
    })

    .catch(err => {
    console.error("Hubo un problema con la solicitud:", err);
    });

var palabraIngresada = [];
var resultado = document.getElementById('resultado');
var letra_completada=[];

const palabras = document.querySelectorAll(' .palabra');
var intentos = 0;
palabras[0].focus();

palabras.forEach((palabra) => {
    const letras = palabra.querySelectorAll('.letra');
    let indice = 0;
    
    palabra.addEventListener('keydown', function(event) { 
        
        event.preventDefault();
        if ((/^[a-zA-Z]$/).test(event.key)) {
            if (indice < letras.length) {
                
                letras[indice].innerText = event.key.toUpperCase();
                letras[indice].classList.add('seleccionada'); 
                palabraIngresada.push(event.key.toUpperCase());
                indice++;
            }

        }else if(event.key == 'Backspace') {
            if (indice > 0) {
                indice--;
                letras[indice].innerText = '' ;
                letras[indice].classList.remove('seleccionada');
                palabraIngresada.pop(); 
            }

        }else  if(event.key == 'Enter') {
            if(indice == 5){
                    intentos++;
                    let correctos =0;
                    for (let i = 0; i < letras.length; i++) {
                        if(letras[i].innerText == respuesta[i] ){
                            letras[i].classList.remove('seleccionada');
                            letras[i].classList.add('correcto');
                            correctos++;
                            if(correctos == 5){
                                resultado.classList.add('ganar');
                                resultado.innerHTML = "¡GANASTE!😀";
                                botonRefrescar.classList.add('activo');
                                botonRefrescar.focus();
                                return;
                            }
                        
                        }else if (respuesta.includes(letras[i].innerText)){
                            letras[i].classList.remove('seleccionada');
                            letras[i].classList.remove('ninguno');
                            letras[i].classList.add('parecido');

                        }else{ 
                            letras[i].classList.remove('seleccionada');
                            letras[i].classList.add('ninguno');
                        }
                        
                    }
                    if(intentos>5){
                        resultado.classList.add('perder');
                        resultado.innerHTML = `¡PERDISTE!😖. RESPUESTA: ${respuestaImprimir}`;
                        botonRefrescar.classList.add('activo');
                        botonRefrescar.focus();
                        return;
                    }
                    palabras[intentos-1].setAttribute('contenteditable','false');
                    palabras[intentos].setAttribute('contenteditable','true');
                    palabras[intentos].focus();
            }
        }
    });
});

botonRefrescar.addEventListener('click', () => {
    location.reload();
});

function elementosComunes(array1, array2) {
    var elementosComunesArray = [];

    for (var i = 0; i < array1.length; i++) {
        if (array2.includes(array1[i]) && !elementosComunesArray.includes(array1[i])) {
            elementosComunesArray.push(array1[i]);
        }
    }

    return elementosComunesArray;
}