import React, { useState } from 'react';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
    const [page, setPage] = useState('products'); // Default starting page

    const renderPage = () => {
        switch (page) {
            case 'products':
                return <ProductList />;
            case 'cart':
                return <Cart />;
            case 'checkout':
                return <Checkout />;
            default:
                return <h1>404 Page Not Found</h1>;
        }
    };

    return (
        <div className="shell">
            <header className="header">
                <div className="header-inner">
                    <div className="logoBlock">
                        <div className="logoTitle">Skincare Store</div>
                        <div className="logoTag">Explore the shop • Find your products</div>
                    </div>

                    <nav className="nav" aria-label="Main">
                        <button
                            onClick={() => setPage('products')}
                            className={`navLink ${page === 'products' ? 'isActive' : ''}`}
                            aria-current={page === 'products' ? 'page' : undefined}
                        >
                            Product Catalog
                        </button>
                        <button
                            onClick={() => setPage('cart')}
                            className={`navLink ${page === 'cart' ? 'isActive' : ''}`}
                            aria-current={page === 'cart' ? 'page' : undefined}
                        >
                            Shopping Cart
                        </button>
                        <button
                            onClick={() => setPage('checkout')}
                            className={`navLink ${page === 'checkout' ? 'isActive' : ''}`}
                            aria-current={page === 'checkout' ? 'page' : undefined}
                        >
                            Checkout
                        </button>
                    </nav>
                </div>
            </header>

            <main className="main">
                <div className="page">{renderPage()}</div>
            </main>

            <footer className="footer">
                <div className="footer-inner">© {new Date().getFullYear()} — Simple Storefront</div>
            </footer>
        </div>
    );
}

export default App;
