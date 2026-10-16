export const productos = [
  {
    id: 1,
    codigo: "MC001",
    nombre: "Cemento gris 25 kg",
    categoria: "Construcción",
    marca: "Polpaico",
    unidad: "saco",
    precio: 5990,
    stock: 80,
    stockMinimo: 20,
    imagen: "/assets/img/productos/cemento-25kg.jpg",
    descripcion: "Cemento gris para trabajos generales de construcción, reparación y obra menor."
  },
  {
    id: 2,
    codigo: "PT001",
    nombre: "Pintura látex interior 1 galón",
    categoria: "Pinturas",
    marca: "Sipa",
    unidad: "galón",
    precio: 9990,
    precioOferta: 8990,
    stock: 40,
    stockMinimo: 10,
    imagen: "/assets/img/productos/pintura-latex.jpg",
    descripcion: "Pintura látex de uso interior para muros y cielos, pensada para terminaciones de uso general."
  },
  {
    id: 3,
    codigo: "HM001",
    nombre: "Martillo carpintero 500 g",
    categoria: "Herramientas",
    marca: "Stanley",
    unidad: "unidad",
    precio: 7990,
    stock: 20,
    stockMinimo: 5,
    imagen: "/assets/img/productos/martillo-carpintero.jpg",
    descripcion: "Martillo carpintero para trabajos de montaje, reparación y uso frecuente en obra o taller."
  },
  {
    id: 4,
    codigo: "HM010",
    nombre: "Cinta métrica 8 m",
    categoria: "Herramientas",
    marca: "Stanley",
    unidad: "unidad",
    precio: 6490,
    precioOferta: 5490,
    stock: 20,
    stockMinimo: 5,
    imagen: "/assets/img/productos/cinta-metrica.jpg",
    descripcion: "Cinta métrica de 8 metros para mediciones en construcción, instalaciones y trabajos generales."
  },
  {
    id: 5,
    codigo: "HE001",
    nombre: "Taladro percutor 650 W",
    categoria: "Herramientas eléctricas",
    marca: "Makita",
    unidad: "unidad",
    precio: 79990,
    stock: 2,
    stockMinimo: 3,
    imagen: "/assets/img/productos/taladro-percutor.jpg",
    descripcion: "Taladro percutor para perforaciones de uso general en trabajos domésticos y profesionales."
  },
  {
    id: 6,
    codigo: "GS001",
    nombre: "Cañería PVC 1/2 pulgada x 6 m",
    categoria: "Gasfitería",
    marca: "Tigre",
    unidad: "tira",
    precio: 5490,
    stock: 30,
    stockMinimo: 10,
    imagen: "/assets/img/productos/tuberia-pvc.jpg",
    descripcion: "Cañería de PVC para instalaciones y reparaciones de redes de agua de uso residencial."
  },
  {
    id: 7,
    codigo: "GS007",
    nombre: "Llave de paso esfera 1/2 pulgada",
    categoria: "Gasfitería",
    marca: "Emmeti",
    unidad: "unidad",
    precio: 3490,
    stock: 30,
    stockMinimo: 8,
    imagen: "/assets/img/productos/llave-paso.jpg",
    descripcion: "Llave de paso tipo esfera para controlar el flujo de agua en instalaciones de gasfitería."
  },
  {
    id: 8,
    codigo: "EL002",
    nombre: "Cable unipolar 2,5 mm²",
    categoria: "Electricidad",
    marca: "Condulac",
    unidad: "metro",
    precio: 790,
    stock: 100,
    stockMinimo: 25,
    imagen: "/assets/img/productos/cable-unipolar.jpg",
    descripcion: "Cable unipolar para instalaciones eléctricas de uso general, vendido por metro."
  },
  {
    id: 9,
    codigo: "TR001",
    nombre: "Tornillo autoperforante 8x1 caja 100",
    categoria: "Ferretería general",
    marca: "Hilti",
    unidad: "caja",
    precio: 2990,
    stock: 40,
    stockMinimo: 15,
    imagen: "/assets/img/productos/tornillo-autoperforante.jpg",
    descripcion: "Caja de tornillos autoperforantes para fijaciones rápidas en distintos trabajos de montaje."
  },
  {
    id: 10,
    codigo: "SE001",
    nombre: "Casco de seguridad blanco",
    categoria: "Seguridad",
    marca: "3M",
    unidad: "unidad",
    precio: 6990,
    precioOferta: 5990,
    stock: 4,
    stockMinimo: 5,
    imagen: "/assets/img/productos/casco-seguridad.jpg",
    descripcion: "Casco de seguridad para protección de cabeza en faenas, talleres y trabajos de construcción."
  }
];

export const categorias = [...new Set(productos.map((producto) => producto.categoria))].sort(
  (a, b) => a.localeCompare(b, "es")
);

export function buscarProductoPorCodigo(codigo) {
  return productos.find((producto) => producto.codigo === codigo) ?? null;
}
