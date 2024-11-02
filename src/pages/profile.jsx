import Button from "../components/Elements/Button";
import Navbar from "../components/Fragments/Navbar";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = sessionStorage.getItem("jwtToken");

      try {
        const response = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        setProfileData(data.data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const profileImage =
    profileData?.profile_image ===
    "https://minio.nutech-integrasi.com/take-home-test/null"
      ? "public/images/profile Photo.png"
      : profileData?.profile_image;

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center w-auto p-12">
        <div className="w-full max-w-2xl px-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src={profileImage || "public/images/Profile Photo.png"}
              alt="Profile avatar"
              className="rounded-full w-24 h-24 mb-4"
            />
            <h1 className="text-2xl font-bold">{`${
              profileData?.first_name || ""
            } ${profileData?.last_name || ""}`}</h1>
          </div>
          <form className="space-y-4 w-full">
            <div>
              <label className="block text-gray-700">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <i className="fas fa-envelope text-gray-400 mr-2"></i>
                <input
                  type="email"
                  value={profileData?.email}
                  className="flex-grow outline-none"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Nama Depan</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <i className="fas fa-user text-gray-400 mr-2"></i>
                <input
                  type="text"
                  value={profileData?.first_name}
                  className="flex-grow outline-none"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Nama Belakang</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <i className="fas fa-user text-gray-400 mr-2"></i>
                <input
                  type="text"
                  value={profileData?.last_name}
                  className="flex-grow outline-none"
                  readOnly
                />
              </div>
            </div>
          </form>
          <div className="mt-6">
            <a href="/profile/edit">
              <Button
                variant="w-full bg-red-500 text-white py-2 rounded-md"
                type="button"
              >
                Edit Profil
              </Button>
            </a>

            <Button
              variant="w-full border border-red-500 text-red-500 py-2 rounded-md mt-4"
              type="button"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ProfilePage;
