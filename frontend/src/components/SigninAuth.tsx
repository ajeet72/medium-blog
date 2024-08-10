import { Link, useNavigate } from "react-router-dom";
import { InputBox } from "./InputBox";
import { useState } from "react";
import { SigninInput } from "@ajeetkumarnpm/medium-common-final";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SigninAuth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function SigninRequest() {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const jwt = await response.data.jwt;
            if (jwt) {
                localStorage.setItem("token", jwt);
                navigate("/blogs");
            } else {
                setError("Email / password is incorrect");
            }
        } catch (error) {
            setError("Email / password is incorrect");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white flex justify-center h-screen flex-col text-center">
            <div className="flex justify-center h-screen flex-col text-center">
                <div>
                    <div className="text-4xl font-bold">
                        Sign In
                    </div>
                    <div className="text-slate-500 m-4">
                        Don't have an account?
                        <Link className="underline pl-2" to={"/signup"}>Sign up</Link>
                    </div>
                </div>
                <div>
                    <InputBox label="Email" placeholder="enter your email" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        });
                    }} />
                </div>
                <div>
                    <InputBox label="Password" placeholder="enter your password" type="password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        });
                    }} />
                </div>
                {
                    error ? <Warn message={error} /> : ""
                }
                <div className="ml-2 mt-8">
                    <button onClick={SigninRequest} type="button" className="w-96 text-white bg-gray-800 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        {loading ? 'Loading...' : 'Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
}


const Warn = ({message} : {message: string}) => {
    return <div className="pt-6 text-red-600 mr-20 pr-24">
        {message}
    </div>
}
