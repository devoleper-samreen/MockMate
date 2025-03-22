import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/user.store";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function ProtectedRoute() {
    const { user } = useAuthStore();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!user) {
            setIsModalVisible(true);
            setTimeout(() => {
                setIsModalVisible(false);
                setRedirect(true);
            }, 3000);
        }
    }, [user]);

    if (redirect) return <Navigate to="/" />;

    return (
        <>
            <Modal
                open={isModalVisible}
                footer={null}
                closable={false}
                centered
                width={400}
                style={{
                    textAlign: "center",
                    borderRadius: "12px",
                    padding: "20px",
                }}
                bodyStyle={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ExclamationCircleOutlined
                    style={{
                        fontSize: "50px",
                        color: "#faad14",
                        marginBottom: "10px",
                    }}
                />
                <h2
                    style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#333",
                    }}
                >
                    Access Denied!
                </h2>
                <p
                    style={{
                        fontSize: "16px",
                        color: "#666",
                        marginBottom: 0,
                    }}
                >
                    You are not logged in. Please log in first.
                </p>
            </Modal>
            {user && <Outlet />}
        </>
    );
}

export default ProtectedRoute;
