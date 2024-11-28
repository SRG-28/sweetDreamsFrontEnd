"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUserForm from "./components/EditUserForm";

const UserEditPage = ({ params }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Asegúrate de que params.id sea un número (si es necesario)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND_USERS_URL}/${params.id}`);
                if (response.data) {
                    setUser(response.data);
                } else {
                    console.error("User not found in response");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    return <EditUserForm user={user} />;
};

export default UserEditPage;
