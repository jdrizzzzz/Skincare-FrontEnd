import React from 'react';
import { useCreateCartItem, getGetMyCartQueryKey } from '../api/carts/carts';
import { useQueryClient } from '@tanstack/react-query';

function AddToCartButton({ productId }) {
    const queryClient = useQueryClient();

    const mutation = useCreateCartItem({
        onSuccess: () => {
            // Refresh cart data after a successful add
            queryClient.invalidateQueries({ queryKey: getGetMyCartQueryKey() });
            alert('Product added to cart!');
        },
        onError: (error) => {
            console.error("Add to cart error:", error);
            alert("Failed to add product.");
        }
    });

    const handleAdd = () => {
        // make sure its a valid product ID
        if (productId == null) {
            alert("This product has no valid ID and cannot be added to cart.");
            console.error("Missing productId:", productId);
            return;
        }
        // Send the product ID to backend
        mutation.mutate({
            data: {
                productId: Number(productId)
            }
        });
    };

    return (
        <button onClick={handleAdd} disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
    );
}

export default AddToCartButton;
