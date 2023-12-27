import React, { Fragment, useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom"

import {useDispatch , useSelector} from "react-redux"
import { clearerror, login, register, updateprofile } from "../../actions/useraction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import "./Updateprofile.css"
import { UPDATE_PROFILE_RESET } from "../../constants/usercnstants";
import { load } from "../../actions/useraction";

export const Updateprofile=()=>{
    
    const dispatch=useDispatch();
    const alert=useAlert();
    let Navigate=useNavigate();
    const {user }=useSelector((state)=>state.userDetails);
    const {error,isUpdated,loading}=useSelector((state)=>state.profile);
    const [users, setUser] = useState({
        name: user.name,
        email: user.email,
      });

      const { name, email, password } = users;
      const [avatar, setAvatar] = useState(user.avatar.url);
      const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);


      useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearerror());
          }
      
          if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(load());
      
            Navigate("/account");
      
            dispatch({
              type: UPDATE_PROFILE_RESET,
            });
          }
        }, [dispatch, error, alert,Navigate, isUpdated]);

      const registerSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        console.log(myForm);
        dispatch(updateprofile(myForm));
        
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








    return(
        <>
         <div className="LoginSignUpContainer">
               
               <div className="LoginSignin">
                
                <form
                        className="signUpForm"
                        // ref={registerTab}
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
                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="images/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input type="submit" value="Update" className="signUpBtn" />
                    </form>
            </div>
        </div>
        </>
    )
}