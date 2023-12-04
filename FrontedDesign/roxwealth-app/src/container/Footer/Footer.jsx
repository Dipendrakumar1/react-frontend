import React, { useEffect, useState } from 'react';
import { FiFacebook, FiTwitter, FiInstagram,FiGlobe } from 'react-icons/fi';
import { FooterOverlay, Newsletter } from '../../components';
import { images } from '../../constants';
import { getRestaurantData } from '../../components/BackendApi'; // Import the getRestaurantData function

import './Footer.css';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await getRestaurantData();
        setFooterData(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setError('Error fetching restaurant data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <div className="app__footer section__padding" id="login">
      <FooterOverlay />
      <Newsletter />

      <div className="app__footer-links">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {footerData && (
          <>
            {/* <div className="app__footer-links_contact">
              <h1 className="app__footer-headtext">Contact Us</h1>
              <p className="p__opensans">{footerData.address}</p>
              <p className="p__opensans">{footerData.phone1}</p>
              <p className="p__opensans">{footerData.phone2}</p>
            </div> */}

            <div className="app__footer-links_logo">
              
              <h1 className="p__opensans, app__footer-headtext">{footerData.name}</h1>
             
              <p className="p__opensans">{footerData.quote}</p>
              <img src={images.spoon} className="spoon__img" style={{ marginTop: 15 }} />
              <div className="app__footer-links_icons">
              <a href={footerData.online_presence.website} target="_blank" rel="noopener noreferrer"><FiGlobe/></a>
                <a href={footerData.online_presence.social_media.facebook} target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
                <a href={footerData.online_presence.social_media.twitter} target="_blank" rel="noopener noreferrer"><FiTwitter /></a>
                <a href={footerData.online_presence.social_media.instagram} target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
              </div>
            </div>

            {/* <div className="app__footer-links_work">
              <h1 className="app__footer-headtext">Working Hours</h1>
              <p className="p__opensans">Monday-Friday:</p>
              <p className="p__opensans">{footerData.workingHoursWeekdays}</p>
              <p className="p__opensans">Saturday-Sunday:</p>
              <p className="p__opensans">{footerData.workingHoursWeekends}</p>
            </div> */}
          </>
        )}
      </div>

      {(footerData &&
          <div className="footer__copyright">
          <p className="p__opensans">2023 &#169;{footerData.name}</p>
          
        </div>

      )}
    </div>
  );
};

export default Footer;
