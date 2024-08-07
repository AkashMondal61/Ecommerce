import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import "./Login.css"
import { useDispatch, useSelector } from "react-redux"
import { clearerror, login, register, gsign } from "../../actions/useraction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, isAuthenticated } = useSelector((state) => state.userDetails);
  const logintab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginemail, setLoginemail] = useState("");
  const [loginpassword, setLoginpassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    name: name,
    email: email,
    password: password,
  });
  //   const { name, email, password } = user;
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  //  const redirect=location.search?location.search.split("=")[1] :"/account" ;
  const loginSubmit = (e) => {
    console.log("submitted");
    e.preventDefault();

    dispatch(login(loginemail, loginpassword));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearerror());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, alert, error, isAuthenticated])
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
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    // myForm.set("")
    console.log("register");

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
  //for google
  const handleGoogleAuth = () => {
    try {
      window.location.href = `${window.location.origin}/auth/google/callback`
    } catch (err) {
      // toast.error(err?.data?.message || err.error)
      console.log(error);

    }
  }
  return (
    <Fragment>

      <div className="LoginSignUpContainer">

        <div className="LoginSignin">

          <div className="head">
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
                placeholder="Email"
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
            <Link to="/forgotpassword">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
            <button class="login-button" onClick={handleGoogleAuth}>
    <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
    <span >Login with Google</span>
  </button>
           
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
                onChange={(e) => setName(e.target.value)}
                // onChange={registerDataChange}
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
                // onChange={registerDataChange}
              onChange={(e) => setEmail(e.target.value)}
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
                // onChange={registerDataChange}
              onChange={(e) => setPassword(e.target.value)}
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

            {/* <button type="button" className="autofill" onClick={() => dispatch(gsign)}>click</button> */}

          </form>
        </div>
      </div>
    </Fragment >
  )
}
export default Login;