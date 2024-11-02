import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import ProfileCard from "../components/Fragments/ProfileCard";

const ServiceDetailPage = () => {
  const { service_code } = useParams();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [amount, setAmount] = useState("");
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

  useEffect(() => {
    if (services.length) {
      const service = services.find((s) => s.service_code === service_code);
      setSelectedService(service);
      setAmount(service ? service.service_tariff : "");
    }
  }, [services, service_code]);

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const token = sessionStorage.getItem("jwtToken");

    try {
      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            service_code: selectedService.service_code,
            total_amount: Number(amount),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      alert("Payment successful");
      setAmount("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedService) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex justify-center min-h-full">
        <main className="p-8 w-[1600px]">
          <ProfileCard />
          <div className="mt-8 mb-10">
            <h3 className="text-md">PemBayaran</h3>
            <div className="flex items-center mb-2">
              <img
                src={selectedService.service_icon}
                className="w-7 rounded-sm"
                alt={selectedService.service_name}
              />
              <h2 className="text-xl font-semibold self-center">
                {selectedService.service_name}
              </h2>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col justify-center w-full">
              <input
                type="number"
                placeholder="Nominal pembayaran"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg placeholder:opacity-70"
                readOnly
              />
              <div className="mt-4">
                <button
                  onClick={handlePayment}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded"
                >
                  Bayar
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
