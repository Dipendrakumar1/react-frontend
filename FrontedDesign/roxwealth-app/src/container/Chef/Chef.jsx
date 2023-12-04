import React, { useEffect, useState } from 'react';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import sign from '../../assets/chef_signature.png';
import { getRestaurantData } from '../../components/BackendApi';
import './Chef.css';

const Chef = () => {
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
    <div className="app__bg app__wrapper section__padding">
      <div className="app__wrapper_img app__wrapper_img-reverse">
        <img src={images.chef} alt="chef_image" />
      </div>
      <div className="app__wrapper_info">
        <SubHeading title="Chef's word" />
        <h1 className="headtext__cormorant">What we believe in</h1>

        <div className="app__chef-content">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {restaurantData && (
            <>
              <div className="app__chef-content_quote">
                <img src={images.quote} alt="quote_image" />
                <p className="p__opensans">Food is a powerful force that can bring people together</p> 
              </div>
              <p className="p__opensans">{restaurantData.beliefStatement}</p>
            </>
          )}
        </div>

        <div className="app__chef-sign">
          {restaurantData && (
            <>
              <p>{restaurantData.chefName}</p>
              <p className="p__opensans">Chef & Founder</p>
              <p className="p__opensans">{restaurantData.chef.name}</p>
              <img src={sign} alt="sign_image" />
              <br/>
              <p className="p__opensans">( "{restaurantData.chef.bio}" )</p>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chef;



// import React from 'react';

// import { SubHeading } from '../../components';
// import { images } from '../../constants';
// import './Chef.css';

// const Chef = () => (
//   <div className="app__bg app__wrapper section__padding">
//     <div className="app__wrapper_img app__wrapper_img-reverse">
//       <img src={images.chef} alt="chef_image" />
//     </div>
//     <div className="app__wrapper_info">
//       <SubHeading title="Chef's word" />
//       <h1 className="headtext__cormorant">What we believe in</h1>

//       <div className="app__chef-content">
//         <div className="app__chef-content_quote">
//           <img src={images.quote} alt="quote_image" />
//           <p className="p__opensans">Lorem ipsum dolor sit amet, consectetur adipiscing elit auctor sit .</p>
//         </div>
//         <p className="p__opensans"> auctor sit iaculis in arcu. Vulputate nulla lobortis mauris eget sit. Nulla scelerisque scelerisque congue ac consequat, aliquam molestie lectus eu. Congue iaculis integer curabitur semper sit nunc. </p>
//       </div>

//       <div className="app__chef-sign">
//         <p>Kevin Luo</p>
//         <p className="p__opensans">Chef & Founder</p>
//         <img src={images.sign} alt="sign_image" />
//       </div>
//     </div>
//   </div>
// );

// export default Chef;
