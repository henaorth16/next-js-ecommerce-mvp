"use client";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { isValidPhone } from '@/lib/isValidPassword'; // Ensure this function checks email validity
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import OrderSummary from '@/components/OrderSummary';

interface product {
  id: string,
  priceInCent: number
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>({}); // Update to proper type if needed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<string>('+251');
  const [tx_ref, setTx_ref] = useState<string>('');
  const { user } = useUser();

  // useEffect(() => {
  //   // Fetch product data by ID
  //   async function fetchData() {
      
  //     setLoading(true)
  //     const tx_ref = `TX-${Date.now()}`;
  //     setTx_ref(tx_ref)
  //     try {
  //       const res = await fetch(`/api/product/${id}`);
  //       if (!res.ok) {
  //         setError("Product not found");
  //         return;
  //       }
  //       const jsonData = await res.json();
  //       console.log(jsonData)
  //       setProduct(jsonData);
  //     } catch (error) {
  //       setError('Error fetching product');
  //     }
  //   }
  //   if (id) {
  //     fetchData();
  //     setLoading(false)
  //   }

  // }, [id, user]);

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!phone || !isValidPhone(phone) || Number.isNaN(phone)) {
      setError('Please enter a valid phone number. Eg: +251912345678');
      setLoading(false);
      return;
    }

    try {
      const checkoutData = {
        productId: product.id as string,
        amount: product.priceInCents / 100, 
        currency: 'ETB',
        email: user?.emailAddresses?.[0].emailAddress || email,
        first_name: user ? user.firstName : 'Firstname',
        last_name: user ? user.lastName : 'Lastname',
        phone_number: phone,
        tx_ref: tx_ref, // Unique transaction reference
        customization: {
          title: 'Your Payment',
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

  if (loading) {
    return (
      <Loader2 className='animate-spin' />
    )
  }

  return (

    <section className="mx-auto z-20">
      <div className="relative z-10 md:flex md:gap-6 max-w-6xl md:mx-auto m-4 ">

        <Card className="relative flex-1 py-10 z-20">
          <CardHeader>
            <CardTitle>
              Checkout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              We need additional informatio to complete purchasing. please fill your phone number below
            </CardDescription>
            <div className=""></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-20">
              <div className="space-y-2">
                <Label htmlFor="first-name">Full Name</Label>
                <Input
                  value={(user?.fullName as string) ?? ""}
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Email</Label>
                <Input
                  value={user?.emailAddresses?.[0].emailAddress || email}
                  name="lastName"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Amount</Label>
              <Input
                disabled
                value={product ? (product.priceInCents / 100) : 0}
                placeholder="amount"
                type="number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Phone number</Label>
              <Input

                value={phone}
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setPhone(e.target.value)}
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
            </div>
            {error && <p className='text-red-700'>{error}</p>}
          </CardContent>
          <CardFooter>
            <Button
              disabled={loading}
              variant="default"
              className="mt-6 w-full"
              onClick={handlePayment}
            >
              Pay now
              {loading ? (
                <Loader2 className="animate-spin ml-3 w-4 h-4 flex items-center" />
              ) : (
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              )}
            </Button>
          </CardFooter>
        </Card>
        <OrderSummary product={product} />
      </div>
    </section>
  );
}

