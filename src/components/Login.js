import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <div className="container-login col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email or username</div>
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
          <button className={email && password ? "active" : ""}>Login</button>
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
