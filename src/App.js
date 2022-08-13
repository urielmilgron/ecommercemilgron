import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'

import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


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
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
