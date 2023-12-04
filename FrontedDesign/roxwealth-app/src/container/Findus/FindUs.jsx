import React, { useEffect, useState } from 'react';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import Map from '../Map/Map';
import { getRestaurantData } from '../../components/BackendApi';

const FindUs = () => {
  const [restaurantData, setRestaurantData] = useState(null);
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
    <div className="app__bg app__wrapper section__padding" id="contact">
      <div className="app__wrapper_info">
        <SubHeading title="Contact" />
        <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>Find Us</h1>
        <div className="app__wrapper-content">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {restaurantData && (
            <>
              <p className="p__opensans">{restaurantData.location.address}</p>

              
              {/* <p className="p__cormorant" style={{ color: '#DCCA87', margin: '2rem 0' }}>Opening Hours</p>
              <p className="p__opensans">Mon - Fri: {restaurantData.openingHours.weekdays}</p>
              <p className="p__opensans">Sat - Sun: {restaurantData.openingHours.weekends}</p> */}
  
              <Map />
            </>
          )}
        </div>
        <button type="button" className="custom__button" style={{ marginTop: '2rem' }}>Visit Us</button>
      </div>

      <div className="app__wrapper_img">
        <img src={images.findus} alt="finus_img" />
      </div>
    </div>
  );
};

export default FindUs;
