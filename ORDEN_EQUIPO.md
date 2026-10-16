# Orden de trabajo - Evaluación Parcial 2

## Integrante 1 - Base, tienda pública y catálogo
Rama sugerida: `feature/base-catalogo-react`

Responsabilidades: Inicio, Catálogo, Categorías, Detalle de producto, Ofertas, componentes de producto y Bootstrap responsive.

### Sus 10 pruebas
1. ProductoCard representa oferta, stock bajo y enlace al detalle.
2. ProductoCard agrega al carrito el código correcto.
3. Catálogo busca por nombre o código.
4. Catálogo filtra por categoría.
5. Catálogo respeta la categoría recibida por URL.
6. Categorías calcula cantidades y genera enlaces filtrados.
7. Ofertas excluye productos sin precio promocional.
8. Detalle controla un código inexistente.
9. Detalle agrega la cantidad seleccionada al carrito.
10. Inicio conecta categorías y productos destacados con sus rutas.

Commit sugerido: `test: cubrir tienda publica catalogo y detalle`

## Integrante 2 - Clientes y checkout
Rama sugerida: `feature/clientes-checkout`

Responsabilidades: Registro, Login, sesión, PanelCliente, Checkout y Confirmación.

### Sus 10 pruebas
11. Registro bloquea datos inválidos.
12. Registro válido llama al contexto y navega al login.
13. Registro muestra correo duplicado.
14. Login rechaza credenciales incorrectas.
15. Login autentica y respeta la ruta de retorno.
16. Sesión usa localStorage o sessionStorage según Recuérdame.
17. PanelCliente presenta datos y cuenta corriente de la sesión.
18. Checkout autocompleta datos y exige dirección para despacho.
19. Checkout calcula oferta, guarda pedido, vacía carrito y llega a Confirmación.
20. Confirmación controla el caso sin compra reciente.

Commit sugerido: `test: cubrir clientes sesion checkout y confirmacion`

## Integrante 3 - Carrito y administración
Rama sugerida: `feature/carrito-administracion`

Responsabilidades: Carrito, Inventario, roles, PanelEmpleado, PanelAdmin y CRUD/persistencia de productos.

### Sus 10 pruebas
21. CarritoContext rechaza cantidades superiores al stock.
22. CarritoContext persiste una compra válida.
23. Carrito calcula subtotales/total y conecta sus acciones.
24. Inventario detecta stock bajo y filtra.
25. RutaRol impide acceso de Cliente a administración.
26. PanelEmpleado calcula alertas de inventario.
27. PanelAdmin valida y crea producto.
28. PanelAdmin carga y actualiza producto.
29. PanelAdmin confirma antes de eliminar.
30. productosService mantiene el CRUD persistente y rechaza códigos duplicados.

Commit sugerido: `test: cubrir carrito roles inventario y administracion`

## Validación conjunta

Ejecutar después de integrar:

```bash
npm test
npm run coverage
```

Resultado final validado: **19/19 archivos y 30/30 pruebas aprobadas**. Cobertura V8: **85.08% statements, 70.00% branches, 73.91% functions y 85.08% lines**. Guardar capturas de 30/30 aprobadas, mocks/spies y `coverage/index.html`.
