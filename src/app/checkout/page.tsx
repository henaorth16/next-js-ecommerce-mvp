'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState(''); // Email state for input
  const router = useRouter();

  // Dummy checkout data for testing
  const checkoutData = {
    amount: 100, // In ETB
    currency: 'ETB',
    email: email, // Use state email input
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '+251911234567',
    tx_ref: `TX-${Date.now()}`, // Unique transaction reference
    callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify`,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
    customization: {
      title: 'Your Shop',
      description: 'Payment for products at Your Shop',
    },
  };

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/chapa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect user to Chapa payment gateway
        window.location.href = data.data.checkout_url;
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <p>Total Amount: {checkoutData.amount} ETB</p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}
