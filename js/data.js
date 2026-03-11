// ════════════════════════════════════════════════════════════
//  FIKA'S — Datos editables del sitio
//  Edita aquí para actualizar menú, reseñas y config
// ════════════════════════════════════════════════════════════

const FIKAS = {

  config: {
    nombre:    "Fika's Restaurant & Coffee Shop",
    whatsapp:  "50700000000",   // ← cambiar por el número real
    instagram: "https://www.instagram.com/fikas.pty/",
    facebook:  "https://www.facebook.com/p/Fikas-Restaurant-and-Coffee-Shop-100076592689946/",
    maps:      "https://maps.google.com/?q=Q9J7+M5J+Volc%C3%A1n+Chiriqu%C3%AD",
    degusta:   "https://www.degustapanama.com/interior/restaurante/fikas-rest-and-coffee-shop_107816.html",
  },

  // ── Menú — imágenes reales subidas por clientes ─────────
  menu: [
    // DESAYUNOS
    {
      id: 1, cat: "desayunos",
      nombre:     "Hojaldre con Bistec",
      descripcion:"Hojaldre frito crujiente con bistec sazonado al gusto panameño, el desayuno favorito de los regulares.",
      precio:     "$8.00",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_141012_6277d797d7e30.jpg",
      badge:      "Favorito",
    },
    {
      id: 2, cat: "desayunos",
      nombre:     "Pancakes con Tocino",
      descripcion:"Pancakes esponjosos acompañados de tocino crujiente, miel y frutas frescas de temporada.",
      precio:     "$7.50",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_141012_6277d7e73420a.jpg",
      badge:      null,
    },
    {
      id: 3, cat: "desayunos",
      nombre:     "Omelet de la Casa",
      descripcion:"Omelet preparado al momento con queso, vegetales frescos y hierbas de nuestra huerta.",
      precio:     "$7.00",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_49661_6819189b14b41.jpg",
      badge:      "Nuevo",
    },
    // PLATOS PRINCIPALES
    {
      id: 4, cat: "platos",
      nombre:     "Parrillada Mixta",
      descripcion:"Selección de carnes a la parrilla con patacones, yuca frita y ensalada. El plato estrella de Fika's.",
      precio:     "$16.00",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_199384_643af20a8bdd6.jpg",
      badge:      "Especialidad",
    },
    {
      id: 5, cat: "platos",
      nombre:     "Filete de Pescado y Patacones",
      descripcion:"Filete fresco de pescado acompañado de patacones dorados y salsa casera de la casa.",
      precio:     "$14.00",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_100568_6554299d04d4f.jpg",
      badge:      null,
    },
    {
      id: 6, cat: "platos",
      nombre:     "Lasagna Gratinada",
      descripcion:"Lasagna artesanal con carne, salsa boloñesa casera y queso mozzarella gratinado al horno.",
      precio:     "$12.50",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_342969_664d1a9326077.jpg",
      badge:      null,
    },
    // CAFÉ
    {
      id: 7, cat: "cafe",
      nombre:     "Café Americano",
      descripcion:"Espresso doble con agua caliente. Granos de origen panameño tostados artesanalmente.",
      precio:     "$2.50",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_265583_63bb4ff504ea3.jpg",
      badge:      null,
    },
    {
      id: 8, cat: "cafe",
      nombre:     "Moccacino",
      descripcion:"Espresso con chocolate y leche vaporizada. La combinación perfecta para el clima frío de Volcán.",
      precio:     "$4.00",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_265583_63bb4fddaf9e6.jpg",
      badge:      "Popular",
    },
    {
      id: 9, cat: "cafe",
      nombre:     "Cappuccino",
      descripcion:"Espresso con espuma de leche cremosa. Servido en taza precalentada para mantener la temperatura.",
      precio:     "$3.50",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_265583_63bb4fb9ec291.jpg",
      badge:      null,
    },
    {
      id: 10, cat: "cafe",
      nombre:     "Expresso",
      descripcion:"Concentrado puro de café panameño. Intenso, aromático y con notas de chocolate negro.",
      precio:     "$2.00",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_180797_6366e5df02a29.jpg",
      badge:      null,
    },
    // BEBIDAS CALIENTES
    {
      id: 11, cat: "bebidas",
      nombre:     "Chocolate Caliente",
      descripcion:"Cacao 100% panameño con leche fresca. Reconfortante en el clima frío de las Tierras Altas.",
      precio:     "$3.50",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_180797_6366e5ca30c1a.jpg",
      badge:      "Favorito",
    },
    {
      id: 12, cat: "bebidas",
      nombre:     "Chocolate con Crema",
      descripcion:"Chocolate caliente coronado con crema batida y esencia de vainilla. Pura indulgencia.",
      precio:     "$4.00",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_265583_63bb4fca4a1c3.jpg",
      badge:      null,
    },
    // PANCAKES
    {
      id: 13, cat: "desayunos",
      nombre:     "Pancakes Clásicos",
      descripcion:"Stack de pancakes dorados con mantequilla, sirope de arce y frutas frescas de temporada.",
      precio:     "$7.00",
      foto:       "https://degusta-pic-sq.b-cdn.net/pix_14_107816_49661_681918751c775.jpg",
      badge:      null,
    },
  ],

  // ── Reseñas verificadas ──────────────────────────────────
  resenas: [
    {
      texto:    "El ambiente es muy agradable y el personal muy amable y atento. Pedimos la parrillada mixta y todo tenía un muy buen sabor. Las yucas fritas estaban deliciosas.",
      autor:    "Carlos R.",
      via:      "Google Reviews",
      estrellas: 5,
      emoji:    "👨",
    },
    {
      texto:    "Un lugar agradable con clima fresco. Perfecto para tomar algo caliente y tener una buena conversación. El moccacino es increíble.",
      autor:    "María L.",
      via:      "Degusta Panamá",
      estrellas: 5,
      emoji:    "👩",
    },
    {
      texto:    "Muy lindo este restaurante. Fuimos por cafés y chocolates. Sin duda volveríamos para probar su comida. Precios bastante accesibles para la calidad que ofrecen.",
      autor:    "Familia Herrera",
      via:      "Google Reviews",
      estrellas: 4,
      emoji:    "👨‍👩‍👧",
    },
    {
      texto:    "La comida está bien pensada y tiene una excelente presentación. El desayuno de hojaldre con bistec estuvo perfecto. El servicio, excelente.",
      autor:    "Roberto A.",
      via:      "Degusta Panamá",
      estrellas: 5,
      emoji:    "👨‍💼",
    },
    {
      texto:    "El mejor café de Volcán. Tienen diferentes opciones de repostería para acompañar. Bonito lugar con mucho encanto y precio muy justo.",
      autor:    "Ana P.",
      via:      "Google Reviews",
      estrellas: 5,
      emoji:    "👩‍🦰",
    },
    {
      texto:    "Excelente lugar para conectarse con la naturaleza y disfrutar de una buena comida. El personal es muy atento y los precios se corresponden con la calidad.",
      autor:    "Jorge M.",
      via:      "Tripadvisor",
      estrellas: 5,
      emoji:    "👴",
    },
  ],
};
