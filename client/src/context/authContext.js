import { createContext, useEffect, useState } from "react"; 
import axios from "axios";

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
// Kako user koristimo na više elemenata naše stranice spremamo ga u context, isto tako i login i logout :)
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=> {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async(inputs) => {
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs,{ 
            withCredentials: true 
        });
        setCurrentUser(res.data);
    };

    const logout = async(inputs) => {
        await axios.post("http://localhost:8800/api/auth/logout", { 
            withCredentials: true 
        });
        setCurrentUser(null);
    };
    //The useEffect Hook allows you to perform side effects in your components.
    //Some examples of side effects are: fetching data, directly updating the DOM, and timers.
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);

    return <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
};