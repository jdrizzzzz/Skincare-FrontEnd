import React from 'react';
import { useGetMyCart } from '../api/carts/carts';

function Cart() {
    const { data: res, isLoading, isError, error } = useGetMyCart();
    // The inner data (array)
    const cartItems = Array.isArray(res?.data) ? res.data : [];

    if (isLoading) {
        return <h2>Loading your Shopping Cart...</h2>;
    }

    if (isError) {
        return <h2 style={{ color: 'red' }}>Error loading cart: {error.message}</h2>;
    }

    const total =
        cartItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0) || 0;

    return (
        <div>
            <h1>Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty. Add some products to continue!</p>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <p style={{ fontWeight: 'bold' }}>{item.product?.productName}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${((item.product?.price ?? 0) * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}

                    <h2 style={{ marginTop: '20px' }}>Cart Total: ${total.toFixed(2)}</h2>
                    <p style={{ fontStyle: 'italic' }}>Navigate to "Checkout" to place the final order.</p>
                </>
            )}
        </div>
    );
}

export default Cart;
