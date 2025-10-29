import React, {useContext} from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'

const FoodItem = ({id, name, price, description, image}) => {

  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-image' src={url+"/images/"+image} alt={name} />
            {/*<img className='food-item-image' src={image} alt={name} />*/}
            {!cartItems[id]
                ? <img src={assets.add_icon_white} alt="" onClick={()=>addToCart(id)} className='add'/>
                :<div className="food-item-counter">
                 <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="remove" className='counter-icon'/>
                <p>{cartItems[id]}</p>
                <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="add" className='counter-icon'/>
                </div>
            
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="rating" />
            </div>
            <p className='food-item-description'>{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem
