import "./Item.css";
//Importamos Link para setear una url
import { Link } from "react-router-dom";

const Item = ({ id, name, img, stock }) => {
  return (
    <div className="Card">
      <div className="TitleCard">
        <h4 className="title">{name}</h4>
      </div>
      <div className="ImgCard">
        <img src={img} alt={name}></img>
      </div>
      {/* Le seteamos la url al botón ver detalle */}
      <div className="StockCard">STOCK: {stock}</div>
      <div className="ButtonCard">
        <Link to={`/item/${id}`} className="ButtonDetails">
          VER DETALLES
        </Link>
      </div>
      
    </div>
  );
};

export default Item;

//CHECK
