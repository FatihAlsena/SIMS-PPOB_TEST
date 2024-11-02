import RegisterForm from "../components/Fragments/RegisterForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const RegisterPage = () => {
  return (
    <AuthLayout type="register">
      <h2 className="text-2xl font-semibold mb-12 text-center">
        Lengkapi data untuk
        <br />
        membuat akun
      </h2>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
