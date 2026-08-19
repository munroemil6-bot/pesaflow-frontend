import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const mockBeneficiaries = [
  { id: 1, name: 'John Kamau', phone: '0712 345 678', bank: 'KCB' },
  { id: 2, name: 'Mary Wanjiku', phone: '0798 765 432', bank: 'Equity' },
  { id: 3, name: 'Peter Mwangi', phone: '0744 111 222', bank: 'Co-op Bank' },
];

const STORAGE_KEY = 'pesaflow-beneficiaries';

const getStoredBeneficiaries = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return mockBeneficiaries;

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockBeneficiaries;
  } catch (error) {
    return mockBeneficiaries;
  }
};

export default function BeneficiariesPage() {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState(getStoredBeneficiaries);
  const [isLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(beneficiaries));
  }, [beneficiaries]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this beneficiary?')) {
      const updated = beneficiaries.filter((beneficiary) => beneficiary.id !== id);
      setBeneficiaries(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm font-medium text-slate-500">Loading beneficiaries...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-600">People</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Beneficiaries ({beneficiaries.length})
          </h1>
        </div>
        <Link
          to="/beneficiaries/add"
          className="inline-flex items-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-green-600/30 transition hover:bg-green-700"
        >
          + Add Beneficiary
        </Link>
      </div>

      {beneficiaries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-lg font-medium text-slate-700">No saved beneficiaries yet.</p>
          <p className="mt-2 text-sm text-slate-500">Add someone you send money to often.</p>
          <Link
            to="/beneficiaries/add"
            className="mt-5 inline-flex rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
          >
            + Add Your First Beneficiary
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {beneficiaries.map((beneficiary) => (
            <div
              key={beneficiary.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-lg font-semibold text-green-700">
                  {beneficiary.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{beneficiary.name}</h3>
                  <p className="text-sm text-slate-500">{beneficiary.phone}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{beneficiary.bank}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/transfer/send?beneficiary_id=${beneficiary.id}`)}
                  className="rounded-xl bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  Send Money
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/beneficiaries/edit/${beneficiary.id}`)}
                  className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(beneficiary.id)}
                  className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
