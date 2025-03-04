import React, { useState } from 'react';
import { Navbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaShoppingCart, FaSignOutAlt, FaUserPlus, FaHome } from 'react-icons/fa';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'; 
import { IoBagCheckOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { login } from './authService'; // นำเข้า login service
import LoginModal from './LoginModal'; // นำเข้า LoginModal
import './CustomNavbar.css'

const CustomNavbar = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
    const navigate = useNavigate();
    
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate("/", { replace: true });
    };

    const handleShowLogin = () => setShowLoginModal(true);
    const handleHideLogin = () => setShowLoginModal(false);

    const handleLogin = async ({ username, password }) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await login({ username, password });
            if (!data.result) throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');

            localStorage.setItem('isLoggedIn', 'true');
            navigate('/home');
            setShowLoginModal(false);
        } catch (err) {
            setError('เกิดข้อผิดพลาด: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark" className="custom-navbar fixed-top">
                <Navbar.Brand as={Link} to="/">FN Badminton</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-home">Home</Tooltip>}
                        >
                            <Nav.Link as={Link} to="/">
                                <FaHome size={30} />
                            </Nav.Link>
                        </OverlayTrigger>

                        {isLoggedIn ? (
                            <>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="tooltip-products">Products</Tooltip>}
                                >
                                    <Nav.Link as={Link} to="/home">
                                        <AiFillProduct size={30} />
                                    </Nav.Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="tooltip-cart">Shopping Cart</Tooltip>}
                                >
                                    <Nav.Link as={Link} to="/cart">
                                        <FaShoppingCart size={30} />
                                    </Nav.Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="tooltip-checkout">Checkout</Tooltip>}
                                >
                                    <Nav.Link as={Link} to="/checkout">
                                        <IoBagCheckOutline size={30} />
                                    </Nav.Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="tooltip-order-summary">Order Summary</Tooltip>}
                                >
                                    <Nav.Link as={Link} to="/order-summary">
                                        <MdOutlineShoppingCartCheckout size={30} />
                                    </Nav.Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="tooltip-logout">Logout</Tooltip>}
                                >
                                    <Nav.Link onClick={handleLogout}>
                                        <FaSignOutAlt size={22} color="red" />
                                    </Nav.Link>
                                </OverlayTrigger>
                            </>
                        ) : (
                            <>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="tooltip-signup">Sign Up</Tooltip>}
                                >
                                    <Nav.Link as={Link} to="/signup">
                                        <FaUserPlus size={30} />
                                    </Nav.Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="tooltip-login">Login</Tooltip>}
                                >
                                    <Nav.Link onClick={handleShowLogin} style={{ cursor: 'pointer' }}>
                                        <FaRegUserCircle size={30} />
                                    </Nav.Link>
                                </OverlayTrigger>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <LoginModal 
                show={showLoginModal} 
                onHide={handleHideLogin} 
                onLogin={handleLogin}
                isLoading={isLoading}    
                error={error}         
            />
        </>
    );
};

export default CustomNavbar;
