import React, { Fragment, useEffect, useState ,useRef} from "react";
import "./loggidin.css";
import { Person } from "@material-ui/icons";
import { Dashboard ,ShoppingCart} from "@material-ui/icons";
import { ExitToApp } from "@material-ui/icons";
import { ListAlt } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/useraction"
import { useDispatch  } from "react-redux";
import { useAlert } from "react-alert";

export const LoggedinUser=({user})=>{
  const navigate=useNavigate();
  const alert=useAlert();
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();
    let menuRef = useRef();
    
    useEffect(() => {
      let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
          setOpen(false);
        }      
      };
  
      document.addEventListener("mousedown", handler);
  
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
  
    });

    const option =[
      {icon:<ListAlt/>,name:"Orders",func:orders},
      {icon:<Person/>,name:"Profile",func:account},
      {icon:<ShoppingCart/>,name:"Cart",func:cart},
      {icon:<ExitToApp/>,name:"Log out",func:logouts},
    ]
    if(user.role==="admin")
    {
      option.unshift({icon:<Dashboard/>,name:"Dashboard",func:dashboard})
    }
    function orders(){
     navigate("/myorders")
    }
    function account(){
      navigate("/account")
    }
    function cart(){
      navigate("/Cart")
     }
    function logouts(){
      dispatch(logout());
      console.log("loggedinuser")
      alert.success("Logged out successfully")
      navigate("/");
    } 
    function dashboard(){
      navigate("/dashboard"); 
    }
return( <Fragment>
     <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={user.avatar.url}></img>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>Akash Mondal<br/><span>Website Designer</span></h3>
          <ul onClick={()=>{setOpen(!open)}}>
            {option.map((item)=>(<DropdownItem img={item.icon} text={item.name} fun={item.func}/>))}
          </ul>
        </div>
      </div>
    </div>
</Fragment>)
}
function DropdownItem(props){
    return(
      <li className = 'dropdownItem' onClick={props.fun} >
        <span>{props.img}</span>
        <a> {props.text} </a>
      </li>
    );
  }
   