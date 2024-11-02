import React, { useState, useEffect } from "react";

const BalanceCard = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const token = sessionStorage.getItem("jwtToken");
      try {
        const response = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/balance",
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
        setBalance(data.data.balance);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBalance();
  }, []);

  if (error) {
    return (
      <div className="bg-red-500 text-white p-6 rounded-lg mb-8 w-1/2">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-red-500 text-white p-6 rounded-lg mb-8 w-1/2">
      <p>Saldo Anda</p>
      <h2 className="text-3xl font-bold">
        {isBalanceVisible ? `Rp ${balance?.toLocaleString()}` : "••••••••"}
      </h2>
      <button className="mt-2 underline" onClick={toggleBalanceVisibility}>
        {isBalanceVisible ? "Sembunyikan Saldo" : "Lihat Saldo"}
        <i
          className={`fas ${isBalanceVisible ? "fa-eye-slash" : "fa-eye"}`}
        ></i>
      </button>
    </div>
  );
};

export default BalanceCard;
