import { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../common/Button";
import Input from "../common/Input";

const RegisterForm=()=>{

    const[name,setName]=useState("");

    const[email,setEmail]=useState("");

    const[password,setPassword]=useState("");

    const[loading,setLoading]=useState(false);

    const{

        registerUser,

        loginUser

    }=useContext(AuthContext);

    const navigate=useNavigate();

    const submit=async(e)=>{

        e.preventDefault();

        setLoading(true);

        try{

            const response=await registerUser({

                name,

                email,

                password

            });

            if(response.token){

                loginUser(response.token);

                navigate("/dashboard");

            }else{

                navigate("/");

            }

        }catch{

            alert("Registration Failed");

        }finally{

            setLoading(false);

        }

    };

    return(

        <form
            onSubmit={submit}
            className="space-y-6"
        >

            <div>

                <h2 className="text-3xl font-bold text-white">

                    Create Account

                </h2>

                <p className="text-gray-400 mt-2">

                    Join WebPilot

                </p>

            </div>

            <Input

                label="Full Name"

                value={name}

                placeholder="John Doe"

                onChange={(e)=>setName(e.target.value)}

            />

            <Input

                label="Email"

                type="email"

                value={email}

                placeholder="john@gmail.com"

                onChange={(e)=>setEmail(e.target.value)}

            />

            <Input

                label="Password"

                type="password"

                value={password}

                placeholder="Minimum 8 characters"

                onChange={(e)=>setPassword(e.target.value)}

            />

            <Button

                type="submit"

                loading={loading}

                className="w-full"

            >

                Create Account

            </Button>

            <p className="text-center text-gray-400">

                Already have an account?{" "}

                <Link

                    to="/"

                    className="text-[#D4AF37] hover:underline"

                >

                    Login

                </Link>

            </p>

        </form>

    );

};

export default RegisterForm;