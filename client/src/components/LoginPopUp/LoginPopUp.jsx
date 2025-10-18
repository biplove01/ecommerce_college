import React, {useEffect, useState} from 'react'
import './LoginPopUp.css'
import {assets} from '../../assets/assets'
import {BACKEND_URL} from "../../environment";

const LoginPopUp = ({setShowLogin}) => {

    const [currState, setCurrState] = React.useState("Login") // Sign Up or Login
    const [signedUp, setSignedUp] = useState(false);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState(null)
    const [shopName, setShopName] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [address, setAddress] = useState(null)


    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [shopTouched, setShopTouched] = useState(false);
    const [addressTouched, setAddressTouched] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        type: 'success',        // 'success' or 'error'
        title: '',
        message: ''
    });

    const backendUrl = BACKEND_URL;

    useEffect(() => {
        // on success (example)
        // showToast('success', 'Registered', 'Account created successfully');

        // on failure (example)
        // showToast('error', 'Registration failed', 'This email is already taken');

    }, []);


    const onSubmit = async (e) => {
        let apiEndpoint = backendUrl + "/api/auth";
        let userData = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            shopName: shopName,
            address: address,
        }

        if (currState === "Sign Up") {
            if (isSeller) {
                const response = await fetch(apiEndpoint + "/register/seller", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();

                if (response.status === 201) {
                    showToast("success", "Successfully Registered!", "Your Seller account is successfully registered.")
                    setCurrState("Login")
                } else {
                    showToast("error", "Registration failed", data.error || "Something went wrong!")
                }

                // console.log({"Response from backend": response})
            } else {
                const response = await fetch(apiEndpoint + "/register/customer", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                const data = await response.json();
                if (response.status === 201) {
                    showToast("success", "Successfully Registered!", "Your account is successfully registered.")
                } else {
                    showToast("error", "Registration failed", data.error || "Something went wrong!")
                }
            }

        } else {
            const response = await fetch(apiEndpoint + "/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            const data = await response.json();
            if (response.status === 200) {
                showToast("success", "Success!", "Successfully logged in.")
                sessionStorage.setItem("accessToken", "Bearer "+ data.accessToken);
                sessionStorage.setItem("userData", JSON.stringify(data));
                setTimeout(()=>{
                    window.location.href = "/"
                }, 500)
            } else {
                showToast("error", "Failed", data.error || "Failed to Log in!")
            }
        }
    }

    const showToast = (type, title, message, duration = 3000) => {
        setToast({show: true, type, title, message});
        setTimeout(() => setToast(prev => ({...prev, show: false})), duration);
    };


    return (
        <div className='login-popup'>

            {/* Toast bar  */}
            <div className={`toast-bar ${toast.type} ${toast.show ? 'visible' : ''}`} role="status">
                <div className="toast-content">
                    <strong className="toast-title">{toast.title}</strong> {/* short label */}
                    <span className="toast-message">{toast.message}</span> {/* short description */}
                </div>
                <button className="toast-close" onClick={() => setToast(prev => ({...prev, show: false}))}>✕</button>
            </div>

            <form className="login-popup-container">


                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => {
                        setShowLogin(false)
                    }} src={assets.cross_icon}/>
                </div>
                <div className="login-popup-inputs">
                    {/* Name */}
                    {currState === "Login" ? <></> :
                        <>
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => setNameTouched(true)}
                            />
                            {nameTouched && !name && <p className="warning-text">Name is required</p>}
                        </>
                    }

                    {/* Phone */}
                    {currState === "Login" ? <></> :
                        <>
                            <input
                                type="number"
                                placeholder="Phone number"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                onBlur={() => setPhoneTouched(true)}
                            />
                            {phoneTouched && (!phone || phone.toString().length !== 10) && (
                                <p className="warning-text">Enter valid 10-digit phone number</p>
                            )}
                        </>
                    }


                    {/* Email */}
                    <>
                        <input
                            type="email"
                            placeholder="Your Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setEmailTouched(true)}
                        />
                        {emailTouched && email && !/^\S+@\S+\.\S+$/.test(email) && (
                            <p className="warning-text">Enter valid email</p>
                        )}
                        {emailTouched && !email && <p className="warning-text">Email is required</p>}
                    </>

                    {/* Password */}
                    <>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setPasswordTouched(true)}
                        />
                        {passwordTouched && password && password.length < 6 && (
                            <p className="warning-text">Password must be at least 6 characters</p>
                        )}
                        {passwordTouched && !password && <p className="warning-text">Password is required</p>}
                    </>

                    {/* Address */}
                    {currState === "Login" ? <></> :
                        <>
                            <input
                                type="text"
                                placeholder="Your Address"
                                required
                                onChange={(e) => setAddress(e.target.value)}
                                onBlur={() => setAddressTouched(true)}
                            />

                            {addressTouched && !address && <p className="warning-text">Address is required</p>}
                        </>
                    }

                    {currState === "Login" ? <></> :
                        <div style={{marginTop: '8px'}}>
                            <label className="login-popup-condition">
                                <input type="checkbox" className="checkboxes" onChange={() => setIsSeller(!isSeller)}/>
                                <p>Are you a seller?</p>
                            </label>
                        </div>
                    }

                    {/* Shop Name */}
                    {isSeller && currState === "Sign Up" ?
                        <>
                            <input
                                type="text"
                                placeholder="Shop Name"
                                required
                                onChange={(e) => setShopName(e.target.value)}
                                onBlur={() => setShopTouched(true)}
                            />
                            {shopTouched && !shopName && <p className="warning-text">Shop name is required</p>}
                        </> :
                        <></>
                    }
                </div>
                <button type="button"
                        onClick={() => onSubmit()}>{currState === "Sign Up" ? "Create Account" : "Login"}</button>

                {
                    currState === "Login" ?
                        <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopUp
