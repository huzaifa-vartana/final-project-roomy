"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoianV0dHUiLCJhIjoiY2x2NHhlbG5wMGNzNjJqcDV6cThhZmVnaCJ9.xAOGHa9cDK16JwlUkMmmdA";

const MarkerComponent = ({ price }: { price: number }) => (
  <div
    style={{
      backgroundColor: "black",
      width: "40px",
      height: "30px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }}
  >
    {`$${price}`}
  </div>
);

export interface PropertyMapProps {
  latitute: number;
  longitude: number;
  price: number;
}

export default function PropertyMap({
  mapsInfo,
}: {
  mapsInfo: PropertyMapProps;
}) {
  const mapContainerRef = useRef(null);
  console.log(mapsInfo, "mapsInfo");

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [mapsInfo.longitude, mapsInfo.latitute], // Initial coordinates [lng, lat]
      zoom: 16,
    });
    const markerEl = document.createElement("div");
    markerEl.className = "marker";
    ReactDOM.render(<MarkerComponent price={mapsInfo.price} />, markerEl);
    new mapboxgl.Marker(markerEl, { offset: [0, -20] })
      .setLngLat([mapsInfo.longitude, mapsInfo.latitute])
      .addTo(map);

    return () => map.remove();
  }, [mapsInfo]);

  return (
    <section className="w-full px-4 md:px-6 mt-6">
      <Card className="rounded-lg bg-card text-card-foreground border-2 p-4 md:p-6 ml-6 mr-6">
        <CardHeader>
          <CardTitle>Map Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={mapContainerRef}
            className="w-full h-96 rounded-lg overflow-hidden"
          />
        </CardContent>
      </Card>
    </section>
  );
}
