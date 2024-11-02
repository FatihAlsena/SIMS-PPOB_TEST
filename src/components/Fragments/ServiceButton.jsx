import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ServiceButton = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const token = sessionStorage.getItem("jwtToken");
      try {
        const response = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/services",
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
        setServices(data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchServices();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-between">
      {services.map((service, index) => (
        <Link
          to={`/services/${service.service_code}`}
          key={index}
          className="flex flex-col items-center"
        >
          <div className="p-1 rounded-full mb-2">
            <img
              src={service.service_icon}
              className="w-16 rounded-sm"
              alt={service.service_name}
            />
          </div>
          <p>{service.service_name}</p>
        </Link>
      ))}
    </div>
  );
};

export default ServiceButton;
