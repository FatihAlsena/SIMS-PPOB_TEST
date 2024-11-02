import React, { useEffect, useState } from "react";

const PromoCard = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      const token = sessionStorage.getItem("jwtToken");
      try {
        const response = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/banner",
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
        setBanners(data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBanners();
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="grid grid-cols-5 gap-4 h-auto">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`bg-red-500 text-white p-4 rounded-lg flex flex-col justify-end items-start relative h-36`}
          style={{
            backgroundImage: `url(${banner.banner_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <div className=" p-4 rounded-lg">
            <h3 className="text-lg font-bold">{banner.banner_name}</h3>
            <p className="text-sm">{banner.description}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
};
export default PromoCard;
