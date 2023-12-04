import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import img from '../../assets/placeholder.png';
import { getRestaurantData } from '../../components/BackendApi';

export default function App() {
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRestaurantData() {
      try {
        const data = await getRestaurantData();
        setRestaurantData(data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        setError("Error fetching restaurant data. Please try again."); // Set a user-friendly error message
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurantData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }

  if (error) {
    return <p>{error}</p>; // Display an error message to the user
  }

  const defaultCenter = {
    lat: restaurantData?.location?.latitude || 20.95166580,
    lng: restaurantData?.location?.longitude || 85.09852360,
  };

  const defaultMarker = {
    lat: restaurantData?.location?.latitude || 20.95166580,
    lng: restaurantData?.location?.longitude || 85.09852360,
    imageUrl: restaurantData?.image || img, // Use the image from the data, or fallback to the placeholder image
    imageAlt: "Marker",
  };

  return (
    <MapComponent
      center={defaultCenter}
      zoom={11}
      marker={defaultMarker}
      width="300px"
      height="200px"
    />
  );
}
