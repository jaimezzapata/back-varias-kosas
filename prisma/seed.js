import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const USERS_DATA = [
  { name: 'Jaime Zapata', email: 'jaime@variaskosas.co', phone: '3001112233', city: 'Medellín' },
  { name: 'Laura Gómez', email: 'laura@variaskosas.co', phone: '3012223344', city: 'Bogotá' },
  { name: 'Carlos Ruiz', email: 'carlos@variaskosas.co', phone: '3023334455', city: 'Cali' },
  { name: 'Sofía Martínez', email: 'sofia@variaskosas.co', phone: '3034445566', city: 'Barranquilla' },
  { name: 'Mateo Castro', email: 'mateo@variaskosas.co', phone: '3045556677', city: 'Bucaramanga' },
  { name: 'Valentina Ríos', email: 'valentina@variaskosas.co', phone: '3056667788', city: 'Pereira' },
  { name: 'Andrés Morales', email: 'andres@variaskosas.co', phone: '3107778899', city: 'Cartagena' },
  { name: 'Camila Herrera', email: 'camila@variaskosas.co', phone: '3118889900', city: 'Manizales' },
  { name: 'Sebastián Díaz', email: 'sebastian@variaskosas.co', phone: '3129990011', city: 'Cúcuta' },
  { name: 'Daniela Vargas', email: 'daniela@variaskosas.co', phone: '3130001122', city: 'Santa Marta' },
];

const PUBLICATIONS_DATA = [
  {
    title: 'Chaqueta denim Levi’s talla M',
    description: 'Usada dos veces, sin detalles ni manchas. Tela gruesa original en excelente calidad.',
    price: 120000,
    category: 'ropa',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80',
  },
  {
    title: 'Audífonos Sony WH-1000XM4',
    description: 'En caja original con cable y estuche rígido. Cancelación de ruido y batería al 100%.',
    price: 650000,
    category: 'tecnologia',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
  },
  {
    title: 'Lámpara de escritorio industrial',
    description: 'Estructura metálica negra mate, incluye bombillo cálido LED. Cero rayones.',
    price: 85000,
    category: 'hogar',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
  },
  {
    title: 'Teclado mecánico Keychron K2',
    description: 'Switches brown, retroiluminado, conexión Bluetooth y USB-C. Impecable.',
    price: 290000,
    category: 'tecnologia',
    condition: 'como_nuevo',
    status: 'vendido',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
  },
  {
    title: 'Tenis Nike Air Force 1 blancos talla 41',
    description: 'Suela limpia y cuero cuidado. Usados en contadas ocasiones, con caja.',
    price: 260000,
    category: 'ropa',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
  },
  {
    title: 'Monitor LG UltraGear 24 pulgadas 144Hz',
    description: 'Sin píxeles muertos, incluye cable DisplayPort y base ajustable original.',
    price: 580000,
    category: 'tecnologia',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
  },
  {
    title: 'Cafetera francesa Bodum 1L',
    description: 'Vidrio borosilicato intacto y filtro de acero inoxidable limpio. Poco uso.',
    price: 75000,
    category: 'hogar',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
  },
  {
    title: 'Bicicleta urbana fixie rin 700',
    description: 'Marco en acero liviano, llantas nuevas y frenos calibrados. Lista para rodar.',
    price: 720000,
    category: 'deportes',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80',
  },
  {
    title: 'Clean Code — Robert C. Martin (Inglés)',
    description: 'Tapa blanda sin subrayados ni hojas dobladas. Ideal para desarrolladores.',
    price: 95000,
    category: 'libros',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
  },
  {
    title: 'Mochila impermeable minimalista negra',
    description: 'Compartimento acolchado para portátil de 15 pulgadas, cremalleras selladas.',
    price: 140000,
    category: 'accesorios',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  },
  {
    title: 'Cámara instantánea Fujifilm Instax Mini 11',
    description: 'Color negro carbón, funcionando al 100%, incluye estuche protector.',
    price: 240000,
    category: 'tecnologia',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
  },
  {
    title: 'Sudadera hoodie oversize amarilla',
    description: 'Algodón pesado 350g, talla L. Color vivo sin motas ni decoloración.',
    price: 90000,
    category: 'ropa',
    condition: 'nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
  },
  {
    title: 'Juego de mancuernas ajustables 20kg',
    description: 'Discos recubiertos con seguro roscado. Perfecto estado para entrenar en casa.',
    price: 185000,
    category: 'deportes',
    condition: 'bueno',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
  },
  {
    title: 'Reloj Casio G-Shock negro clásico',
    description: 'Resistente al agua y golpes, pila recién cambiada. Sin rayones en el cristal.',
    price: 310000,
    category: 'accesorios',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80',
  },
  {
    title: 'Silla ergonómica de oficina negra',
    description: 'Soporte lumbar, altura graduable y malla transpirable sin desgaste.',
    price: 420000,
    category: 'hogar',
    condition: 'excelente',
    status: 'pausado',
    imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80',
  },
  {
    title: 'Kindle Paperwhite 11va Gen 8GB',
    description: 'Pantalla sin rayones, luz cálida ajustable. Incluye funda magnética.',
    price: 460000,
    category: 'tecnologia',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-e513176f20b5?w=600&q=80',
  },
  {
    title: 'Gafas de sol Ray-Ban Wayfarer',
    description: 'Originales con estuche de cuero y paño. Lentes polarizados sin marcas.',
    price: 340000,
    category: 'accesorios',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
  },
  {
    title: 'Diseño de Sistemas Intensivos en Datos',
    description: 'Libro de arquitectura de software en español, impecable de pasta a pasta.',
    price: 135000,
    category: 'libros',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
  },
  {
    title: 'Raqueta de tenis Wilson Pro Staff',
    description: 'Grip recién cambiado, encordado firme. Excelente control y potencia.',
    price: 390000,
    category: 'deportes',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1617083934555-ac7d4fee8909?w=600&q=80',
  },
  {
    title: 'Tocadiscos Audio-Technica AT-LP60X',
    description: 'Automático, preamplificador integrado y aguja en perfecto estado.',
    price: 540000,
    category: 'otros',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=600&q=80',
  },
  {
    title: 'Blazer negro corte recto talla S',
    description: 'Forro interno intacto, ideal para oficina o eventos. Usado una vez.',
    price: 110000,
    category: 'ropa',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
  },
  {
    title: 'Mouse Logitech MX Master 3S',
    description: 'Silencioso, rueda electromagnética MagSpeed y receptor Logi Bolt incluido.',
    price: 320000,
    category: 'tecnologia',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
  },
  {
    title: 'Set de 3 materas geométricas en cerámica',
    description: 'Color blanco mate con base en madera de bambú. Sin fisuras.',
    price: 68000,
    category: 'hogar',
    condition: 'nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
  },
  {
    title: 'Patinete eléctrico Xiaomi Mi Scooter 3',
    description: 'Autonomía de 28 km reales, cargador original y llantas en muy buen estado.',
    price: 1250000,
    category: 'deportes',
    condition: 'bueno',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80',
  },
  {
    title: 'Trilogía El Problema de los Tres Cuerpos',
    description: 'Los tres tomos completos en edición rústica, leídos una sola vez.',
    price: 160000,
    category: 'libros',
    condition: 'excelente',
    status: 'vendido',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80',
  },
  {
    title: 'Billetera en cuero genuino café',
    description: 'Cosida a mano, 6 ranuras para tarjetas y espacio amplio para billetes.',
    price: 65000,
    category: 'accesorios',
    condition: 'nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
  },
  {
    title: 'Guitarra acústica Yamaha F310',
    description: 'Cuerdas nuevas Elixir, sonido cálido y mástil recto. Incluye forro acolchado.',
    price: 490000,
    category: 'otros',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80',
  },
  {
    title: 'Camisa lino blanca manga larga talla L',
    description: 'Fresca, 100% lino natural, botones de nácar intactos.',
    price: 78000,
    category: 'ropa',
    condition: 'excelente',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
  },
  {
    title: 'iPad Air 4ta Gen 64GB Wi-Fi',
    description: 'Color gris espacial, batería excelente y protector de pantalla instalado.',
    price: 1650000,
    category: 'tecnologia',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
  },
  {
    title: 'Juego de mesa Catan edición estándar',
    description: 'Todas las fichas, cartas y hexágonos completos. Caja en perfecto estado.',
    price: 130000,
    category: 'otros',
    condition: 'como_nuevo',
    status: 'disponible',
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&q=80',
  },
];

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const users = [];
  for (const userData of USERS_DATA) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: hashedPassword,
      },
    });
    users.push(user);
  }

  let createdCount = 0;
  for (let i = 0; i < PUBLICATIONS_DATA.length; i++) {
    const owner = users[i % users.length];
    const pubData = PUBLICATIONS_DATA[i];

    const existing = await prisma.publication.findFirst({
      where: {
        title: pubData.title,
        userId: owner.id,
      },
    });

    if (!existing) {
      await prisma.publication.create({
        data: {
          ...pubData,
          userId: owner.id,
        },
      });
      createdCount++;
    }
  }

  console.log(
    `Seed completado: ${users.length} usuarios verificados y ${createdCount} publicaciones nuevas creadas.`
  );
}

main()
  .catch((error) => {
    console.error('Error ejecutando seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
