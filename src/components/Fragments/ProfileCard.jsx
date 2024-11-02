import React, { useEffect, useState } from "react";
import BalanceCard from "../Elements/BalanceCard";

const ProfileCard = (props) => {
  const { children } = props;
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

  return (
    <div className="flex items-center mb-14 justify-between">
      <div>
        <img
          src={profileImage || "public/images/Profile Photo.png"}
          alt="User profile picture"
          className="rounded-full w-24 h-24 mb-8"
        />
        <p className="text-gray-500">Selamat datang,</p>
        <h1 className="text-2xl font-bold">{`${profileData?.first_name || ""} ${
          profileData?.last_name || ""
        }`}</h1>
      </div>
      <BalanceCard />
      {children} {}
    </div>
  );
};

export default ProfileCard;
