import { useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote"
import { SignupAuth } from "../components/SignupAuth"
import { useEffect } from "react";


export const Signup = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            navigate("/blogs")
        }
    })
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SignupAuth />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
}