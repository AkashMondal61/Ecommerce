import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import "./Updatepassword.css"
import { useDispatch, useSelector } from "react-redux"
import { clearerror, login, register, updateprofile,updatepassword } from "../../actions/useraction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
//import "./Updateprofile.css"
import { UPDATE_PASSWORD_RESET, UPDATE_PROFILE_RESET } from "../../constants/usercnstants";
import { load } from "../../actions/useraction";


export const Updatepassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    let Navigate = useNavigate();
    const { user } = useSelector((state) => state.userDetails);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const [oldpassword,setoldpassword]=useState("");
    const [newpassword,setnewpassword]=useState("");

    const [confirmpassword,setconfirmpassword]=useState("CPassword");
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearerror());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");
            dispatch(load());

            Navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, Navigate, isUpdated]);

    const passsubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("oldpassword", oldpassword);
        myForm.set("newpassword", newpassword);
        myForm.set("confirmpassword", confirmpassword);
    
        dispatch(updatepassword(myForm));
      };
    return (
        <>
            <div className="LoginSignUpContainer">

                <div className="LoginSignin">
                 
                <form className="loginForm" onSubmit={passsubmit} >
                  
                    <div className="signUpPassword">
                        {/* <LockOpenIcon /> */}
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            name="oldpassword"
                            value={oldpassword}
                        // onChange={registerDataChange}
                        onChange={(e) => setoldpassword(e.target.value)}
                        />
                    </div>
                    <div className="signUpPassword">
                        {/* <LockOpenIcon /> */}
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            name="newpassword"
                            value={newpassword}
                        // onChange={registerDataChange}
                        onChange={(e) => setnewpassword(e.target.value)}
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