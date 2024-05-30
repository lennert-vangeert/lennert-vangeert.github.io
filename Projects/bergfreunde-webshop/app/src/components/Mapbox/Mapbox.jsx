import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import style from "./Mapbox.module.css";

const Mapbox = () => {
  const geoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [3.7281653839295052, 51.04087104716833],
        },
        properties: {
          title: "Onze winkel",
        },
      },
    ],
  };

  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  if (!mapboxToken) {
    throw new Error(
      "Mapbox token is not defined. Please check your .env file."
    );
  }
  mapboxgl.accessToken = mapboxToken;
  const mapContainerRef = useRef(null);

  //   51.04087104716833,
  const [lng, setLng] = useState(3.7281653839295052);
  const [lat, setLat] = useState(51.04087104716833);
  const [zoom, setZoom] = useState(14);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    geoJson.features.map((feature) =>
      new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <div className="sidebarStyle"></div>
      <div className={style.map_container} ref={mapContainerRef} />
    </div>
  );
};

export default Mapbox;
