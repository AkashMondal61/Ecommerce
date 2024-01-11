import React, { useEffect } from "react";
import Loader from "../componenet/layout/Loader/Loader";
import { DataGrid,  GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector, } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearerror } from "../actions/productaction";
import { myOrder } from "../actions/Orderaction";
import "./Myorder.css"
import { Link } from "react-router-dom";
import "./Myorder.css"
import AdsClickIcon from '@mui/icons-material/AdsClick';


export const Myorder=()=>{
    const dispatch=useDispatch();
    const Alert=useAlert();
    const {user}=useSelector(state=>state.userDetails)
    const {loading,order,error}=useSelector((state)=>state.myOrders)
    const columns=[
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
          <Link to={`/order/${params.row.id}`}>
            <AdsClickIcon/>
          </Link>
        );
      },
}]
    const rows=[]
    order &&
    order.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalprice,
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
    useEffect(()=>{
     if(error)
     {
        Alert.error(error)
        clearerror();
     }
     dispatch(myOrder());
    },[dispatch,Alert,error])
    return(
        <>
        {loading?(
            <Loader/>
        ):(
            <div>
            <div className="headline">
            <p>{user.name}'s Orders</p>
            {/* <div className="line"></div> */}
            </div>
            <div className="myorderpage">
                <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
            slots={{
                toolbar: CustomToolbar,
              }}
          />

            </div>
            </div>
        )}
        </>
    )
} 