import React, { useState, useEffect } from "react";
import Navbar from "../components/Fragments/Navbar";
import ProfileCard from "../components/Fragments/ProfileCard";

const TransactionHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(5);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const token = sessionStorage.getItem("jwtToken");

      try {
        const response = await fetch(
          `https://take-home-test-api.nutech-integrasi.com/transaction/history?limit=${limit}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transaction history");
        }

        const data = await response.json();
        setHistory(data.data.records);

        if (data.data.records.length < limit) {
          setShowMore(false);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [limit]);

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex justify-center min-h-full">
        <main className="p-8 w-[1600px]">
          <ProfileCard />

          {loading ? (
            <div className="text-center">Loading transaction history...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : history.length === 0 ? (
            <div className="text-center text-gray-400">
              Maaf tidak ada histori transaksi saat ini
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">Histori Transaksi</h2>
              <div className="space-y-4">
                {history.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-bold">
                        {transaction.transaction_type === "TOPUP" ? "+" : "-"}{" "}
                        Rp.{transaction.total_amount.toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(transaction.created_on).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-gray-500">{transaction.description}</p>
                      <p className="text-gray-500">
                        Invoice: {transaction.invoice_number}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showMore && (
            <div className="text-center mt-8">
              <button onClick={handleShowMore} className="text-red-500">
                Show more
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
