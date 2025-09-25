import React, {useState} from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'

const FoodItem = ({id, name, price, description, image}) => {

  const [itemCount, setItemCount] = useState(0);

  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-image' src={image} alt={name} />
            {!itemCount 
                ? <img src={assets.add_icon_white} alt="" onClick={()=>setItemCount(prev=>prev+1)} className='add'/>
                :<div className="food-item-counter">
                 <img src={assets.remove_icon_red} onClick={()=>setItemCount(prev=>prev-1)} alt="remove" className='counter-icon'/>
                <p>{itemCount}</p>
                <img src={assets.add_icon_green} onClick={()=>setItemCount(prev=>prev+1)} alt="add" className='counter-icon'/>
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