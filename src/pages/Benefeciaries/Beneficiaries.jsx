import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteBeneficiary, fetchBeneficiaries } from '../../redux/slices/beneficiarySlice'

export default function BeneficiariesPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { list: beneficiaries, isLoading, error } = useSelector((state) => state.beneficiaries)

  useEffect(() => {
    dispatch(fetchBeneficiaries())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this beneficiary?')) dispatch(deleteBeneficiary(id))
  }

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><p className="font-medium text-slate-500">Loading beneficiaries...</p></div>
  }

  return (
    <section className="mx-auto max-w-3xl p-4 sm:p-6">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-slate-900">Beneficiaries</h1><p className="mt-1 text-sm text-slate-500">Your saved contacts for faster transfers</p></div>
        <Link to="/beneficiaries/add" className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">Add beneficiary</Link>
      </header>

      {error && <div role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      {beneficiaries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm"><p className="font-medium text-slate-800">No beneficiaries saved yet.</p><p className="mt-1 text-sm text-slate-500">Add a trusted recipient before sending money.</p><Link to="/beneficiaries/add" className="mt-5 inline-block font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">Add your first beneficiary</Link></div>
      ) : (
        <div className="space-y-3">
          {beneficiaries.map((beneficiary) => (
            <article key={beneficiary.id} className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <div><h2 className="font-semibold text-slate-900">{beneficiary.name}</h2><p className="mt-1 text-sm text-slate-600">{beneficiary.phone}</p></div>
              <div className="flex flex-wrap gap-2"><button type="button" onClick={() => navigate(`/transfer/send?beneficiary_id=${beneficiary.id}`)} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Send money</button><button type="button" onClick={() => handleDelete(beneficiary.id)} className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Remove</button></div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
