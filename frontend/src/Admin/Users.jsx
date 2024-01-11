import React, { Fragment, useEffect } from "react";
import { DataGrid,  GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector, } from '@mui/x-data-grid';
import "./User.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {Sidebar} from "./Sidebar";
import { allorder, clearerror, deleteOrder } from "../actions/Orderaction";
import { DELETE_ORDER_RESET } from "../constants/Orderconstants";
import { alluser } from "../actions/useraction";
//import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../componenet/layout/Loader/Loader";

export const Users = ({ history }) => {
  const dispatch = useDispatch();
  const Navigate=useNavigate();
  const alert = useAlert();



  const {error,loading,users}=useSelector((state)=>state.allUser)

  const deleteOrderHandler = (id) => {
    // dispatch(deleteOrder(id));

    // if (success) {
    //     console.log("ncjd");
    //   console.log(`${success}`)
    //   alert.success("Order Deleted Successfully");
    //   Navigate("/allorder");
    //   dispatch({ type: DELETE_ORDER_RESET});
    // }
  };

  useEffect(() => {
    console.log("used")  
    if (error) {
      alert.error(error);
      dispatch(clearerror());
    }

    // if (success) {
    //     console.log("ncjd");
    //   console.log(`${success}`)
    //   alert.success("Order Deleted Successfully");
    //   Navigate("/allorder");
    //   dispatch({ type: DELETE_ORDER_RESET});
    // }

    dispatch(alluser());
  }, [dispatch, alert, error,Navigate]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 300, flex: 1 },
    {
        field: "Name",
          headerName: "Name",
          type: "String",
          minWidth: 150,
          flex: 0.3,
    },
    {
    field: "Role",
    headerName: "Role",
    minWidth: 150,
    flex: 0.5,
    cellClassName: (params) => {
      return   params.row.status === "Admin"
      ? "greenColor"
      : "redColor";
     
      },
    },
   
    // { field: "amount",
    // headerName: "Amount",
    // type: "number",
    // minWidth: 270,
    // flex: 0.5,
    // },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/order/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.row.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users&&
  users.forEach((item) => {
      rows.push({
        id: item._id,
        Name: item.name,
        Role: item.role ,
      });
    });
    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
          </GridToolbarContainer>
        );
      }
  return (
    <>
   
        <Fragment>
  
        <div className="con">
          <div className="leftbox">
          <Sidebar />
          </div>
          <div className="productListContainer">
            <h1 id="productListHeading">ALL ORDERS</h1>
            <div className="myorderpages">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              slots={{
                  toolbar: CustomToolbar,
                }}
            />
            </div>
          </div>
        </div>
      </Fragment>
   </>
  );
};

