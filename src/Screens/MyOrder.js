import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

  

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myorderData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: localStorage.getItem("userEmail"),
                }),
            });
            const data = await response.json();
            const filteredOrderData = data.orderData.order_data.filter(order => order.name); // Filter out empty orders
            setOrderData(filteredOrderData || []);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };
    

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="row">
                    {orderData.map((arrayData, index) => (
                        <div className="col-12 col-md-6 col-lg-3" key={index}>
                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{arrayData.name}</h5>
                                    <div className="container w-100 p-0" style={{ height: "38px" }}>
                                        <span className="m-1">{arrayData.qty}</span>
                                        <span className="m-1">{arrayData.size}</span>
                                        {/* Render other relevant data here */}
                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                            ₹{arrayData.price}/-
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: "80vh" }}>
                <Footer />
            </div>
        </div>
    );
}


