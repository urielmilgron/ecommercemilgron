import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import Counter from './Components/Counter/Counter'
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  // const handleOnAdd = (quantity)=>{
  //   console.log(`Se agregaron ${quantity} items`)
  // }

  return (
    <div className="App">
      {/* Envuelvo los componentes que interactuan con la url */}
      <BrowserRouter>
      <Navbar />
      {/* Defino los componentes que se muestran por condición */}
      <Routes>
        <Route path="/" element={<ItemListContainer greeting='Bienvenidos a nuestra Tienda!'/>}/>
        <Route path="/category/:categoryId" element={<ItemListContainer greeting='Filtrado'/>} />
        <Route path="/item/:productId" element={<ItemDetailContainer/>}/>
        <Route path='*' element={<h1>404 NOT FOUND</h1>} /> 
      {/* <Counter stock={10} onAdd={handleOnAdd}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
