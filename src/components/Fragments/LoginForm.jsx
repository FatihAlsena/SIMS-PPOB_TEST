import Button from "../Elements/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const tokenTimestamp = sessionStorage.getItem("tokenTimestamp");
    if (tokenTimestamp) {
      const currentTime = Date.now();
      const hoursElapsed = (currentTime - tokenTimestamp) / (1000 * 60 * 60);
      if (hoursElapsed >= 12) {
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("tokenTimestamp");
        console.log("Token Expired");
      }
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const { email, password } = loginData;

    if (!validateEmail(email)) {
      setErrorMessage("Email format is invalid.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something Wrong");
      }
      const result = await response.json();
      console.log("Login Success", result);
      if (result.data && result.data.token) {
        sessionStorage.setItem("jwtToken", result.data.token);
        console.log("Token success");

        navigate("/home");
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Login Failed", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-7">
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <input
            name="email"
            type="email"
            placeholder="masukan email anda"
            className="w-full px-3 py-2 border rounded-lg placeholder:opacity-70"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-7">
          <input
            name="password"
            type="password"
            placeholder="masukan password anda"
            className="w-full px-3 py-2 border rounded-lg placeholder:opacity-70"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          variant="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          type="submit"
        >
          Masuk
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
