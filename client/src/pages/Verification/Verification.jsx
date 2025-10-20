import React, { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'
import './Verification.css'
import axios from 'axios'

const Verification = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();

    const {url} = useContext(StoreContext)

    const verifyPayment = async()=>{
      try {
        console.log('Verifying payment with:', { success, orderId });
        const response = await axios.post(`${url}/api/order/verify`, {success, orderId})
        console.log('Verification response:', response.data);
        if(response.data.success){
          navigate('/myorders');
        }
        else{
          navigate('/')
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        // Navigate to home page on error
        navigate('/');
      }
    }
    useEffect(()=>{
      verifyPayment();
    },[])
  return (
    <div className='verify'>
        <div className="spinner">
            
        </div>
    </div>
  )
}

export default Verification