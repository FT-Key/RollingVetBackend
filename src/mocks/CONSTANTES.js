export const usuarios = [
  {
    id: 1,
    nombreUsuario: "jdoe",
    email: "jdoe@example.com",
    contrasenia: "password123",
    login: true,
    bloqueado: false,
    tipoLogueo: "normal",
    verificacionEmail: true,
    nombre: "John",
    apellido: "Doe",
    fechaNacimiento: "1990-01-01",
    direccion: {
      calle: "123 Main St",
      ciudad: "Somewhere",
      estado: "CA",
      codigoPostal: "90210",
      pais: "USA"
    },
    telefono: "555-1234",
    fotoPerfil: "https://picsum.photos/2000/750?random=1.jpg",
    rol: "admin",
    ultimoIngreso: "2024-01-01T12:00:00Z",
    creadoEn: "2023-01-01T12:00:00Z",
    actualizadoEn: "2024-01-01T12:00:00Z",
    estaActivo: true,
    preferencias: {
      idioma: "en",
      tema: "oscuro"
    },
    preguntasSeguridad: [
      { pregunta: "¿Cuál es el nombre de tu mascota?", respuesta: "Fluffy" }
    ],
    biografia: "Desarrollador de software con 10 años de experiencia.",
    enlacesRedesSociales: {
      twitter: "https://twitter.com/jdoe",
      linkedin: "https://linkedin.com/in/jdoe"
    },
    estadoSuscripcion: "premium",
    notificaciones: {
      email: true,
      sms: false
    },
    autenticacionDosFactores: true,
    region: "en-US"
  },
  {
    id: 2,
    nombreUsuario: "asmith",
    email: "asmith@example.com",
    contrasenia: "password456",
    login: false,
    bloqueado: true,
    tipoLogueo: "normal",
    verificacionEmail: false,
    nombre: "Alice",
    apellido: "Smith",
    fechaNacimiento: "1992-05-15",
    direccion: {
      calle: "456 Elm St",
      ciudad: "Anywhere",
      estado: "TX",
      codigoPostal: "75001",
      pais: "USA"
    },
    telefono: "555-5678",
    fotoPerfil: "https://picsum.photos/2000/750?random=2.jpg",
    rol: "user",
    ultimoIngreso: "2024-01-02T14:00:00Z",
    creadoEn: "2023-02-01T12:00:00Z",
    actualizadoEn: "2024-01-02T14:00:00Z",
    estaActivo: true,
    preferencias: {
      idioma: "es",
      tema: "claro"
    },
    preguntasSeguridad: [
      { pregunta: "¿Cuál es el apellido de soltera de tu madre?", respuesta: "Johnson" }
    ],
    biografia: "Diseñadora gráfica amante del arte y la tecnología.",
    enlacesRedesSociales: {
      twitter: "https://twitter.com/asmith",
      linkedin: "https://linkedin.com/in/asmith"
    },
    estadoSuscripcion: "gratis",
    notificaciones: {
      email: true,
      sms: true
    },
    autenticacionDosFactores: false,
    region: "es-ES"
  },
  {
    id: 3,
    nombreUsuario: "bwayne",
    email: "bwayne@example.com",
    contrasenia: "darkknight",
    login: true,
    bloqueado: false,
    tipoLogueo: "social",
    verificacionEmail: true,
    nombre: "Bruce",
    apellido: "Wayne",
    fechaNacimiento: "1980-02-19",
    direccion: {
      calle: "1007 Mountain Drive",
      ciudad: "Gotham",
      estado: "NY",
      codigoPostal: "12345",
      pais: "USA"
    },
    telefono: "555-9876",
    fotoPerfil: "https://picsum.photos/2000/750?random=3.jpg",
    rol: "admin",
    ultimoIngreso: "2024-03-10T10:00:00Z",
    creadoEn: "2023-03-10T10:00:00Z",
    actualizadoEn: "2024-03-10T10:00:00Z",
    estaActivo: true,
    preferencias: {
      idioma: "en",
      tema: "oscuro"
    },
    preguntasSeguridad: [
      { pregunta: "¿Cuál es tu color favorito?", respuesta: "Negro" }
    ],
    biografia: "Empresario durante el día, vigilante durante la noche.",
    enlacesRedesSociales: {
      twitter: "https://twitter.com/bwayne",
      linkedin: "https://linkedin.com/in/bwayne"
    },
    estadoSuscripcion: "premium",
    notificaciones: {
      email: false,
      sms: true
    },
    autenticacionDosFactores: true,
    region: "en-US"
  },
  {
    id: 4,
    nombreUsuario: "ckent",
    email: "ckent@example.com",
    contrasenia: "superman123",
    login: true,
    bloqueado: false,
    tipoLogueo: "normal",
    verificacionEmail: true,
    nombre: "Clark",
    apellido: "Kent",
    fechaNacimiento: "1980-06-18",
    direccion: {
      calle: "344 Clinton St",
      ciudad: "Metropolis",
      estado: "NY",
      codigoPostal: "67890",
      pais: "USA"
    },
    telefono: "555-4321",
    fotoPerfil: "https://picsum.photos/2000/750?random=4.jpg",
    rol: "editor",
    ultimoIngreso: "2024-04-01T09:00:00Z",
    creadoEn: "2023-04-01T09:00:00Z",
    actualizadoEn: "2024-04-01T09:00:00Z",
    estaActivo: true,
    preferencias: {
      idioma: "en",
      tema: "claro"
    },
    preguntasSeguridad: [
      { pregunta: "¿Cuál es tu comida favorita?", respuesta: "Pizza" }
    ],
    biografia: "Periodista del Daily Planet y superhéroe conocido como Superman.",
    enlacesRedesSociales: {
      twitter: "https://twitter.com/ckent",
      linkedin: "https://linkedin.com/in/ckent"
    },
    estadoSuscripcion: "premium",
    notificaciones: {
      email: true,
      sms: false
    },
    autenticacionDosFactores: true,
    region: "en-US"
  },
  {
    id: 5,
    nombreUsuario: "wwest",
    email: "wwest@example.com",
    contrasenia: "flash123",
    login: true,
    bloqueado: false,
    tipoLogueo: "social",
    verificacionEmail: true,
    nombre: "Wally",
    apellido: "West",
    fechaNacimiento: "1995-08-03",
    direccion: {
      calle: "789 Speed St",
      ciudad: "Central City",
      estado: "MO",
      codigoPostal: "65432",
      pais: "USA"
    },
    telefono: "555-6789",
    fotoPerfil: "https://picsum.photos/2000/750?random=5.jpg",
    rol: "user",
    ultimoIngreso: "2024-05-05T11:00:00Z",
    creadoEn: "2023-05-05T11:00:00Z",
    actualizadoEn: "2024-05-05T11:00:00Z",
    estaActivo: true,
    preferencias: {
      idioma: "en",
      tema: "oscuro"
    },
    preguntasSeguridad: [
      { pregunta: "¿Cuál es el nombre de tu primer maestro?", respuesta: "Joe" }
    ],
    biografia: "El hombre más rápido vivo, conocido como Flash.",
    enlacesRedesSociales: {
      twitter: "https://twitter.com/wwest",
      linkedin: "https://linkedin.com/in/wwest"
    },
    estadoSuscripcion: "premium",
    notificaciones: {
      email: false,
      sms: true
    },
    autenticacionDosFactores: true,
    region: "en-US"
  },
  {
    id: 6,
    nombreUsuario: "dprince",
    email: "dprince@example.com",
    contrasenia: "wonderwoman",
    login: true,
    bloqueado: false,
    tipoLogueo: "normal",
    verificacionEmail: true,
    nombre: "Diana",
    apellido: "Prince",
    fechaNacimiento: "1985-03-10",
    direccion: {
      calle: "101 Amazon Way",
      ciudad: "Themyscira",
      estado: "Unknown",
      codigoPostal: "00000",
      pais: "Greece"
    },
    telefono: "555-2468",
    fotoPerfil: "https://picsum.photos/2000/750?random=6",
    rol: "admin",
    ultimoIngreso: "2024-06-20T13:00:00Z",
    creadoEn: "2023-06-20T13:00:00Z",
    actualizadoEn: "2024-06-20T13:00:00Z",
    estaActivo: true,
    preferencias: {
      idioma: "en",
      tema: "oscuro"
    },
    preguntasSeguridad: [
      { pregunta: "¿Cuál es el nombre de tu mejor amigo?", respuesta: "Steve" }
    ],
    biografia: "Princesa de Themyscira y conocida como Wonder Woman.",
    enlacesRedesSociales: {
      twitter: "https://twitter.com/dprince",
      linkedin: "https://linkedin.com/in/dprince"
    },
    estadoSuscripcion: "premium",
    notificaciones: {
      email: true,
      sms: false
    },
    autenticacionDosFactores: true,
    region: "en-US"
  }
];

export const productos = [
  {
    id: 1,
    name: "Camara",
    price: 15,
    description: "Una cámara digital de alta resolución.",
    category: "Electrónica",
    stock: 10,
    brand: "Sony",
    model: "Alpha",
    imageUrl: "https://picsum.photos/2000/750?random=7",
    ratings: 4.5,
    reviews: [
      {
        user: "Juan",
        comment: "Excelente producto.",
        rating: 5
      },
      {
        user: "Maria",
        comment: "Buena calidad.",
        rating: 4
      }
    ],
    warranty: "2 años",
    releaseDate: "2023-01-01",
    discount: "10%"
  },
  {
    id: 2,
    name: "Celular",
    price: 25,
    description: "Un teléfono inteligente con gran capacidad.",
    category: "Electrónica",
    stock: 15,
    brand: "Samsung",
    model: "Galaxy",
    imageUrl: "https://picsum.photos/2000/750?random=8",
    ratings: 4.0,
    reviews: [
      {
        user: "Pedro",
        comment: "Muy buen celular.",
        rating: 4
      }
    ],
    warranty: "1 año",
    releaseDate: "2023-02-01",
    discount: "5%"
  },
  {
    id: 3,
    name: "Pantalla",
    price: 40,
    description: "Pantalla HD de 24 pulgadas.",
    category: "Electrónica",
    stock: 5,
    brand: "LG",
    model: "UltraHD",
    imageUrl: "https://picsum.photos/2000/750?random=9",
    ratings: 4.7,
    reviews: [
      {
        user: "Luis",
        comment: "Excelente resolución.",
        rating: 5
      }
    ],
    warranty: "3 años",
    releaseDate: "2023-03-01",
    discount: "15%"
  },
  {
    id: 4,
    name: "Microondas",
    price: 35,
    description: "Microondas de alta potencia.",
    category: "Electrodomésticos",
    stock: 7,
    brand: "Panasonic",
    model: "Inverter",
    imageUrl: "https://picsum.photos/2000/750?random=10",
    ratings: 4.2,
    reviews: [
      {
        user: "Ana",
        comment: "Muy rápido y eficiente.",
        rating: 4
      }
    ],
    warranty: "1 año",
    releaseDate: "2023-04-01",
    discount: "20%"
  },
  {
    id: 5,
    name: "Laptop",
    price: 60,
    description: "Laptop de alto rendimiento con pantalla HD.",
    category: "Electrónica",
    stock: 8,
    brand: "Apple",
    model: "MacBook Pro",
    imageUrl: "https://picsum.photos/2000/750?random=11",
    ratings: 4.8,
    reviews: [
      {
        user: "Carlos",
        comment: "Excelente para el trabajo diario.",
        rating: 5
      }
    ],
    warranty: "1 año",
    releaseDate: "2023-05-01",
    discount: "10%"
  },
  {
    id: 6,
    name: "Refrigerador",
    price: 120,
    description: "Refrigerador con gran capacidad de almacenamiento.",
    category: "Electrodomésticos",
    stock: 4,
    brand: "LG",
    model: "FrostFree",
    imageUrl: "https://picsum.photos/2000/750?random=12",
    ratings: 4.3,
    reviews: [
      {
        user: "Lucia",
        comment: "Muy espacioso y eficiente.",
        rating: 4
      }
    ],
    warranty: "2 años",
    releaseDate: "2023-06-01",
    discount: "5%"
  },
  {
    id: 7,
    name: "Aspiradora",
    price: 45,
    description: "Aspiradora de alta potencia y eficiencia.",
    category: "Electrodomésticos",
    stock: 12,
    brand: "Dyson",
    model: "V11",
    imageUrl: "https://picsum.photos/2000/750?random=13",
    ratings: 4.6,
    reviews: [
      {
        user: "Elena",
        comment: "Limpia a fondo y es fácil de usar.",
        rating: 5
      }
    ],
    warranty: "1 año",
    releaseDate: "2023-07-01",
    discount: "15%"
  },
  {
    id: 8,
    name: "Tablet",
    price: 30,
    description: "Tablet con gran capacidad de almacenamiento y pantalla HD.",
    category: "Electrónica",
    stock: 20,
    brand: "Apple",
    model: "iPad",
    imageUrl: "https://picsum.photos/2000/750?random=14",
    ratings: 4.4,
    reviews: [
      {
        user: "Miguel",
        comment: "Muy buena para leer y navegar por internet.",
        rating: 4
      }
    ],
    warranty: "1 año",
    releaseDate: "2023-08-01",
    discount: "10%"
  },
  {
    id: 9,
    name: "Smartwatch",
    price: 20,
    description: "Smartwatch con múltiples funciones y larga duración de batería.",
    category: "Electrónica",
    stock: 25,
    brand: "Fitbit",
    model: "Versa",
    imageUrl: "https://picsum.photos/2000/750?random=15",
    ratings: 4.1,
    reviews: [
      {
        user: "Diego",
        comment: "Muy útil y práctico para el día a día.",
        rating: 4
      }
    ],
    warranty: "1 año",
    releaseDate: "2023-09-01",
    discount: "5%"
  },
  {
    id: 10,
    name: "Parlante Bluetooth",
    price: 50,
    description: "Parlante Bluetooth portátil con excelente calidad de sonido.",
    category: "Electrónica",
    stock: 30,
    brand: "Bose",
    model: "SoundLink",
    imageUrl: "https://picsum.photos/2000/750?random=16",
    ratings: 4.9,
    reviews: [
      {
        user: "Laura",
        comment: "El mejor parlante que he comprado.",
        rating: 5
      }
    ],
    warranty: "1 año",
    releaseDate: "2023-10-01",
    discount: "10%"
  }
];