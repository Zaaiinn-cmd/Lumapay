export default function Settings() {
  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="grid gap-6">

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <h2 className="font-semibold mb-2">Wallet</h2>
          <p className="text-sm text-gray-400">
            Connected Wallet
          </p>

          <p className="mt-2 font-mono text-sm">
            7xK9...3pQa
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <h2 className="font-semibold mb-2">Supported Assets</h2>

          <div className="flex gap-2 mt-2">
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
              USDT
            </span>

            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
              USDC
            </span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <h2 className="font-semibold mb-4">Fees</h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Card Issuance</span>
              <span>$3.00</span>
            </div>

            <div className="flex justify-between">
              <span>Infrastructure Management</span>
              <span>$1.50 / month</span>
            </div>

            <div className="flex justify-between">
              <span>Successful Payment</span>
              <span>$0.50</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}