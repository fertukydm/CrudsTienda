# 🎵 OK RECORDS

> Tienda en línea para comprar CD's, vinilos y álbumes por género y artista

---

## 👩‍💻 Integrantes

- **Ktheirne Sofía Cerón Gullen** – 20220026  
- **Olga Fernanda Méndez Flores** – 20220525

---

## 🧾 Descripción

**OK RECORDS** es una tienda en línea donde los clientes pueden adquirir productos musicales como CD's, vinilos y álbumes.  
Se ofrecen más de **15 géneros musicales**, con atención personalizada y entregas a domicilio.

---

## 🧰 Tecnologías y Librerías Utilizadas

| Herramienta         | Uso                                      |
|---------------------|------------------------------------------|
| React               | Construcción de interfaces               |
| Vite                | Empaquetador para desarrollo rápido      |
| React Router DOM    | Navegación entre vistas                  |
| React Hook Form     | Manejo de formularios                    |
| React Hot Toast     | Notificaciones en tiempo real            |
| ESLint              | Control de calidad del código            |

---

## 📁 Estructura del Proyecto

ok-records/
├── frontend-private/         # Panel de administración
│   ├── src/                  # Código fuente del admin (componentes, vistas, etc.)
│   ├── public/               # Archivos públicos (imágenes, favicon, etc.)
│   └── package.json          # Configuración y dependencias del admin
│
├── frontend-public/          # Sitio público para clientes
│   ├── src/                  # Código fuente del cliente
│   ├── public/               # Archivos públicos del cliente
│   └── package.json          # Configuración y dependencias del cliente
│
└── README.md                 # Documentación del proyecto


##  ¿Cómo ejecutar la aplicación?

### 🔐 Panel administrador (privado)
cd frontend-private
npm install
npm run dev

### 🔐 Panel cliente (publico)
cd frontend-public
npm install
npm run dev

##🖼️ Capturas de pantalla
Vista pública
![image](https://github.com/user-attachments/assets/84639cd5-aac5-493e-9729-7cd48071dbf1)

Panel administrador
![image](https://github.com/user-attachments/assets/6093f061-4675-4e06-8c9a-e42847a555bb)

## Dependencias (package.json)
| Dependencia          | `frontend` (Admin) | `frontend-public` (Cliente) |
| -------------------- | ------------------ | --------------------------- |
| **React**            | `^19.0.0`          | `^19.1.0`                   |
| **React DOM**        | `^19.0.0`          | `^19.1.0`                   |
| **React Router DOM** | `^7.5.0`           | `^7.6.0`                    |
| **React Hook Form**  | `^7.56.4`          | `^7.56.4`                   |
| **React Hot Toast**  | `^2.5.2`           | `^2.5.2` *(opcional)*       |
| **Vite**             | `^6.2.0`           | `^6.3.5`                    |
| **ESLint / Plugins** | Incluidos          | Incluidos                   |
