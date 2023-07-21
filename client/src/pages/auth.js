import "./auth.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [mode, setMode] = useState(true);

  return (
    <div className="authWrapper">
      <h1>Online Judge</h1>
      <div className="authCard">
        <div className="authMode">
          <h3 className="loginMode" onClick={() => setMode(true)}>
            Login
          </h3>
          <h3 className="signinMode" onClick={() => setMode(false)}>
            Register
          </h3>
        </div>
        {mode ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    userName: yup.string().required("User name is required"),
    userPassword: yup
      .string()
      .min(8)
      .required("Password must be atleast 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        data
      );

      if (response.data.userID) {
        alert(`LogedIn Sucessfully!!`);
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/problem-list");
      }
      else{
        alert(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="authForm">
      <label htmlFor="username">Username:</label>
      <input
        type="String"
        placeholder="Username"
        id="username"
        onChange={(e) => setUserName(e.target.value)}
        {...register("userName")}
      />
      <p style={{ color: `red`, fontSize: `8px` }}>
        {errors.userName?.message}{" "}
      </p>

      <label htmlFor="userpassword">Password:</label>
      <input
        type="password"
        placeholder="Password"
        id="userpassword"
        onChange={(e) => setUserPassword(e.target.value)}
        {...register("userPassword")}
      />
      <p style={{ color: `red`, fontSize: `8px` }}>
        {errors.userPassword?.message}
      </p>

      <button type="submit"> Login </button>
    </form>
  );
};

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const schema = yup.object().shape({
    userName: yup.string().required("User name is required"),
    userEmail: yup.string().email().required("Email is required"),
    userPassword: yup
      .string()
      .min(8)
      .required("Password must be atleast 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3001/auth/register", data);
      alert("Registration Complete");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="authForm">
      <label htmlFor="username">Username:</label>
      <input
        type="String"
        placeholder="Username"
        id="username"
        onChange={(e) => setUserName(e.target.value)}
        {...register("userName")}
      />
      <p style={{ color: `red`, fontSize: `8px` }}>
        {" "}
        {errors.userName?.message}{" "}
      </p>

      <label htmlFor="useremail">Email ID:</label>
      <input
        type="String"
        placeholder="Email"
        id="useremail"
        onChange={(e) => setUserEmail(e.target.value)}
        {...register("userEmail")}
      />
      <p style={{ color: `red`, fontSize: `8px` }}>
        {" "}
        {errors.userEmail?.message}{" "}
      </p>

      <label htmlFor="userpassword">Password:</label>
      <input
        type="password"
        placeholder="Password"
        id="userpassword"
        onChange={(e) => setUserPassword(e.target.value)}
        {...register("userPassword")}
      />
      <p style={{ color: `red`, fontSize: `8px` }}>
        {" "}
        {errors.userPassword?.message}{" "}
      </p>

      <button type="submit"> Register </button>
    </form>
  );
};
