import React, { useState ,useEffect} from "react";
import { Link ,useParams} from "react-router-dom"
import "./Updatepassword.css"
import { useDispatch, useSelector } from "react-redux"
import { clearerror,  resetPassword } from "../../actions/useraction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
//import "./Updateprofile.css"
import { UPDATE_PASSWORD_RESET, UPDATE_PROFILE_RESET } from "../../constants/usercnstants";
import { load } from "../../actions/useraction";


export const Resetpassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    let Navigate = useNavigate();
    const {token}=useParams();
    const [password,setpassword]=useState("Password");
    const [confirmpassword,setconfirmpassword]=useState("Password");
    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
      );
    const resetsubmit=(e)=>{
        e.preventDefault();

        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmpassword", confirmpassword);
    
        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearerror());
        }
    
        if (success) {
          alert.success("Password Updated Successfully");
          Navigate("/login");
        }
      }, [dispatch, error, alert, Navigate, success]);

    return (
        <>
            <div className="LoginSignUpContainer">

                <div className="LoginSignin">

                    <form className="loginForm" onSubmit={resetsubmit} >

                        <div className="signUpPassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="newpassword"
                                value={password}
                                // onChange={registerDataChange}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>
                        <div className="signUpPassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                placeholder="confirmPassword"
                                required
                                name="confirmpassword"
                                value={confirmpassword}
                                // onChange={registerDataChange}
                                onChange={(e) => setconfirmpassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Update" className="signUpBtn" />
                    </form>

                </div>
            </div>
        </>
    )
}