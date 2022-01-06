import { createContext, useContext, useState } from "react";
import AuthService from "../service/AuthService";

const authContext = createContext();

import { server } from '../config';

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const loginWithGoogle = async () => {
        const { error, user } = await AuthService.loginWithGoogle();
        console.log("user (loginwithgoogle auth.js)", user);
        setUser(user ?? null);
        setError(error?.code ?? "");
    };

    const loginWithGithub = async () => {
        const { error, user } = await AuthService.loginWithGithub();
        console.log("loginWithGithub User: ", user);
        console.log("loginWithGithub Error: ", error);
        setUser(user ?? null);
        setError(error?.code ?? null);
        return { authError: error ?? null, authUser: user ?? null }
    }

    const loginWithPassword = async ({ email, password }) => {
        const { error, user } = await AuthService.loginWithPassword({ email, password });
        setUser(user ?? null);
        setError(error ?? "");
        return { authError: error ?? null }
    };

    const createUser = async ({ email, password, fullname, username }) => {
        const { error, user } = await AuthService.createUser({ email, password, fullname, username }); // dont forget to put username here next time
        setUser(user ?? null);
        setError(error ?? "");
        return { authError: error ?? null, authUser: user ?? null }
    }

    const updateUser = async ({ uid, fullname, username }) => {
        const data = await fetch(`${server}/api/reg`, {
            'Content-Type': 'application/json',
            method: "POST",
            body: JSON.stringify({ uid, fullname, username }),
        }).then(response => response.json());

        if (data.success) {
            return { success: true }
        } else {
            return { error: data }
        }
    }

    const editUser = async ({ uid, fullname, username, bio }) => {
        const data = await fetch(`${server}/api/editProfile`, {
            'Content-Type': 'application/json',
            method: "POST",
            body: JSON.stringify({ uid, fullname, username, bio }),
        }).then(response => response.json());

        if (data.success) {
            return { success: true }
        } else {
            return { success: false, error: data }
        }
    }

    const uploadAvatar = async ({ avatar, uid }) => {
        const res = await AuthService.uploadAvatar({ avatar, uid });
        return res;
    }

    const createWorkspace = async ({ title, desc }) => {
        const res = await AuthService.createWorkspace({ title, desc });
        return res;
    }

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
    }

    const getIdToken = async () => {
        const token = await AuthService.getIdToken();
        return token;
    }

    const deleteWorkspace = async ({ id }) => {
        const res = await AuthService.removeWorkspace({ id });
        return res;
    }

    const value = { authUser: user, authError: error, loginWithGoogle, loginWithPassword, uploadAvatar, loginWithGithub, editUser, updateUser, logout, setUser, createUser, createWorkspace, getIdToken, deleteWorkspace };

    return <authContext.Provider value={value} {...props} />
}