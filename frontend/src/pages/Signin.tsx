import { useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote"
import { SigninAuth } from "../components/SigninAuth"
import { useEffect } from "react";



export const Signin = () => {
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
                <SigninAuth />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
}