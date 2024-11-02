import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="flex justify-center min-h-screen items-center flex-col">
      <h1 className="text-3xl font-bold">Maaf!</h1>
      <p className="my-5 text-xl">Halaman tidak tersedia</p>
      <i>{error.statusText || error.message}</i>
    </div>
  );
};

export default ErrorPage;
