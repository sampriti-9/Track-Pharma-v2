import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "../assets/marker.png";

// 🔴 Custom Marker
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// 🔄 Map auto-center
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 15);
  return null;
}

function GPSMap() {
  const [position, setPosition] = useState([19.0760, 72.8777]); // default

  useEffect(() => {
    const gpsRef = ref(db, "gpsData");

    onValue(gpsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const keys = Object.keys(data);
        const lastKey = keys[keys.length - 1];
        const latest = data[lastKey];

        if (latest?.latitude && latest?.longitude) {
          setPosition([latest.latitude, latest.longitude]);
        }
      }
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "400px", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        
        {/* Live movement */}
        <ChangeView center={position} />

        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={customIcon}>
          <Popup>📍 Live Location</Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}

export default GPSMap;