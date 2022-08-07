//ItemDetail determina el formato de la tarjeta.
import './ItemDetail.css'
const ItemDetail = ({name, price, description, img}) => {
    return (
        <div className='main'>
        <h2 className="title titleDetail">{name}</h2>
        <div className='divDetail'>
            <div className='detailImg'><img className='detailImage' src={img}/></div>
            <div className='divDandP'>
           <div className='detailDescription'><p>{description}</p></div>
          <div className='detailPrice'><h3>${price}</h3></div>
          </div>
        </div>
        </div>
        )
        
}

export default ItemDetail
//CHECK