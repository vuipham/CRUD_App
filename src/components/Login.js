import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { loginApi } from "../service/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required !");
      return;
    }
    setLoadingApi(true);

    let res = await loginApi(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      // error
      if (res && res.status === 400) {
        console.log("user not found");
        toast.error(res.data.error);
      }
      setLoadingApi(false);
      console.log(res);
    }
  };

  return (
    <>
      <div className="container-login col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">
          Email or username ( eve.holt@reqres.in , cityslicka )
        </div>
        <div className="input">
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email or username..."
          />
        </div>
        <div className="input input-password">
          <input
            type={isShowPassword === true ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password..."
          />
          <i
            className={
              isShowPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>
        <div className="button">
          <button
            className={email && password ? "active" : ""}
            onClick={() => handleLogin()}
            disabled={email && password ? false : true}
          >
            {loadingApi && <i className="fa-solid fa-spinner fa-spin"></i>}
            &nbsp;Login
          </button>
        </div>
        <div className="button-back">
          <button>
            <i className="fa-solid fa-chevron-left"></i>
            Go back
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
