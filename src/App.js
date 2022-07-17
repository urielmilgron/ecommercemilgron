import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'

function App() {
  return (
    <div className="App">
      <Navbar />
      <ItemListContainer greeting='Bienvenidos a nuestra Tienda!'/>
    </div>
  );
}

export default App;
