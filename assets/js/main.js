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

function renderSecurityTestResults(results) {
  const output = document.getElementById("resultado-pruebas-seguridad");
  if (!output) {
    console.warn("No se encontró #resultado-pruebas-seguridad para renderizar pruebas.");
    return;
  }

  output.innerHTML = "";

  results.forEach((result) => {
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.textContent = `${result.passed ? "✅" : "❌"} ${result.title}: ${result.detail}`;
    output.appendChild(item);
  });
}

function runSecurityEducationalTests() {
  // Demuestra conceptos base: determinismo con mismo salt, variación con salt distinto y compare true/false.
  if (typeof eduBcrypt === "undefined") {
    renderSecurityTestResults([
      {
        title: "Librería educativa no cargada",
        detail: "No se encontró eduBcrypt.js en la página.",
        passed: false,
      },
    ]);
    return;
  }

  const sameSalt = eduBcrypt.generateSalt(10);
  const hashA = eduBcrypt.hash("hola-seguridad", sameSalt);
  const hashB = eduBcrypt.hash("hola-seguridad", sameSalt);

  const hashWithSalt1 = eduBcrypt.hash("hola-seguridad", 10);
  const hashWithSalt2 = eduBcrypt.hash("hola-seguridad", 10);

  const results = [
    {
      title: "Mismo texto + mismo salt",
      detail: "El hash se mantiene igual (comportamiento determinista).",
      passed: hashA === hashB,
    },
    {
      title: "Mismo texto + salts distintos",
      detail: "El hash cambia cuando el salt cambia.",
      passed: hashWithSalt1 !== hashWithSalt2,
    },
    {
      title: "Validación de contraseña correcta",
      detail: "compare devuelve true cuando el texto coincide.",
      passed: eduBcrypt.compare("hola-seguridad", hashA),
    },
    {
      title: "Validación de contraseña incorrecta",
      detail: "compare devuelve false cuando el texto no coincide.",
      passed: !eduBcrypt.compare("texto-incorrecto", hashA),
    },
  ];

  renderSecurityTestResults(results);
}

const runSecurityButton = document.getElementById("ejecutar-pruebas-seguridad");
if (runSecurityButton) {
  runSecurityButton.addEventListener("click", runSecurityEducationalTests);
}
