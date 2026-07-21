import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../api/authApi";
import Button from "../common/Button";
import Input from "../common/Input";

const LoginForm = () => {

  const [email,setEmail]=useState("");

  const [password,setPassword]=useState("");

  const [loading,setLoading]=useState(false);

  const {loginUser}=useContext(AuthContext);

  const navigate=useNavigate();

  const handleSubmit=async(e)=>{

    e.preventDefault();

    setLoading(true);

    try{

      const response=await login({
        email,
        password
      });

      loginUser(response.token);

      navigate("/dashboard");

    }catch{

      alert("Invalid Credentials");

    }finally{

      setLoading(false);

    }

  };

  return(

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>

        <h2 className="text-3xl font-bold text-white">

          Welcome Back

        </h2>

        <p className="text-gray-400 mt-2">

          Login to continue

        </p>

      </div>

      <Input

        label="Email"

        type="email"

        placeholder="Enter email"

        value={email}

        onChange={(e)=>setEmail(e.target.value)}

      />

      <Input

        label="Password"

        type="password"

        placeholder="Enter password"

        value={password}

        onChange={(e)=>setPassword(e.target.value)}

      />

      <Button

        type="submit"

        loading={loading}

        className="w-full"

      >

        Login

      </Button>

      <p className="text-center text-gray-400">

        Don't have an account?{" "}

        <Link

          to="/register"

          className="text-[#D4AF37] hover:underline"

        >

          Register

        </Link>

      </p>

    </form>

  );

};

export default LoginForm;