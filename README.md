# Ferretería Los Maestros - Evaluación Parcial 2

Migración a React + Vite del proyecto desarrollado en la Evaluación Parcial 2 de DSY1104.

## Estado actual

La base integra el trabajo funcional de los tres integrantes.

### Integrante 1 - Tienda pública y catálogo
- React + Vite.
- React Bootstrap.
- React Router.
- Inicio.
- Catálogo dinámico.
- Búsqueda y filtro por categoría.
- Vista Categorías.
- Detalle con ruta dinámica `/producto/:codigo`.
- Vista Ofertas.
- Diseño responsive.

### Integrante 2 - Clientes y checkout
- Registro con formulario controlado.
- Validación de RUT, correo, teléfono y contraseñas.
- Inicio de sesión.
- Persistencia con `localStorage` o `sessionStorage` según "Recuérdame".
- Panel protegido de cliente.
- Checkout con datos de contacto.
- Retiro en tienda o despacho.
- Dirección condicional para despacho.
- Forma de pago representada en frontend.
- Confirmación y resumen de compra.
- Vista de pago no procesado.

### Integrante 3 - Carrito y administración
- Carrito React mediante Context y `useState`.
- Persistencia automática del carrito con `useEffect` y `localStorage`.
- Sumar, restar, eliminar y vaciar productos.
- Validación contra stock disponible.
- Contador de unidades en la navegación.
- Inventario con búsqueda y alertas de stock bajo.
- Panel de empleado.
- Panel de administrador.
- Roles protegidos para Cliente, Empleado y Administrador.
- CRUD simulado de productos mediante archivo JavaScript y `localStorage`.
- Los cambios CRUD se reflejan en catálogo, ofertas, inventario y administración.

## Ejecutar

```bash
npm install
npm run dev
```

## Usuarios de prueba

```text
Cliente
cliente@losmaestros.cl
cliente123

Empleado
empleado@losmaestros.cl
empleado123

Administrador
admin@losmaestros.cl
admin123
```

También se pueden crear clientes desde `/registro`.

> La autenticación, persistencia, pagos y CRUD son simulaciones de frontend. La seguridad y persistencia real deberán implementarse posteriormente en backend.

## Rutas principales

```text
/
/catalogo
/categorias
/ofertas
/producto/:codigo
/carrito
/login
/registro
/mi-cuenta
/checkout
/compra-exitosa
/pago-error
/empleado
/inventario
/admin
```

## Persistencia simulada

Claves utilizadas en `localStorage`:

```text
ferreteriaCarritoReact
ferreteriaProductosReact
ferreteriaUsuariosReact
ferreteriaSesionReact
ferreteriaUltimoPedidoReact
```

## CRUD de productos

El archivo `src/services/productosService.js` implementa:

```text
obtenerProductos()
crearProducto()
actualizarProducto()
eliminarProducto()
restablecerProductos()
```

El administrador puede crear, editar y eliminar productos desde `/admin`. El catálogo inicial puede recuperarse con el botón `Restablecer`.

## Pruebas unitarias

El proyecto utiliza Vitest, jsdom, React Testing Library, jest-dom y user-event.

Comandos:

```bash
npm test
npm run test:watch
npm run coverage
```

La versión final mantiene **30 pruebas, 10 por integrante**, con casos de flujo e interacción ligados directamente al trabajo de cada integrante:

- **Integrante 1 (1-10):** ProductoCard, búsqueda y filtros del catálogo, navegación por categoría, ofertas, detalle de producto e Inicio.
- **Integrante 2 (11-20):** registro, login, persistencia de sesión, panel del cliente, checkout real y confirmación de compra.
- **Integrante 3 (21-30):** reglas y persistencia del carrito, página Carrito, inventario, protección por roles, panel empleado, CRUD del panel administrador y persistencia del catálogo.

El reporte HTML de cobertura se genera en `coverage/index.html`.

> Resultado final validado: **19/19 archivos de prueba y 30/30 pruebas aprobadas**. Cobertura V8: **85.08% statements, 70.00% branches, 73.91% functions y 85.08% lines**. La cobertura de `src/pages` alcanza **95.28%** de statements/lines.

## Próxima etapa

1. Desplegar el build final en AWS EC2 con Nginx.
2. Registrar la IP o URL de despliegue y comprobar una ruta interna recargada directamente.
3. Preparar evidencias, GitHub y presentación individual.
4. Generar el ZIP final sin `node_modules` ni la carpeta `coverage`, salvo que el docente indique lo contrario.
