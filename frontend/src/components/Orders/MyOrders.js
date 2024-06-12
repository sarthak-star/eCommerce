import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderactions";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { MdLaunch } from "react-icons/md";

const MyOrders = () => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
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

        {
            field: "amount",
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
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <MdLaunch />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <Fragment>


            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <table className="myOrdersTable">
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.field}>{column.header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.id}>
                                    {columns.map((column) => (
                                        <td key={`${row.id}-${column.field}`}>{row[column.field]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p>{user?.name}'s Orders</p>
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;