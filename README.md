
# 💻 [Nombre de tu Aplicación] - Frontend Angular

Este es el repositorio del cliente (Frontend) de la aplicación de gestión de inventario, desarrollada con **Angular ^19.2.7** y **Tailwind CSS/DaisyUI**.

---

## 🎯 Propósito del Proyecto (Prueba Técnica)

Este proyecto fue desarrollado como parte de una **prueba técnica** y tiene como objetivo demostrar el manejo completo de datos (`CRUD`) en el lado del cliente (Angular) consumiendo una API externa (backend de Spring Boot/Java).

### Características Implementadas:

| Funcionalidad | Descripción |
| :--- | :--- |
| **Mostrar Todos los Productos** | Muestra un listado paginado de todos los productos disponibles. |
| **Mostrar Producto por ID** | Permite ver los detalles individuales de cualquier producto. |
| **Crear Producto** | Abre un modal para registrar nuevos productos en el sistema. |
| **Actualizar Producto** | Permite modificar los datos principales (nombre, precio, descripción) de un producto existente. |
| **Actualizar Inventario** | Habilidad para modificar el stock de un producto específico. |
| **Eliminar Producto** | Funcionalidad para retirar un producto del sistema. |

---

## 🚀 Puesta en Marcha

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local.

### 1. Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

* **Node.js** (v18.x o superior)
* **npm** (incluido con Node.js)
* **Angular CLI** (opcional, pero recomendado)

> ⚠️ **Backend Requerido:** Esta aplicación requiere que el **servicio de backend** de Spring Boot/Java esté corriendo en `http://localhost:8080/api/v1` para poder cargar y manipular los datos mas infomracion **https://github.com/Afelipemelo/backend-prueba**.

### 2. Instalación de Dependencias

Clona este repositorio y navega al directorio del proyecto. Luego, instala las dependencias de Node:

```bash
# 1. Clona el repositorio
git clone [https://github.com/Afelipemelo/prueba-frontend.git]

# 2. Instala todas las dependencias de Node
npm install
# 2. Iniciar el proyecto 
npm start
