import { Link } from "react-router-dom";
import Banner from "../Elements/Banner";

const AuthLayout = (props) => {
  const { children, type } = props;
  return (
    <div className="bg-pink-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-sm shadow-lg flex w-[1400px] h-[900px] items-center justify-between overflow-hidden space">
        <div className="m-auto w-1/3">
          <Banner classname="flex items-center mb-10 justify-center gap-1.5" />
          {children}
          <Navigation type={type} />
        </div>
        <img
          src="images/Illustrasi-login.png"
          alt="3D illustration of a person running with floating cubes"
          className="rounded-sm max-h-fit"
        />
      </div>
    </div>
  );
};

const Navigation = ({ type }) => {
  if (type === "login") {
    return (
      <p className="mt-7 text-center text-gray-700">
        belum punya akun? registrasi{" "}
        <Link to="/register" className="font-bold text-blue-600">
          di sini
        </Link>
      </p>
    );
  } else {
    return (
      <p className="mt-7 text-center text-gray-700">
        sudah punya akun? login{" "}
        <Link to="/login" className="font-bold text-blue-600">
          di sini
        </Link>
      </p>
    );
  }
};

export default AuthLayout;
