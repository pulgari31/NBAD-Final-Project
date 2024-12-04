import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt") != null) navigate("/dashboard");
  }, []);

  function handleLogin() {
    const data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    axios
      .post("http://localhost:3001/api/login", data)
      .then((res) => {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        if (res && res.data && res.data.success) {
          const token = res.data.token;
          localStorage.setItem("jwt", token);
          navigate("/dashboard");
        } else {
          alert("Login Failed! Invalid Credentials.");
        }
      })
      .catch((e) => {
        alert("Login Failed! Invalid Credentials.");
      });
  }

  return (
    <div className="login-page">
      <div style={{ width: "35%" }}>
        <div className="login-card">
          <div
            style={{ fontWeight: 700, marginBottom: "5px", fontSize: "larger" }}
          >
            Log In
          </div>
          <div
            style={{ color: "gray", fontSize: "small", marginBottom: "20px" }}
          >
            By entering username and password, you can login.
          </div>
          <div className="input-label-row">
            <label className="my-label" htmlFor="username">
              Username
            </label>
            <input
              className="my-input"
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className="input-label-row">
            <label className="my-label" htmlFor="password">
              Password
            </label>
            <input
              className="my-input"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div
            style={{
              margin: "20px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="my-btn login-btn"
              style={{ width: "50%" }}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
