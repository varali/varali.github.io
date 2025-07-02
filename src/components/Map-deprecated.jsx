import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

/* How to integrate */
// import Map from "./components/Map";
// const mapboxAccessToken =
//   "pk.eyJ1IjoiY3JuZXdib2xkIiwiYSI6ImNtN2NnYzZrYTBvcHEya3E4cWI0ajFtam0ifQ.macU8rj2--3ACPSKKlZ39g";
//  <Map accessToken={mapboxAccessToken} />

export default function Map({ accessToken }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12", // Style URL
      center: [-74.5, 40], // Initial center coordinates [lng, lat]
      zoom: 9, // Initial zoom level
    });

    // Cleanup function to remove map on unmount
    return () => map.remove();
  }, [accessToken]);

  return (
    <div className="map">
      <div ref={mapContainer} style={{ width: "100%", height: "600px" }} />
    </div>
  );
}
