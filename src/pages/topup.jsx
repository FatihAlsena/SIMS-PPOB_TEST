import React, { useState } from "react";
import Navbar from "../components/Fragments/Navbar";
import ProfileCard from "../components/Fragments/ProfileCard";

const TopupPage = () => {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(null);

  const handleTopUp = async () => {
    const token = sessionStorage.getItem("jwtToken");

    if (!topUpAmount || isNaN(topUpAmount) || Number(topUpAmount) <= 9999) {
      setError("Topup dengan minimum nominal 10000");
      return;
    }

    try {
      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            top_up_amount: Number(topUpAmount),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setBalance(data.data.balance);
      alert(
        `Top Up Balance berhasil! New Balance: Rp ${data.data.balance.toLocaleString()}`
      );
      setTopUpAmount("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex justify-center min-h-full">
        <main className="p-8 w-[1600px]">
          <ProfileCard />
          <div className="mt-8">
            <h3 className="text-md">Silahkan masukan</h3>
            <h2 className="text-xl font-bold">Nominal Top Up</h2>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col justify-center w-3/5">
              <input
                type="text"
                placeholder="masukan nominal Top Up"
                value={topUpAmount}
                onChange={(e) => {
                  setTopUpAmount(e.target.value);
                  setError("");
                }}
                className="w-full px-3 py-2 border rounded-lg placeholder:opacity-70"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="mt-4">
                <button
                  onClick={handleTopUp}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded"
                >
                  Top Up
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                <button
                  key={amount}
                  className="border px-4 py-2 rounded"
                  onClick={() => {
                    setTopUpAmount(amount);
                    setError("");
                  }}
                >
                  Rp{amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          {balance !== null && (
            <div className="mt-4 text-lg">
              <h3>Saldo Anda Saat Ini: Rp {balance.toLocaleString()}</h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TopupPage;
