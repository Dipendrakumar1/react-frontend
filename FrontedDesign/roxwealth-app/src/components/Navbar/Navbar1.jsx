import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import './Navbar.css';
import { getRestaurantData } from '../BackendApi';

const Navbar = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const data = await getRestaurantData();
        setRestaurantData(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setError('Error fetching restaurant data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  return (
    <nav className="app__navbar">
      <div className="nameDiv">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {restaurantData && <h1>{restaurantData.name}</h1>}
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><a href="#home">Home</a></li>
        <li className="p__opensans"><a href="#about">About</a></li>
        <li className="p__opensans"><a href="#menu">Menu</a></li>
        <li className="p__opensans"><a href="#awards">Awards</a></li>
        <li className="p__opensans"><a href="#contact">Contact</a></li>
      </ul>
      <div className="app__navbar-login">
        <a href="#login" className="p__opensans">Log In / Sign Up</a>
        <div />
        <a href="/" className="p__opensans">Book Table</a>
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
              <li><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
              <li><a href="#menu" onClick={() => setToggleMenu(false)}>Menu</a></li>
              <li><a href="#awards" onClick={() => setToggleMenu(false)}>Awards</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
