function encriptar(){
    
    var mensaje = document.getElementById('mensaje').value;
    var nuevoTexto = '';  
    var exp = /[0-9A-Zá-úÁ-Ú?!))$&.'!"@&%<>!#$%&/()=]/g; 

    if(mensaje === "" || mensaje.length === 0 ){
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: "El mensaje se encuentra vacío..."
          });
    }else{
        if(exp.test(mensaje)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El mensaje contiene mayúsculas, acentos o caracteres especiales"
              });
        }else{
            for (var i=0; i < mensaje.length; i++)
            {
                if(mensaje[i] == 'a'){
                    nuevoTexto += 'ai'
                }
                else if(mensaje[i] == 'e'){ 
                    nuevoTexto += 'enter'
                }
                else if(mensaje[i] == 'i'){
                    nuevoTexto += 'imes'
                }
                else if(mensaje[i] == 'o'){
                    nuevoTexto += 'ober'
                }
                else if(mensaje[i] == 'u'){
                    nuevoTexto += 'ufat'
                }
                else{
                    nuevoTexto += mensaje[i];
                }
            } 
            document.getElementById('resultado').value = nuevoTexto;
            habilitar();
        }
    } 
}


function desencriptar(mensaje){

    var mensaje = document.getElementById('mensaje').value;
    var exp = /[0-9A-Zá-úÁ-Ú?!))$&.'!"@&%<>!#$%&/()=]/g; 

    if(mensaje === "" || mensaje.length === 0 ){
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: "El mensaje se encuentra vacío..."
          });
    } else{
        if(exp.test(mensaje)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El mensaje contiene mayúsculas, acentos o caracteres especiales"
              });
        }else{
            if(mensaje.includes('ai')){
                mensaje = mensaje.replace(/ai/g,'a'); 
             }
             if(mensaje.includes('enter')){
                mensaje = mensaje.replace(/enter/g,'e'); 
             }
             if(mensaje.includes('imes')){
                mensaje = mensaje.replace(/imes/g,'i'); 
             }
             if(mensaje.includes('ober')){
                mensaje = mensaje.replace(/ober/g,'o'); 
             }
             if(mensaje.includes('ufat')){
                mensaje = mensaje.replace(/ufat/g,'u'); 
             }
    
            document.getElementById('resultado').value = mensaje;
        }
        habilitar();
    }
}

function copiarTexto() {

    // Obtener el texto del textarea
    var texto = document.getElementById('resultado').value;
    
    // Crear un elemento de texto temporal
    var elementoTemporal = document.createElement('textarea');
    elementoTemporal.value = texto;
    document.body.appendChild(elementoTemporal);
    
    // Seleccionar y copiar el texto del elemento temporal
    elementoTemporal.select();
    document.execCommand('copy');
    
    // Eliminar el elemento temporal
    document.body.removeChild(elementoTemporal);
    
    document.getElementById('mensaje').value = '';
    document.getElementById('resultado').value = '';

    // Mostrar un mensaje de éxito
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Copiado con éxito...",
        showConfirmButton: false,
        timer: 1500
    });
    
    deshabilitar();
}

function habilitar() {
    var elemento = document.getElementById('cif');
    var elemento2 = document.getElementById('textImg');

    var res = window.getComputedStyle(elemento2).display;

    if( res === 'block'){
        elemento.style.display = 'block';
        elemento2.style.display = 'none';
    }
}

function deshabilitar() {
    var elemento = document.getElementById('cif');
    var elemento2 = document.getElementById('textImg');

    var res = window.getComputedStyle(elemento2).display;

        elemento.style.display = 'none';
        elemento2.style.display = 'block';
}