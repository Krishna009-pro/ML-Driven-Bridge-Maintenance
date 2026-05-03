import React, { useState, useRef, useEffect } from "react";

const MapComponent = ({ apiKey, bridgeLocation }) => {
  const mapRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [marker, setMarker] = useState(null); // To hold the marker

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initMap();
        return;
      }

      const existingScript = document.querySelector("script[src*='maps.googleapis.com']");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => initMap();
        script.onerror = () => console.error("Failed to load Google Maps API");
        document.head.appendChild(script);
      } else {
        existingScript.onload = () => initMap();
      }
    };

    loadGoogleMaps();

    return () => {
      if (autocomplete) {
        autocomplete.removeListener("place_changed", handlePlaceSelect);
      }
    };
  }, [apiKey, bridgeLocation]);

  const initMap = () => {
    if (!window.google || !window.google.maps || !mapRef.current) return;

    const defaultLocation = bridgeLocation || { lat: 19.9975, lng: 73.7898 }; // Use bridgeLocation or fallback to default

    const newMap = new google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 12, // Set zoom level
    });
    setMap(newMap);

    const newMarker = new google.maps.Marker({
      position: defaultLocation,
      map: newMap,
      title: "Bridge Location",
    });
    setMarker(newMarker);

    if (autoCompleteRef.current) {
      const newAutocomplete = new google.maps.places.Autocomplete(autoCompleteRef.current);
      setAutocomplete(newAutocomplete);
      newAutocomplete.addListener("place_changed", handlePlaceSelect);
    }
  };

  const handlePlaceSelect = () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      console.error("Place details not available for input: " + place.formatted_address);
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(15);
    }

    // Move the marker to the selected place
    if (marker) {
      marker.setPosition(place.geometry.location);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        ref={autoCompleteRef}
        type="text"
        placeholder="Search a location..."
        style={{
          width: "80%",
          maxWidth: "400px",
          padding: "10px",
          margin: "20px 0",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      />
      <div
        ref={mapRef}
        style={{ width: "90%", height: "500px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}
      />
    </div>
  );
};

export default MapComponent;
