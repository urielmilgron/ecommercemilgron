import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import Counter from './Components/Counter/Counter'

function App() {
  const handleOnAdd = (quantity)=>{
    console.log(`Se agregaron ${quantity} items`)
  }

  return (
    <div className="App">
      <Navbar />
      <ItemListContainer greeting='Bienvenidos a nuestra Tienda!'/>
      <Counter stock={10} onAdd={handleOnAdd}/>
    </div>
  );
}

export default App;
