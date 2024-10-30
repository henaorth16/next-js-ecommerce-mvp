"use client";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { isValidEmail, isValidPhone } from '@/lib/isValidPassword'; // Ensure this function checks email validity

interface product {
  id: string,
  priceInCent: number
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null); // Update to proper type if needed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+251');
  const { user } = useUser();
  const tx_ref = `TX-${Date.now()}`;

  useEffect(() => {
    // Fetch product data by ID
    async function fetchData() {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`);
        if (!res.ok) {
          setError("Product not found");
          return;
        }
        const jsonData = await res.json();
        setProduct(jsonData);
      } catch (error) {
        setError('Error fetching product');
      }
    }

    if (id) {
      fetchData();
      setLoading(false)
    }
  }, [id]);

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // if (!isValidEmail(email)) {
    //   setError('Please enter a valid email address.');
    //   setLoading(false);
    //   return;
    // }

    if (!phone || !isValidPhone(phone) || Number.isNaN(phone)) {
      setError('Please enter a valid phone number. Eg: +251912345678');
      setLoading(false);
      return;
    }

    try {
      const checkoutData = {
        productId: product.id as string,
        amount: product.priceInCents / 100, // In ETB
        currency: 'ETB',
        email: user?.emailAddresses?.[0].emailAddress || email, // Use Clerk user email if available
        first_name: user ? user.firstName : 'Firstname',
        last_name: user ? user.lastName : 'Lastname',
        phone_number: phone,
        tx_ref: tx_ref, // Unique transaction reference
        customization: {
          title: 'Your Shop',
          description: 'Payment for products at Your Shop',
        },
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chapa`, {
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
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <p>Total Amount: {product ? (product.priceInCents / 100) : 0} ETB</p>
      <p>email: {user?.emailAddresses?.[0].emailAddress || email}</p>
      <p>first name: {user?.firstName}</p>
      <p>last name: {user?.lastName}</p>
      <form>
        <input
          type="text"
          value={phone}
          // value={phone !== 0 ? phone : ""}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}
