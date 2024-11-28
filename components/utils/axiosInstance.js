// utils/axiosInstance.js
"use client";

import axios from 'axios';
import {getSession} from "next-auth/react";

/**
 * axiosInstance is a pre-configured axios client instance that is ready to make authenticated requests to your API.
 * @type {axios.AxiosInstance}
 */

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}`, // API base URL
});

axiosInstance.interceptors.request.use(async config => {
    const session = await getSession(); // Obtener sesión en el cliente
    if (session?.user?.token) {
        console.log("Interceptor: Token encontrado", session.user.token);
        config.headers.Authorization = `Bearer ${session.user.token}`;
    } else {
        console.log("Interceptor: Token no encontrado");
    }
    return config;
});

export default axiosInstance;