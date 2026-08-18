import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// Replace with your actual slice actions/selectors
import { fetchBeneficiaries, deleteBeneficiary } from '../redux/beneficiarySlice';

const BeneficiariesPage = () => {}
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract state from beneficiarySlice
  const { list: beneficiaries, isLoading, error } = useSelector(
    (state) => state.beneficiaries
  );

  useEffect(() => {
    dispatch(fetchBeneficiaries());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this beneficiary?')) {
      dispatch(deleteBeneficiary(id));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 font-medium">Loading beneficiaries...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 font-medium">Loading beneficiaries...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Beneficiaries ({beneficiaries?.length || 0})
        </h1>
        <p className="text-sm text-gray-500">Your saved beneficiaries</p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && beneficiaries?.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
          <p className="text-gray-500 mb-4">No saved beneficiaries found.</p>
          <Link
            to="/beneficiaries/add"
            className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add Your First Beneficiary
          </Link>
        </div>
      ) : (
        /* Beneficiaries List */
        <div className="space-y-4 mb-6">
          {beneficiaries.map((b) => (
            <div
              key={b.id}
              className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-gray-300 transition-all"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{b.name}</h3>
                <p className="text-sm text-gray-600">{b.phone}</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Send Money Action Button */}
                <button
                  onClick={() => navigate(`/transfer/send?beneficiary_id=${b.id}`)}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  Send Money
                </button>

                {/* Edit Button (Optional Week 1) */}
                <button
                  onClick={() => navigate(`/beneficiaries/edit/${b.id}`)}
                  className="px-2 py-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium"
                  title="Edit"
                >
                  Edit
                </button>

                {/* Delete Button (Optional Week 1) */}
                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-2 py-1.5 text-red-600 hover:text-red-800 text-sm font-medium"
                  title="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Beneficiary Button */}
      {beneficiaries?.length > 0 && (
        <Link
          to="/beneficiaries/add"
          className="block w-full text-center py-2.5 px-4 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 border border-gray-300 transition-colors"
        >
          + Add Beneficiary
        </Link>
      )}
    </div>
  );


export default BeneficiariesPage;
  
     
             

/**
 * ========================================================
 * BENEFICIARIES PAGE
 * ========================================================
 * 
 * Owner: NAOMI (Wallet + Beneficiaries)
 * Week 1: Day 3 (Main Application)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌──────────────────────────────────┐
 * │  Beneficiaries                   │
 * │                                  │
 * │  Your saved beneficiaries        │
 * │                                  │
 * │  John Kamau                      │
 * │  0712 XXXX XXX                   │
 * │  [ Send Money ]                  │
 * │                                  │
 * │  Mary Wanjiku                    │
 * │  0798 XXXX XXX                   │
 * │  [ Send Money ]                  │
 * │                                  │
 * │  [ + Add Beneficiary ]           │
 * └──────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Page header with title and count
 * ✅ List of beneficiaries
 * ✅ Each beneficiary card shows: name, phone, action button
 * ✅ "Send Money" button on each card → /transfer/send?beneficiary_id=X
 * ✅ "+ Add Beneficiary" button → /beneficiaries/add
 * ✅ Loading state
 * ✅ Empty state if no beneficiaries
 * ✅ Delete/Edit functionality (optional for Week 1)
 * ✅ Responsive design
 * 
 * MOCK DATA STRUCTURE:
 * [
 *   { id: 1, name: "John Kamau", phone: "0712345678" },
 *   { id: 2, name: "Mary Wanjiku", phone: "0798123456" }
 * ]
 * 
 * REDUX INTEGRATION:
 * - Get beneficiaries from beneficiarySlice
 * - Fetch on mount
 * 
 * NEXT WEEK TODO:
 * - Connect to beneficiary API endpoints
 * - Implement delete beneficiary functionality
 * - Implement edit beneficiary functionality
 * - Add verification status display
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom


  // TODO: Set up useNavigate hook
  // TODO: Create state for isLoading
  // TODO: Create state for beneficiaries (use mock data for Week 1)
  // TODO: useEffect to fetch beneficiaries on mount
  
  // TODO: Build JSX:
  // 1. Header with title and total count
  // 2. If loading: show loading message
  // 3. If has beneficiaries: show list
  //    - Each card: name, phone, "Send Money" button
  //    - "Send Money" button → /transfer/send?beneficiary_id={id}
  // 4. If no beneficiaries: show empty state
  // 5. "+ Add Beneficiary" button at bottom → /beneficiaries/add
  
  return <div>{/* NAOMI: Build beneficiaries list here */}</div>;

