import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'

import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import {CartContextProvider} from './Components/Context/CartContext'
import Cart from './Components/Cart/Cart';


function App() {
 


  return (
    <div className="App">
      {/* Envuelvo los componentes dentro del contexto para que tengan acceso a este */}
      <CartContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ItemListContainer greeting='Bienvenidos a nuestra Tienda!' />} />
            <Route path="/category/:categoryId" element={<ItemListContainer greeting='Filtrado' />} />
            <Route path="/item/:productId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </BrowserRouter>
        </CartContextProvider>
    </div>
  );
}

export default App;
