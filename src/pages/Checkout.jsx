import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useGetMyCart, getGetMyCartQueryKey } from '../api/carts/carts';
import { usePlaceOrder } from '../api/orders/orders';
import { getGetOrdersQueryKey } from '../api/orders/orders';

function Checkout() {
    const queryClient = useQueryClient();
    const userId = 1;
    // GET cart
    const { data: res, isLoading: isCartLoading, isError, error } = useGetMyCart();

    // Hook returns an AxiosResponse<CartItemResponse[]>
    // array inside res.data
    const cartItems = Array.isArray(res?.data) ? res.data : [];

    const total = cartItems.reduce(
        (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
        0
    );

    // POST place order
    const mutation = usePlaceOrder({
        onSuccess: () => {
            // ✅ Use Orval-generated keys so invalidation always matches the cache
            queryClient.invalidateQueries({ queryKey: getGetMyCartQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetOrdersQueryKey() });

            alert('Order Placed Successfully! Your cart has been cleared.');
        },
        onError: (err) => {
            console.error('Place order error:', err);
            alert('Failed to place order: Check backend logs.');
        },
    });

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            alert('Cannot place an empty order.');
            return;
        }
        mutation.mutate({ userId });
    };

    if (isCartLoading) return <h2>Loading checkout details...</h2>;
    if (isError) return <h2 style={{ color: 'red' }}>Error loading checkout: {error?.message}</h2>;

    return (
        <div>
            <h1>Confirm Your Order</h1>

            <div style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty. Please add items to checkout.</p>
                ) : (
                    <>
                        {cartItems.map((item, index) => (
                            <p key={`${item.product?.id ?? item.product?.productName ?? 'item'}-${index}`}>
                                {item.quantity} x <strong>{item.product?.productName}</strong> ($
                                {(item.product?.price ?? 0).toFixed(2)} each)
                            </p>
                        ))}
                        <h3 style={{ marginTop: '10px' }}>Final Total: ${total.toFixed(2)}</h3>
                    </>
                )}
            </div>

            <button
                onClick={handlePlaceOrder}
                disabled={mutation.isLoading || cartItems.length === 0}
                style={{
                    padding: '12px 25px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '4px',
                }}
            >
                {mutation.isLoading ? 'Processing Order...' : 'Place Order Now'}
            </button>
        </div>
    );
}

export default Checkout;
