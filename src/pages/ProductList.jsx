import React from 'react';
import { useGetProducts } from '../api/products/products';
import AddToCartButton from '../components/AddToCartButton';

const ProductCard = ({ product }) => (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '10px', width: '300px' }}>
        <h3>{product.productName}</h3>
        <p>Brand: {product.brand}</p>
        <p style={{ fontWeight: 'bold' }}>Price: ${product.price?.toFixed(2)}</p>
        <AddToCartButton productId={product.id} />
    </div>
);

function ProductList() {
    const { data: res, isLoading, isError, error } = useGetProducts();
    // Extract product array from  axios response
    const products = Array.isArray(res?.data) ? res.data : [];

    if (isLoading) {
        return <h2 style={{ color: 'blue' }}>Loading Product Catalog...</h2>;
    }

    if (isError) {
        return <h2 style={{ color: 'red' }}>Error fetching products: {error.message}</h2>;
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Skincare Product Catalog</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {products.map((product, index) => (
                    <ProductCard
                        // Using product.id for key - real unique identifier
                        key={product.id ?? `${product.productName}-${index}`}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
