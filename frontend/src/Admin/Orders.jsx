import React, { Fragment, useEffect } from "react";
import { DataGrid,  GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector, } from '@mui/x-data-grid';
import "./Orders.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {Sidebar} from "./Sidebar";
import { allorder, clearerror, deleteOrder } from "../actions/Orderaction";
import { DELETE_ORDER_RESET } from "../constants/Orderconstants";
//import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

export const Orders = ({ history }) => {
  const dispatch = useDispatch();
  const Navigate=useNavigate();
  const alert = useAlert();

  const { error, allOrder } = useSelector((state) => state.AllOrder);

  const { error: deleteError, success } = useSelector((state) => state.deleteorder);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));

    if (success) {
        console.log("ncjd");
      console.log(`${success}`)
      alert.success("Order Deleted Successfully");
      Navigate("/allorder");
      dispatch({ type: DELETE_ORDER_RESET});
    }
  };

  useEffect(() => {
    console.log("used")  
    if (error) {
      alert.error(error);
      dispatch(clearerror());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearerror());
    }

    if (success) {
        console.log("ncjd");
      console.log(`${success}`)
      alert.success("Order Deleted Successfully");
      Navigate("/allorder");
      dispatch({ type: DELETE_ORDER_RESET});
    }

    dispatch(allorder());
  }, [dispatch, alert, error,Navigate,deleteError]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
    field: "status",
    headerName: "Status",
    minWidth: 150,
    flex: 0.5,
    cellClassName: (params) => {
      return   params.row.status === "Delivered"
      ? "greenColor"
      : "redColor";
     
      },
    },
    {
        field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
    },
    { field: "amount",
    headerName: "Amount",
    type: "number",
    minWidth: 270,
    flex: 0.5,
    },
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

  allOrder &&
    allOrder.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalprice ,
        status: item.orderStatus,
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
    <Fragment>
      {/* <MetaData title={`ALL ORDERS - Admin`} /> */}

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
  );
};

