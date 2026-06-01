# Encriptador Alura

Proyecto inspirado en el challenge de **Alura**, evolucionado hacia un intento de **encriptador más serio** con una idea visual y conceptual parecida a herramientas de cifrado reales.

> Nota: este proyecto **no implementa bcrypt real** ni debe considerarse seguro para proteger contraseñas o información sensible. La idea es usarlo como práctica de lógica, interfaz y transformación de texto.

## Objetivo

Este proyecto comenzó como un challenge de encriptador y ahora busca dar un paso más:

- mejorar la experiencia visual,
- hacer que el flujo se sienta más “profesional”,
- experimentar con una lógica de transformación de texto más elaborada,
- tomar inspiración de herramientas reales como **bcrypt**, pero con fines **educativos**.

## Idea del proyecto

La meta es construir una app web donde el usuario pueda:

- ingresar un texto,
- transformarlo mediante una lógica propia de “encriptación”,
- desencriptarlo si corresponde,
- copiar el resultado fácilmente,
- visualizar una interfaz clara, moderna y simple.

## Importante sobre seguridad

Aunque la inspiración venga de bcrypt, hay que dejar algo claro:

- **bcrypt es un algoritmo de hash**, no un sistema de encriptación reversible,
- este proyecto es una **simulación / práctica frontend**,
- no debe usarse para almacenar contraseñas reales,
- no reemplaza librerías criptográficas ni estándares de seguridad.

Si en el futuro quieres acercarte más a algo real, podrías explorar:

- hashing de contraseñas con `bcrypt`,
- cifrado con `AES`,
- uso de `Web Crypto API`,
- manejo de salts, rounds y buenas prácticas de seguridad.

## Tecnologías

- **HTML**
- **CSS**
- **JavaScript**

## Posibles mejoras

- [ ] Rediseñar la interfaz con estilo más técnico / moderno
- [ ] Agregar niveles de complejidad a la transformación
- [ ] Simular rounds o múltiples pasos de procesamiento
- [ ] Incorporar historial de conversiones
- [ ] Mejorar la validación de texto de entrada
- [ ] Agregar modo oscuro
- [ ] Explicar visualmente por qué bcrypt no es encriptación reversible

## Estructura esperada

Este proyecto está pensado como una base para seguir iterando en:

1. diseño,
2. lógica,
3. usabilidad,
4. presentación del resultado.

## Cómo usar

1. Escribe un texto en el área principal.
2. Ejecuta la transformación.
3. Copia el resultado.
4. Si la lógica lo permite, desencripta el texto nuevamente.

## Roadmap

### Versión actual
- Challenge funcional de encriptador.

### Próxima idea
- Convertirlo en una experiencia visual inspirada en herramientas de seguridad reales.

### Futuro
- Rehacer la lógica para que el proyecto se sienta más robusto y mejor documentado.

## Autor

Hecho por **PakinRey** como parte de su aprendizaje y experimentación con desarrollo web.

---

Si quieres, después de esto también puedo ayudarte a:

- mejorar este README con badges y capturas,
- hacerlo más profesional para tu portafolio,
- o reescribirlo en un estilo más “hacker / pro / cybersecurity”.
