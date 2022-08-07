//Creo un array de productos como si fuese a pedirle datos a una api.
const products = [
  {
    id: "1",
    name: "Mesa Comedor",
    price: 15000,
    category: 'mesas',
    img: 'https://pngimg.com/uploads/table/table_PNG6976.png',
    stock: 3,
    description: "Una mesa es un mueble compuesto por un mínimo de una tabla lisa que es sostenida por una o más patas (también llamadas pies).",
  },
  {
    id: "2",
    name: "Silla",
    price: 5000,
    category: "sillas",
    img: 'https://www.seekpng.com/png/detail/985-9852482_cuzco-silla-de-caoba-silla-de-caoba-png.png',
    stock: 10,
    description: "La silla (del latín sella) es un mueble que suele tener un respaldo, generalmente cuenta con tres o cuatro apoyos y su finalidad es la de servir de asiento a una persona. ​ Las sillas pueden estar elaboradas con diferentes materiales: madera, hierro, forja, plástico o una combinación de varios de ellos.",
  },
  {
    id: "3",
    name: "Matera",
    price: 2000,
    category: "exterior",
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIBW4BZbJ7--mUFXbS0uy7TEgpJZUeAGJNu_V2xrTMZ6tkt5ZaILS0dhFdstIzRE2EbVQ&usqp=CAU',
    stock: 20,
    description: " Las sillas materas son ideales para ese rincón del hogar donde disfrutás de las mejores tardes de mates con amigos.",
  },
];
//La función getProducto retorna una promesa, que si se resuelve, manda el array.
export const getProduct = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 2000) //Simulo una espera de 2 seg.
  })
}
export const getProductByCategory = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter(prod => prod.category === categoryId))
    }, 2000)
  })
}
//Simulo llamado a una API por ID
export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(prod => prod.id === id))
    }, 2000);
  })
}

