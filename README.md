# Fika's Restaurant & Coffee Shop — Sitio Web

Sitio web oficial de **Fika's Restaurant & Coffee Shop**, Volcán, Tierras Altas, Chiriquí, Panamá.

---

## 🗂 Estructura del proyecto

```
fikas/
├── index.html              → Página principal
├── reservaciones.html      → Formulario de reservas
├── admin.html              → Panel de administración
├── netlify.toml            → Configuración Netlify
├── css/
│   ├── style.css           → Estilos principales
│   ├── reservaciones.css   → Estilos del formulario
│   └── admin.css           → Estilos del panel admin
└── js/
    ├── data.js             → ⭐ Datos editables (menú, reseñas, config)
    ├── main.js             → Interactividad del sitio
    ├── reservaciones.js    → Lógica del formulario
    └── admin.js            → Lógica del panel admin
```

---

## ⚙️ Configuración inicial

### 1. Número de WhatsApp (OBLIGATORIO)
En `js/data.js`, cambia el número:
```js
whatsapp: "50700000000",  // ← Tu número real, sin guiones ni espacios
```

### 2. Panel Admin — Contraseña
En `js/admin.js`, línea 4:
```js
const ADMIN_PASSWORD = 'fikas2025';  // ← Cambiar antes de publicar
```

### 3. Google Sheets (opcional)
En `js/reservaciones.js`, línea 4:
```js
const APPS_SCRIPT_URL = 'TU_APPS_SCRIPT_URL_AQUI';
```

---

## 🚀 Deploy en GitHub Pages

1. Sube todos los archivos a tu repositorio en GitHub
2. Ve a **Settings → Pages**
3. Selecciona rama `main`, carpeta `/root`
4. Tu sitio estará en `https://TU_USUARIO.github.io/fikas`

## 🚀 Deploy en Netlify

1. Conecta el repositorio de GitHub en netlify.com
2. Build command: (vacío)
3. Publish directory: `.`
4. Deploy

---

## ✏️ Cómo actualizar el menú

Edita el array `menu` en `js/data.js`. Cada item tiene:
- `id` — número único
- `cat` — categoría: `desayunos`, `platos`, `cafe`, `bebidas`
- `nombre` — nombre del plato
- `descripcion` — descripción breve
- `precio` — precio con formato `"$12.00"`
- `foto` — URL de la imagen
- `badge` — etiqueta opcional: `"Favorito"`, `"Nuevo"`, `null`

---

## 🔑 Panel de Administración

URL: `tu-sitio.com/admin.html`
Contraseña por defecto: `fikas2025`

Funciones:
- Ver, confirmar, cancelar y completar reservas
- Vista de reservas del día
- Estadísticas generales
- Exportar a CSV
- Contactar clientes por WhatsApp

---

## 📱 Tecnología

- HTML + CSS + JavaScript puro (sin frameworks)
- Hosting: GitHub Pages / Netlify (gratis)
- Sin costos de servidor ni mensualidades
- Fotos: Imágenes reales de clientes via Degusta Panamá
