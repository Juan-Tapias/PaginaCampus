# Campuslands Recruitment Platform

Plataforma interactiva de reclutamiento y exhibición de talento tecnológico para Campuslands. Este proyecto combina una arquitectura moderna de frontend con experiencias inmersivas en tres dimensiones.

## Arquitectura Tecnológica

El ecosistema está construido sobre las siguientes tecnologías principales:

*   **Framework**: Next.js 14 con App Router para una navegación optimizada y SEO.
*   **Renderizado 3D**: Three.js integrado mediante React Three Fiber y Drei para modelos interactivos.
*   **Animaciones**: Framer Motion para transiciones de interfaz y estados visuales fluidos.
*   **Estilos**: Tailwind CSS con un sistema de diseño basado en glassmorphism y estética espacial.
*   **Infraestructura de Activos**: Firebase Storage para la gestión de modelos 3D, videos y activos pesados, reduciendo el peso del repositorio.

## Estructura de Datos

El contenido de la plataforma está centralizado en un sistema de diccionarios JSON ubicado en:
`src/data/es.json`

Este archivo controla:
*   Textos y etiquetas de navegación.
*   Rutas de acceso a modelos 3D en la nube.
*   Configuración del tour virtual y hotspots.
*   Información de aliados estratégicos.

## Configuración y Desarrollo

### Requisitos Previos
*   Node.js (versión 18 o superior)
*   Firebase CLI (para despliegues)

### Instalación de Dependencias
```bash
npm install
```

### Ejecución en Entorno Local
```bash
npm run dev
```

### Proceso de Construcción
```bash
npm run build
```

## Despliegue en Producción

La plataforma está optimizada para ser desplegada en Firebase Hosting.

1. Genere el paquete de producción:
```bash
npm run build
```

2. Ejecute el despliegue:
```bash
firebase deploy
```

## Optimización de Activos

Para mantener un rendimiento óptimo, todos los activos multimedia superiores a 5MB deben ser alojados en Firebase Storage. Las referencias locales en el código deben ser actualizadas en el archivo de datos central para reflejar las URLs públicas del almacenamiento en la nube.

---
Campuslands // Base Location: Orbit Talent Platform
