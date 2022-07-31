import './Item.css'

const Item = ({product})=>{

    return (
        <div className='Card'>
        <div className='TitleCard'><h4 className='title'>{product.name}</h4></div>
        <div className='ImgCard'><img src={product.img} alt={product.name}></img></div>
        <div className='ButtonCard'><button className='ButtonsCategory ButtonDetails'>Ver detalles</button></div>
        <div className='StockCard'>Stock: {product.stock}</div>
        </div>
    )
}

export default Item;