//Creo un array de productos como si fuese a pedirle datos a una api.
const products = [
  {
    id: "1",
    name: "Mesa Comedor",
    price: 15000,
    category: "Comedor",
    img:'https://pngimg.com/uploads/table/table_PNG6976.png',
    stock: 3,
    description: "Mesa de fibrofácil para comedor",
  },
  {
    id: "2",
    name: "Silla",
    price: 5000,
    category: "Comedor",
    img:'https://www.seekpng.com/png/detail/985-9852482_cuzco-silla-de-caoba-silla-de-caoba-png.png',
    stock: 10,
    description: "Silla para comedor súper cómoda",
  },
  {
    id: "3",
    name: "Matera",
    price: 2000,
    category: "Exterior",
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIBW4BZbJ7--mUFXbS0uy7TEgpJZUeAGJNu_V2xrTMZ6tkt5ZaILS0dhFdstIzRE2EbVQ&usqp=CAU',
    stock: 20,
    description: "Silloncito para exterior o interior",
  },
];
//La función getProducto retorna una promesa, que si se resuelve, manda el array.
export const getProduct = () => {
return new Promise((resolve)=>{
setTimeout(()=>{
    resolve(products)
},2000) //Simulo una espera de 2 seg.
})
}