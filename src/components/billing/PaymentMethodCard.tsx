"use client";

import { ManageBillingButton } from "@/components/billing/CheckoutButtons";
import { mockDelay } from "@/lib/mock/delay";
import { MOCK_PAYMENT_METHOD, type PaymentMethod } from "@/lib/mock/payments";
import { useEffect, useState } from "react";

async function fetchPaymentMethod(): Promise<PaymentMethod | null> {
  // TODO(backend): GET /api/billing/payment-method (Stripe default payment method)
  await mockDelay();
  return MOCK_PAYMENT_METHOD;
}

function formatBrand(brand: string): string {
  return brand.charAt(0).toUpperCase() + brand.slice(1);
}

function describe(paymentMethod: PaymentMethod): string {
  if (paymentMethod.type === "card") {
    return `${formatBrand(paymentMethod.brand)} ending in ${paymentMethod.last4} · expires ${String(
      paymentMethod.expMonth,
    ).padStart(2, "0")}/${paymentMethod.expYear}`;
  }
  return paymentMethod.email
    ? `Stripe Link (${paymentMethod.email})`
    : "Stripe Link";
}

export default function PaymentMethodCard() {
  const [paymentMethod, setPaymentMethod] = useState<
    PaymentMethod | null | undefined
  >(undefined);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPaymentMethod().then(
      (pm) => {
        if (!cancelled) setPaymentMethod(pm);
      },
      (err) => {
        if (!cancelled) setError(err);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="default-radius border border-gray-50 bg-gray-50 p-4">
      <h2 className="mb-2 font-semibold text-gray-800">Payment method</h2>
      {error ? (
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      ) : paymentMethod === undefined ? (
        <div className="h-5 bg-gray-200 w-full rounded animate-pulse"></div>
      ) : paymentMethod ? (
        <p className="text-sm text-gray-600">{describe(paymentMethod)}</p>
      ) : (
        <p className="text-sm text-gray-400">No payment method on file.</p>
      )}
      <div className="flex flex-col gap-3 mt-6">
        <p className="text-sm text-gray-600">
          Update your payment method, view invoices, or change plans in the
          billing portal.
        </p>
        <div className="flex">
          <ManageBillingButton />
        </div>
      </div>
    </div>
  );
}
