// ════════════════════════════════════════════════════════════
//  FIKA'S — Datos del sitio (editar aquí para actualizar)
// ════════════════════════════════════════════════════════════

const FIKAS_DATA = {

  config: {
    nombre:    "Fika's Restaurant & Coffee Shop",
    whatsapp:  "50700000000", // ← cambiar por número real
    instagram: "",
    facebook:  "https://www.facebook.com/p/Fikas-Restaurant-and-Coffee-Shop-100076592689946/",
    maps:      "https://maps.google.com/?q=Q9J7+M5J,+Volc%C3%A1n,+Provincia+de+Chiriqu%C3%AD",
  },

  menu: [
    // DESAYUNOS
    {
      id: 1, categoria: 'desayunos',
      nombre: 'Desayuno Istmo',
      descripcion: 'Huevos al gusto, tortillas, patacones, frijoles, queso fresco y café o jugo natural.',
      precio: '$8.50',
      imagen: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&q=80',
      badge: 'Favorito',
    },
    {
      id: 2, categoria: 'desayunos',
      nombre: 'Pancakes de la Montaña',
      descripcion: 'Esponjosos pancakes con miel de abeja local, frutas frescas de temporada y crema.',
      precio: '$7.00',
      imagen: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80',
      badge: null,
    },
    {
      id: 3, categoria: 'desayunos',
      nombre: 'Tostada Artesanal',
      descripcion: 'Pan de masa madre con aguacate, tomates cherry, queso de cabra y aceite de oliva.',
      precio: '$6.50',
      imagen: 'https://images.unsplash.com/photo-1484723091739-30990ff56fba?w=500&q=80',
      badge: null,
    },
    // PLATOS
    {
      id: 4, categoria: 'platos',
      nombre: 'Parrillada Mixta',
      descripcion: 'Selección de carnes a la parrilla con patacones, yucas fritas y ensalada fresca.',
      precio: '$16.00',
      imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80',
      badge: 'Especialidad',
    },
    {
      id: 5, categoria: 'platos',
      nombre: 'Trucha de Río',
      descripcion: 'Trucha fresca de las corrientes de Chiriquí, al limón con arroz y vegetales salteados.',
      precio: '$14.50',
      imagen: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80',
      badge: null,
    },
    {
      id: 6, categoria: 'platos',
      nombre: 'Pollo a las Hierbas',
      descripcion: 'Pechuga de pollo marinada con hierbas frescas del jardín, papas rústicas y vegetales.',
      precio: '$12.00',
      imagen: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c8?w=500&q=80',
      badge: null,
    },
    {
      id: 7, categoria: 'platos',
      nombre: 'Hamburguesa Artesanal',
      descripcion: 'Carne de res local, pan brioche, cheddar derretido, lechuga, tomate y salsa especial.',
      precio: '$10.50',
      imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
      badge: null,
    },
    // CAFÉ
    {
      id: 8, categoria: 'cafe',
      nombre: 'Espresso Chiriquí',
      descripcion: 'Granos 100% panameños cultivados en las faldas del Volcán Barú. Intenso y aromático.',
      precio: '$2.50',
      imagen: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80',
      badge: 'Especialidad',
    },
    {
      id: 9, categoria: 'cafe',
      nombre: 'Latte de Temporada',
      descripcion: 'Espresso doble con leche vaporizada y el sabor especial de la temporada actual.',
      precio: '$4.00',
      imagen: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=500&q=80',
      badge: null,
    },
    {
      id: 10, categoria: 'cafe',
      nombre: 'Cold Brew de Altura',
      descripcion: 'Extracción en frío de 24 horas con granos de altura. Suave, dulce naturalmente.',
      precio: '$4.50',
      imagen: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80',
      badge: 'Nuevo',
    },
    // REPOSTERÍA
    {
      id: 11, categoria: 'reposteria',
      nombre: 'Croissant de Mantequilla',
      descripcion: 'Horneado fresco cada mañana. Hojaldrado, dorado y con mantequilla de leche local.',
      precio: '$2.50',
      imagen: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80',
      badge: 'Hecho hoy',
    },
    {
      id: 12, categoria: 'reposteria',
      nombre: 'Pastel de Guayaba',
      descripcion: 'Pastel tradicional con relleno de guayaba panameña, cobertura de crema y toques de canela.',
      precio: '$4.00',
      imagen: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=500&q=80',
      badge: null,
    },
    // BEBIDAS
    {
      id: 13, categoria: 'bebidas',
      nombre: 'Jugo Natural de Temporada',
      descripcion: 'Frutas frescas de las fincas de Tierras Altas. Preguntar variedad del día.',
      precio: '$3.00',
      imagen: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80',
      badge: null,
    },
    {
      id: 14, categoria: 'bebidas',
      nombre: 'Chocolate Caliente',
      descripcion: 'Cacao orgánico de Panamá preparado con leche fresca. Reconfortante en clima frío.',
      precio: '$3.50',
      imagen: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&q=80',
      badge: 'Favorito',
    },
  ],

  testimonios: [
    {
      texto: "El ambiente es muy agradable y el personal muy amable y atento. Pedimos una parrillada mixta y todo tenía un muy buen sabor. Las yucas fritas estaban deliciosas.",
      autor: "Carlos R.",
      via: "Google Reviews",
      estrellas: 5,
      emoji: "👨",
    },
    {
      texto: "Un lugar agradable con clima fresco. Perfecto para tomar algo caliente y tener una buena conversación. Fui a desayunar pero quisiera volver para probar otras opciones.",
      autor: "María L.",
      via: "Degusta Panamá",
      estrellas: 5,
      emoji: "👩",
    },
    {
      texto: "Muy lindo este restaurante. Fuimos por cafés y chocolates. Sin duda volveríamos para probar su comida. Precios bastante accesibles para la calidad que ofrecen.",
      autor: "Familia Herrera",
      via: "Google Reviews",
      estrellas: 4,
      emoji: "👨‍👩‍👧",
    },
    {
      texto: "La comida está bien pensada y tiene una excelente presentación y sabor. El desayuno Istmo me pareció muy buena opción. El servicio excelente.",
      autor: "Roberto A.",
      via: "Degusta Panamá",
      estrellas: 5,
      emoji: "👨‍💼",
    },
    {
      texto: "Café espectacular! Tienen diferentes opciones de pastelería para acompañar. Bonito lugar con mucho encanto. El mejor café de Volcán sin duda.",
      autor: "Ana P.",
      via: "Google Reviews",
      estrellas: 5,
      emoji: "👩‍🦰",
    },
    {
      texto: "Excelente lugar para conectarse con la naturaleza y disfrutar de una buena comida. El personal es muy atento y los precios se corresponden con la calidad.",
      autor: "Jorge M.",
      via: "Tripadvisor",
      estrellas: 5,
      emoji: "👴",
    },
  ],
};
