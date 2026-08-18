export default function Footer({ isAuthenticated = false }) {
  if (isAuthenticated) {
    return (
      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-sm font-bold text-white">
                P
              </div>
              <div>
                <p className="font-bold text-white text-sm">PesaFlow</p>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  Money Transfer
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 text-center">
              Fast, secure money transfers for everyone in Kenya.
            </p>
            <p className="text-xs text-slate-500">
              © 2026 PesaFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-lg font-bold text-white">
                P
              </div>
              <div>
                <p className="font-bold text-white">PesaFlow</p>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  Money Transfer
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400">
              Fast, secure money transfers for everyone in Kenya.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                PesaFlow provides a simple and convenient way to send and receive
                money through a secure digital platform.
              </li>
              <li>
                Users can initiate transfers and monitor their transaction activity
                from one place.
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                PesaFlow is designed to make digital money transfers easier,
                faster, and more accessible.
              </li>
              <li>
                Our goal is to provide a straightforward experience for everyday
                financial transactions.
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                Your transaction information should be handled securely and
                responsibly.
              </li>
              <li>
                PesaFlow is designed with privacy and secure transaction handling
                in mind.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 PesaFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
