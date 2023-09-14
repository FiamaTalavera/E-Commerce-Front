import './App.css';
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Register from './components/Register';
import axios from 'axios';
import { Cart } from './components/Cart';
import { Categories } from './components/Categories';
import Sidebar from './components/Sidebar';
import Checkout from './components/Checkout/Checkout';

function App() {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URLBACK}/order`, { withCredentials: true })
            .then((res) => {
                console.log('LA DATA ------>', res.data);
                setCartItems(res.data);
                let initialTotal = 0;
                res.data.forEach((item) => {
                    initialTotal += item.quantity * item.product.price;
                });
                setLoading(false);
            })
            .catch((error) => {
                console.log('ERROR ------>', error);
            });
    }, []);

    useEffect(() => {
        const storedAuth = localStorage.getItem('user');
        if (storedAuth) {
            setUser(JSON.parse(storedAuth));
        }
    }, []);

    const updateUser = (userAuth) => {
        setUser(userAuth);
    };

    const handleLogout = () => {
        axios
            .post(`${process.env.REACT_APP_URLBACK}/user/logout`, null, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 204) {
                    localStorage.removeItem('user');
                    setUser(null);
                } else {
                    console.error('Error al cerrar sesión');
                }
            })
            .catch((error) => {
                console.error('Error al cerrar sesión:', error);
            });
    };

    return (
        <div>
            <Navbar user={user} handleLogout={handleLogout} />
            <Routes>
                <Route path="/user/register" element={<Register />} />
                <Route path="/" element={<Grid />} />
                <Route path="/user/login" element={<Login updateUser={updateUser} />} />
                <Route path="/order" element={<Cart />} />
                <Route path="/admin" element={<Sidebar />} />
                <Route path="/admin" element={<Categories />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </div>
    );
}

export default App;
