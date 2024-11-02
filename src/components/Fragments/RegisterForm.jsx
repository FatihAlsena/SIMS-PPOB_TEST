import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerData.email,
            first_name: registerData.firstName,
            last_name: registerData.lastName,
            password: registerData.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await response.json();
      console.log("Registration successful", result);

      // Navigate to root page after successful registration
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-7">
        <input
          className="w-full px-3 py-2 border rounded-lg placeholder:opacity-70"
          type="email"
          placeholder="masukan email anda"
          name="email"
          value={registerData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-7">
        <input
          className="w-full px-3 py-2 border rounded-lg placeholder:opacity-70"
          type="text"
          placeholder="nama depan"
          name="firstName"
          value={registerData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-7">
        <input
          className="w-full px-3 py-2 border rounded-lg placeholder:opacity-70"
          type="text"
          placeholder="nama belakang"
          name="lastName"
          value={registerData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-7">
        <input
          className="w-full px-3 py-2 border rounded-lg placeholder:opacity-70"
          type="password"
          placeholder="buat password"
          name="password"
          value={registerData.password}
          onChange={handleChange}
          required
          minLength="8"
        />
      </div>
      <div className="mb-7">
        <input
          className="w-full px-3 py-2 border rounded-lg placeholder:opacity-70"
          type="password"
          placeholder="konfirmasi password"
          name="confirm_password"
        />
      </div>
      <Button
        variant="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        classname="bg-blue-600 w-full"
        type="submit"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
