import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Subscriptions
        </h1>

        <Link
          href="/dashboard/subscriptions/new"
          className="rounded-lg bg-white px-4 py-2 font-medium text-black"
        >
          + New Subscription
        </Link>
      </div>

      {subscriptions.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          No subscriptions yet.
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {sub.name}
                </h2>

                <p className="text-sm text-gray-400">
                  {sub.type}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Next Billing:{" "}
                  {new Date(sub.nextBill).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">
                  ${sub.amount.toFixed(2)}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-sm ${
                    sub.status === "ACTIVE"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}