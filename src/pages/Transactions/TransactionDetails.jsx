import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    setLoading(true);
    setError("");

    try {
      

      const response = await fetch(
        `http://127.0.0.1:8000/api/transactions/${id}/`
      );

      if (!response.ok) {
        throw new Error("Transaction not found");
      }

      const data = await response.json();

      setTransaction(data);
    } catch (err) {
      console.error(err);

      setError(
        "Transaction could not be found. Please check the transaction ID."
      );
    } finally {
      setLoading(false);
    }
  };

  
  const formatMoney = (amount) => {
    return `KSh ${Number(amount).toLocaleString()}`;
  };

  
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  
  const downloadReceipt = () => {
    if (!transaction) return;

    const receipt = `
PESAFLOW
TRANSACTION RECEIPT
==============================

Transaction ID:
${transaction.transaction_id || id}

Recipient:
${transaction.recipient || transaction.recipient_name || "N/A"}

Phone:
${transaction.phone || transaction.recipient_phone || "N/A"}

Amount:
${formatMoney(transaction.amount)}

Fee:
${formatMoney(transaction.fee)}

Total:
${formatMoney(
  transaction.total ||
    Number(transaction.amount) + Number(transaction.fee)
)}

Status:
${transaction.status || "Successful"}

Date:
${formatDate(transaction.date || transaction.created_at)}

==============================
Thank you for using PesaFlow.
`;

    const blob = new Blob([receipt], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `PesaFlow-Receipt-${transaction.transaction_id || id}.txt`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex min-h-[400px] max-w-2xl items-center justify-center rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600"></div>
          <h2>Loading transaction...</h2>
          <p>Please wait while we fetch the transaction details.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-red-100 font-bold text-red-700">!</div>
          <h2>Transaction Not Found</h2>
          <p>{error}</p>
          <button className="mt-5 rounded-lg bg-slate-200 px-4 py-2 font-semibold text-slate-700" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
          <h1 className="text-2xl font-bold text-slate-900">Transaction Details</h1>
          <span className="font-semibold text-emerald-600">
            ✓ {transaction.status || "Successful"}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-lg bg-slate-100 p-4">
          <span className="text-slate-500">Transaction ID</span>
          <strong className="text-right text-slate-900">{transaction.transaction_id || id}</strong>
        </div>

        <div className="mt-6 grid gap-4">

          {/* Recipient */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <span className="text-slate-500">Recipient</span>

            <strong className="text-right text-slate-900">
              {transaction.recipient ||
                transaction.recipient_name ||
                "N/A"}
            </strong>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <span className="text-slate-500">Phone</span>

            <strong className="text-right text-slate-900">
              {transaction.phone ||
                transaction.recipient_phone ||
                "N/A"}
            </strong>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <span className="text-slate-500">Amount</span>

            <strong className="text-right text-slate-900">
              {formatMoney(transaction.amount)}
            </strong>
          </div>

          {/* Fee */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <span className="text-slate-500">Fee</span>

            <strong className="text-right text-slate-900">
              {formatMoney(transaction.fee)}
            </strong>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 text-lg">
            <span className="text-slate-500">Total</span>

            <strong className="text-right text-slate-900">
              {formatMoney(
                transaction.total ||
                  Number(transaction.amount) +
                    Number(transaction.fee)
              )}
            </strong>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <span className="text-slate-500">Status</span>

            <strong className="text-right font-semibold text-emerald-600">
              ✓ {transaction.status || "Successful"}
            </strong>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <span className="text-slate-500">Date</span>

            <strong className="text-right text-slate-900">
              {formatDate(
                transaction.date ||
                  transaction.created_at
              )}
            </strong>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">

          <button
            className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
            onClick={downloadReceipt}
          >
            ↓ Download Receipt
          </button>

          <button
            className="rounded-lg bg-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-300"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

        </div>

      </div>
    </div>
  );
}

export default TransactionDetails;

