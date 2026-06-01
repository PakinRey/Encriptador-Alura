# Encriptador Alura - Librería educativa tipo bcrypt

Este repositorio empezó como un challenge de encriptador web y lo fui evolucionando a una librería JavaScript educativa inspirada en la experiencia de uso de bcrypt, para practicar **salt**, **rounds** y **comparación de hash**.

> ⚠️ **Advertencia importante**
> - Esto **NO es bcrypt real**.
> - Esto **NO es criptografía moderna segura**.
> - Esto **NO debe usarse en producción para contraseñas reales**.

## ¿Qué incluye?

API estilo bcrypt (educativa):

- `generateSalt(rounds?)`
- `hash(text, saltOrRounds?)`
- `compare(text, hashedValue)`

Implementación en: `/lib/educational-bcrypt.js`
Export principal en: `/index.js`

## Instalación / uso en este repositorio

### 1) Clonar e instalar

```bash
git clone https://github.com/PakinRey/Encriptador-Alura.git
cd Encriptador-Alura
npm install
```

### 2) Usar en Node.js (CommonJS)

```js
const eduBcrypt = require('./index');

const salt = eduBcrypt.generateSalt(12);
const hashed = eduBcrypt.hash('mi-texto', salt);
const ok = eduBcrypt.compare('mi-texto', hashed);

console.log({ salt, hashed, ok });
```

### 3) Usar en navegador

```html
<script src="./lib/educational-bcrypt.js"></script>
<script>
  const salt = eduBcrypt.generateSalt(10);
  const hashed = eduBcrypt.hash('hola', salt);
  console.log(eduBcrypt.compare('hola', hashed));
</script>
```

## Ejemplos rápidos de API

### `generateSalt(rounds?)`

```js
const saltA = eduBcrypt.generateSalt();
const saltB = eduBcrypt.generateSalt(14);
```

### `hash(text, saltOrRounds?)`

```js
const hashA = eduBcrypt.hash('password-demo', 10);

const salt = eduBcrypt.generateSalt(10);
const hashB = eduBcrypt.hash('password-demo', salt);
```

### `compare(text, hashedValue)`

```js
const hashed = eduBcrypt.hash('clave-ejemplo', 10);

eduBcrypt.compare('clave-ejemplo', hashed);
eduBcrypt.compare('clave-incorrecta', hashed);
```

## Diseño educativo

Esta librería está hecha para aprender y experimentar con una API familiar, no para seguridad real.

- Usa una transformación determinista de texto.
- Simula rounds y salt en formato tipo bcrypt.
- Mantiene código simple y legible para estudiantes.

## Enfoque open source y ciberseguridad

Este proyecto es de **código abierto** para que más estudiantes puedan:

- leer cómo está implementada la API paso a paso,
- probar ejemplos de seguridad de forma práctica,
- entender por qué la ciberseguridad requiere herramientas correctas y buenas prácticas.

En `index.html` se incluyen pruebas educativas interactivas para demostrar conceptos como:

- mismo texto + mismo salt → mismo hash,
- mismo texto + salt diferente → hash diferente,
- verificación correcta/incorrecta con `compare`.

## Pruebas

```bash
npm test
```

## Resumen de seguridad

Si necesitas seguridad de contraseñas real en producción, utiliza librerías y algoritmos modernos diseñados para ello (por ejemplo bcrypt/argon2/scrypt en implementaciones mantenidas), junto con buenas prácticas de backend.
