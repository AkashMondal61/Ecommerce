import React, { Fragment, useEffect, useState ,useRef} from "react";
import "./loggidin.css";
import { Person, Dashboard, ShoppingCart, ExitToApp, ListAlt } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/useraction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

export const LoggedinUser = ({ user }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "Profile", func: account },
    { icon: <ShoppingCart />, name: "Cart", func: cart },
    { icon: <ExitToApp />, name: "Log out", func: logouts },
  ];

  if (user.role === "admin") {
    options.unshift({ icon: <Dashboard />, name: "Dashboard", func: dashboard });
  }

  function orders() {
    navigate("/myorders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/Cart");
  }

  function logouts() {
    dispatch(logout());
    navigate("/");
    alert.success("Logged out");
  }

  function dashboard() {
    navigate("/dashboard");
  }

  return (
    <Fragment>
      <div className="App">
        <div className="menu-container" ref={menuRef}>
          <div className="menu-trigger" onClick={() => setOpen(!open)}>
            <img src={user.avatar.url} alt="User Avatar" />
          </div>

          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <h3>{user.name}<br /><span>Website Designer</span></h3>
            <ul onClick={() => setOpen(!open)}>
              {options.map((item) => (
                <DropdownItem key={item.name} img={item.icon} text={item.name} fun={item.func} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function DropdownItem(props) {
  return (
    <li className="dropdownItem" onClick={props.fun}>
      <span>{props.img}</span>
      <a>{props.text}</a>
    </li>
  );
}