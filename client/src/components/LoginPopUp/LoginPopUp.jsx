import React, { useContext } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets.js'
import axios from 'axios'
import { StoreContext } from '../../context/storeContext'

const LoginPopUp = ({setShowLogin}) => {

    const {url, token, setToken} = useContext(StoreContext);

    const [currState, setCurrState] = React.useState("Sign Up")
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value})
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        }
        else{
            newUrl += "/api/user/register";
        }
        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success){
               setToken(response.data.token);
               localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            }
            else{
                alert(response.data.message)
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Server connection failed. Make sure server is running on port 4000.");
        }
    }


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={() => {setShowLogin(false)}} src={assets.cross_icon} />
            </div>
            <div className="login-popup-inputs">
                {currState === "Login"?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required/>
            </div>
            <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </div>
            {currState === "Login"? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
            :<p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p> }
        </form>
    </div>
  )
}

export default LoginPopUp