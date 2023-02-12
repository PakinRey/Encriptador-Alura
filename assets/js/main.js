var clipboard = new ClipboardJS(".copiar");
const textArea = document.querySelector(".texto-inicio");
const mensaje = document.querySelector(".mensaje");
const copia = document.querySelector(".copiar");

copia.style.visibility = "hidden";

function validarTexto() {
  let textoEscrito = textArea.value;
  let validador = textoEscrito.match(/^[a-z\s]*$/i);

  if (!validador) {
    alert("Solo se permiten letras y espacios");
    textArea.value = "";
    return true;
  }
}

function btnEncriptar() {
  if (!validarTexto()) {
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    mensaje.style.backgroundImage = "none";
    textArea.value = "";
    copia.style.visibility = "visible";
  }
}

function encriptar(stringEncriptada) {
  let matrizCodigo = [    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  stringEncriptada = stringEncriptada.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (stringEncriptada.includes(matrizCodigo[i][0])) {
      stringEncriptada = stringEncriptada.replace(
        new RegExp(matrizCodigo[i][0], "g"),
        matrizCodigo[i][1]
      );
    }
  }
  return stringEncriptada;
}

function btnDesencriptar() {
  const textoEncriptado = desencriptar(textArea.value);
  mensaje.value = textoEncriptado;
  textArea.value = "";
}

function desencriptar(stringDesencriptada) {
  let matrizCodigo = [    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  stringDesencriptada = stringDesencriptada.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (stringDesencriptada.includes(matrizCodigo[i][1])) {
      stringDesencriptada = stringDesencriptada.replace(
        new RegExp(matrizCodigo[i][1], "g"),
        matrizCodigo[i][0]
      );
    }
  }
  return stringDesencriptada;
}

function copiar() {
  mensaje.select();
  navigator.clipboard.writeText(mensaje.value);
  mensaje.value = "";
  alert("Texto copiado");
}

clipboard.on("success", function(e) {
  mensaje.value = "";
  alert("Texto copiado");
});

clipboard.on("error", function(e) {
  alert("No se pudo copiar el texto. Por favor, copie manualmente.");
});



