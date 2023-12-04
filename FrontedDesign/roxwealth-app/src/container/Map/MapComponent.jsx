import React from "react";
import GoogleMapReact from 'google-map-react';

const ImageMarker = ({ lat, lng, imageUrl, imageAlt }) => (
  <div
    style={{
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      top: 0,
      left: 0,
      zIndex: 1, // Ensure the marker is above the map
    }}
  >
    <img src={imageUrl} alt={imageAlt} width="30px" height="30px" />
  </div>
);

const MapComponent = ({ center, zoom, marker, width, height }) => (
  <div style={{ width, height }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: "google_api_key" }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      {marker && <ImageMarker {...marker} />}
    </GoogleMapReact>
  </div>
);

export default MapComponent;
