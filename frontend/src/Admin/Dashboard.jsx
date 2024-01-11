import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import "./Dashboard.css"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearerror, getproductadmin } from "../actions/productaction";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
  

import { Doughnut, Line } from "react-chartjs-2";
import { allorder } from "../actions/Orderaction";
 export const Dashboard=()=>{
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      )
   
      const dispatch=useDispatch();
      const Alert=useAlert();
      const{loading,error,products}=useSelector((state)=>state.allproducts)
      const { error:allerror, allOrder } = useSelector((state) => state.AllOrder);
      useEffect(()=>{
          if(error)
          {
            Alert.error(error);
            clearerror();
          }
          if(allerror)
          {
            Alert.error(allerror);
            clearerror();
          }
          dispatch(getproductadmin());
          dispatch(allorder());
      },[dispatch, alert, error,allerror])
      let amount=0;
      allOrder&&allOrder.map((item)=>
      amount+=item.totalprice
      )
      const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, amount],
          },
        ],
      };
    return (
        <>
        <div className="dashboard">
        <div className="fix">
          <Sidebar />
          </div>

       <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> {amount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{allOrder.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>213</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        {/* <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div> */}
      </div>
    </div>

        </>
    )
 }