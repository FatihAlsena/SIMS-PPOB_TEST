import LoginForm from "../components/Fragments/LoginForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout type="login">
      <h2 className="text-2xl font-semibold mb-12 text-center">
        Masuk atau buat akun
        <br />
        untuk memulai
      </h2>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
