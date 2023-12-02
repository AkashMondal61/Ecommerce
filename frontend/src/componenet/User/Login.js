import React, { Fragment, useEffect, useRef, useState } from "react";
import MailOutlineIcon from "react-icons"
import FaceIcon from "@material-ui/icons"
import LockOpenIcon from "@material-ui/icons"
import {Link} from "react-router-dom"
import "./Login.css"
import {useDispatch , useSelector} from "react-redux"
import { clearerror, login, register } from "../../actions/useraction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    let navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert();
    const {loading,error,isAuthenticated }=useSelector((state)=>state.userDetails);
    const logintab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginemail,setLoginemail]=useState("Email");
    const [loginpassword,setLoginpassword]=useState("Password");
    //for register
    // const [name,setName]=useState("Name");
    // const [email,setEmail]=useState("Email");
    // const [password,setPassword]=useState("Password");
    // const[image,setImage]=useState();
    //
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
      });
      const { name, email, password } = user;
      const [avatar, setAvatar] = useState("../../images/Profile.png");
      const [avatarPreview, setAvatarPreview] = useState("../../images/Profile.png");

    const loginSubmit=(e)=>{
        console.log("submitted");
        e.preventDefault();
       
        dispatch(login(loginemail,loginpassword));
    }

     useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(clearerror());
        }
        if( isAuthenticated)
        {
          navigate("/account") ;
        }
        
    },[dispatch,alert,error,isAuthenticated])
    const switchTable = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          logintab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          logintab.current.classList.add("shiftToLeft");
        }
      };
      const registerSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        console.log(myForm);
        dispatch(register(myForm));
        
      }

      const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };

    return (
        <Fragment>
            <div className="LoginSignUpContainer">
                
                <div className="LoginSignin">
                 
                    <div>
                        <div className="login_signup_toggel">
                            <p onClick={(e) => switchTable(e, "login")}>Login</p>
                            <p onClick={(e) => switchTable(e, "register")}>Register</p>
                        </div>
                        <button ref={switcherTab} ></button>

                    </div>
                    <form className="loginForm" ref={logintab} onSubmit={loginSubmit}>
                        {/* <MailOutlineIcon /> */}
                        <div className="loginEmail">
                            <input
                                type="email"
                                placeholder="email"
                                required
                                value={loginemail}
                                onChange={(e) => setLoginemail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                placeholder="password"
                                required
                                value={loginpassword}
                                onChange={(e) => setLoginpassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forget Password ?</Link>
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                            {/* <FaceIcon /> */}
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                // onChange={(e) => setName(e.target.value)}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            {/* <MailOutlineIcon /> */}
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                           <div className="signUpPassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                            </div>
                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="images/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
        </div>
        </Fragment >
    )
}
export default Login;