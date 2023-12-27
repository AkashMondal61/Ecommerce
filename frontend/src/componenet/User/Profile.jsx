import React, { Fragment, useEffect } from "react";
import "./Profile.css"
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { clearerror } from "../../actions/productaction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { load } from "../../actions/useraction";
export const Profile = () => {

    const Alert = useAlert();
    const dispatch = useDispatch();
    let Navigate = useNavigate();
    const { loading, isAuthenticated, user, error } = useSelector(state => state.userDetails)
    useEffect(() => {
     
        console.log("called in profile")
        if (!isAuthenticated) {
            console.log(isAuthenticated);  
            console.log("aa");
            Navigate("/login");
            Alert.error(error);
            //    dispatch(clearerror( )); 
        }
        
    }, [Alert, isAuthenticated, dispatch,Navigate])

    return (
        <>
            {loading ? ( 
                <Loader/>
            ) : (
        <>
                    {/* <MetaData title={`${user.name}'s Profile`} /> */}
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            {isAuthenticated?(<img src={user.avatar.url} alt={user.name} />):(<h></h>)}
                     {/* <img src={user.avatar.url} alt={user.name} /> */}
                            <Link to="/me/updateprofile">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Role</h4>
                                <p>{user.role}</p>
                            </div>
                            {/* <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div> */}

                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/updatepassword">Change Password</Link>
                            </div>
                        </div>
                    </div>
                    </>
      )}
                    </>
                    )
}