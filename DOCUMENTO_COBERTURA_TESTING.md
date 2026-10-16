# Documento de cobertura de testing - versión final validada

## Proyecto
Ferretería Los Maestros - Evaluación Parcial 2 - DSY1104 Desarrollo FullStack II.

## Objetivo
Mantener 30 pruebas (10 por integrante) pero asegurar que correspondan a funcionalidades reales desarrolladas por cada integrante y no solo a verificaciones simples de texto o renderizado.

## Matriz de pruebas

| N° | Integrante | Área | Comportamiento principal |
|---:|---|---|---|
| 1 | 1 | ProductoCard | Oferta, stock bajo y enlace dinámico. |
| 2 | 1 | ProductoCard | Agregar producto correcto al carrito. |
| 3 | 1 | Catálogo | Buscar por nombre/código. |
| 4 | 1 | Catálogo | Filtrar por categoría. |
| 5 | 1 | Catálogo | Leer categoría desde query string. |
| 6 | 1 | Categorías | Contar productos y enlazar catálogo filtrado. |
| 7 | 1 | Ofertas | Mostrar solo productos promocionales. |
| 8 | 1 | Detalle | Manejar producto inexistente. |
| 9 | 1 | Detalle | Cambiar cantidad y agregarla al carrito. |
| 10 | 1 | Inicio | Navegación a categorías y detalles destacados. |
| 11 | 2 | Registro | Validaciones bloquean datos incorrectos. |
| 12 | 2 | Registro | Registro válido y navegación. |
| 13 | 2 | Registro | Correo duplicado. |
| 14 | 2 | Login | Credenciales incorrectas. |
| 15 | 2 | Login | Autenticación y retorno a ruta solicitada. |
| 16 | 2 | Sesión | Persistencia según Recuérdame. |
| 17 | 2 | PanelCliente | Datos de sesión y cuenta corriente. |
| 18 | 2 | Checkout | Autocompletado y dirección obligatoria para despacho. |
| 19 | 2 | Checkout/Confirmación | Total con oferta, persistencia del pedido, vaciado y confirmación. |
| 20 | 2 | Confirmación | Estado controlado sin compra reciente. |
| 21 | 3 | CarritoContext | Regla de stock máximo. |
| 22 | 3 | CarritoContext | Persistencia del carrito. |
| 23 | 3 | Carrito | Subtotales, total, cantidades, eliminación y checkout. |
| 24 | 3 | Inventario | Stock bajo y búsqueda. |
| 25 | 3 | RutaRol | Protección de administración según rol. |
| 26 | 3 | PanelEmpleado | Conteo dinámico de stock bajo. |
| 27 | 3 | PanelAdmin | Validación y creación. |
| 28 | 3 | PanelAdmin | Edición y actualización. |
| 29 | 3 | PanelAdmin | Confirmación y eliminación. |
| 30 | 3 | productosService | CRUD persistente y unicidad de código. |

## Evidencia y cobertura

Ejecutar:

```bash
npm test
npm run coverage
```

La versión final conserva 30 casos relevantes y alineados con el trabajo de cada integrante. La ejecución local validada el 16/10/2026 obtuvo:

### Resultado final
- Test Files: **19/19 aprobados**
- Tests: **30/30 aprobadas**
- Statements: **85.08%**
- Branches: **70.00%**
- Functions: **73.91%**
- Lines: **85.08%**
- Cobertura de `src/pages`: **95.28%** de statements/lines

Las advertencias de React Router son Future Flag Warnings y no corresponden a fallos de las pruebas.

## Mocks y spies relevantes
- Contextos de carrito, productos y sesión para aislar componentes.
- `window.confirm` en eliminación administrativa.
- `Storage.prototype.setItem` para verificar persistencia.
- `user-event` para formularios, filtros, cantidades y acciones CRUD.
