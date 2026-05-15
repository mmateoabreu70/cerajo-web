# Plan De Mejora Del Catálogo CERAJO Sin Carrito

## Resumen
Mejorar el proyecto como catálogo consultivo de productos por departamento, sin carrito, checkout ni flujo de compra. El objetivo es que el usuario pueda descubrir productos, filtrar por departamento/marca/oferta, ver detalle completo y contactar a la tienda para consultar disponibilidad o precio final.

## Cambios Clave

- Corregir navegación principal:
  - Implementar una página real para `/productos/:id`.
  - Corregir `/ofertas` para mostrar solo productos con descuento.
  - Crear o remover `/contacto`; recomendado: crear página simple de contacto.
  - Agregar ruta comodín `*` para pantalla 404.

- Mejorar catálogo:
  - En `ProductsPage`, leer y aplicar `q`, `featured`, `discount`, `category`, `brand`, `page` y `limit` desde la URL.
  - Agregar filtros visibles por departamento, marca y oferta.
  - Mantener búsqueda por URL para compartir enlaces filtrados.
  - Mostrar estados de carga, error y vacío sin depender solo de consola.

- Crear detalle de producto:
  - Mostrar imagen principal, imagen preview, nombre, categoría, marca, descripción, precio, precio anterior, porcentaje de descuento y etiqueta “Nuevo”.
  - Reemplazar el botón “Agregar” por “Ver detalle” en tarjetas.
  - En detalle usar CTA “Consultar producto” que abra WhatsApp o contacto con mensaje prellenado.
  - No guardar productos seleccionados ni crear carrito.

- Mejorar backend:
  - Agregar `GET /api/productos/:id`.
  - Validar `page` y `limit` con valores seguros.
  - Soportar filtros existentes de forma consistente: `featured`, `discount`, `category`, `brand`, `q`.
  - Eliminar logs de depuración y manejar errores con respuestas JSON.
  - Dejar `POST /api/productos` fuera del flujo público; si se conserva, marcarlo como futuro/admin.

- Limpieza visual y técnica:
  - Corregir `class` por `className`.
  - Arreglar textos con acentos dañados en componentes.
  - Corregir selector CSS `.p-inputtext`.
  - Mejorar responsive del hero, banner de departamentos, grid de productos y header móvil.
  - Quitar imports no usados y dependencias no usadas como `mongoose` si no habrá base de datos todavía.

## APIs / Interfaces
- `GET /api/productos`
  - Query params soportados: `q`, `page`, `limit`, `featured`, `discount`, `category`, `brand`.
  - Respuesta: `{ items, total, page, limit, totalPages }`.

- `GET /api/productos/:id`
  - Respuesta exitosa: producto completo.
  - Respuesta no encontrada: `404` con `{ message: "Producto no encontrado" }`.

- Rutas frontend:
  - `/`
  - `/productos`
  - `/productos/:id`
  - `/ofertas`
  - `/buscar?q=...`
  - `/contacto`
  - `*`

## Test Plan
- Verificar que `npm run build` compile sin warnings.
- Probar navegación desde home a catálogo, ofertas, búsqueda, detalle y contacto.
- Probar filtros combinados: departamento + marca + oferta + búsqueda.
- Probar producto inexistente en `/productos/:id`.
- Probar estado vacío con una búsqueda sin resultados.
- Probar responsive en móvil, tablet y desktop.
- Reemplazar el test de plantilla por pruebas básicas de render del catálogo, búsqueda y detalle.

## Supuestos
- No se implementará carrito, checkout, inventario reservado ni persistencia de selección.
- El proyecto seguirá usando el JSON local como fuente de productos por ahora.
- El CTA principal será consulta/contacto, no compra directa.
- Los precios actuales se mostrarán como referencia del catálogo.
- WhatsApp puede usar temporalmente el teléfono del footer hasta definir el número real de la tienda.
