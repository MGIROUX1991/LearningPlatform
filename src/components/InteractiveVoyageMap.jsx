import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Calendar, Layers } from 'lucide-react';
import { getTerritoriesByYear } from '../data/historicalTerritories';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map view when year changes
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Territory styling function
const territoryStyle = (feature) => {
  return {
    fillColor: feature.properties.color,
    fillOpacity: 0.3,
    color: feature.properties.color,
    weight: 2.5,
    opacity: 0.8,
    dashArray: '0',
  };
};

// Territory interaction handler
const onEachTerritory = (feature, layer) => {
  layer.on({
    mouseover: (e) => {
      const layer = e.target;
      layer.setStyle({
        fillOpacity: 0.5,
        weight: 3,
      });
    },
    mouseout: (e) => {
      const layer = e.target;
      layer.setStyle({
        fillOpacity: 0.3,
        weight: 2.5,
      });
    },
  });

  layer.bindPopup(`
    <div style="font-family: sans-serif;">
      <strong>${feature.properties.name}</strong><br/>
      <small>Pouvoir: ${feature.properties.power}</small>
    </div>
  `);
};

// Component to handle smooth territory transitions
const TerritoryLayer = ({ territories, year, previousYear }) => {
  const [displayTerritories, setDisplayTerritories] = useState(territories);
  const [transitionProgress, setTransitionProgress] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(null);
  const transitionRef = useRef(null);
  const map = useMap();

  // Track zoom level to force re-render and prevent distortion
  useEffect(() => {
    const updateZoom = () => {
      setZoomLevel(map.getZoom());
    };

    map.on('zoomend', updateZoom);
    map.on('zoom', updateZoom);
    updateZoom(); // Initial zoom level

    return () => {
      map.off('zoomend', updateZoom);
      map.off('zoom', updateZoom);
    };
  }, [map]);

  useEffect(() => {
    if (previousYear !== year) {
      // Start transition
      setTransitionProgress(0);
      const startTerritories = getTerritoriesByYear(previousYear);
      setDisplayTerritories(startTerritories);

      // Clear any existing animation
      if (transitionRef.current) {
        cancelAnimationFrame(transitionRef.current);
      }

      // Animate transition
      const duration = 600; // 600ms transition
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation (ease-in-out)
        const eased = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        setTransitionProgress(eased);
        
        if (progress < 1) {
          transitionRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayTerritories(territories);
          setTransitionProgress(1);
          transitionRef.current = null;
        }
      };
      
      transitionRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayTerritories(territories);
      setTransitionProgress(1);
    }

    return () => {
      if (transitionRef.current) {
        cancelAnimationFrame(transitionRef.current);
      }
    };
  }, [year, previousYear, territories]);

  return (
    <>
      {displayTerritories.map((territory, index) => {
        const style = territoryStyle(territory);
        // Fade effect during transition
        const opacity = transitionProgress < 1 
          ? 0.2 + (transitionProgress * 0.3)
          : style.fillOpacity;
        
        return (
          <GeoJSON
            key={`${territory.properties.name}-${year}-${index}-${zoomLevel || 'initial'}`}
            data={territory}
            style={{
              ...style,
              fillOpacity: opacity,
              opacity: Math.min(transitionProgress + 0.3, 1),
            }}
            onEachFeature={onEachTerritory}
            eventHandlers={{
              add: (e) => {
                // Force proper rendering when layer is added
                const layer = e.target;
                if (layer && layer.redraw) {
                  setTimeout(() => layer.redraw(), 0);
                }
              }
            }}
          />
        );
      })}
    </>
  );
};

const InteractiveVoyageMap = ({ onLandingSelect, selectedYear, onYearChange }) => {
  const [landingLocation, setLandingLocation] = useState(null);
  const [showLayers, setShowLayers] = useState(true);
  const [previousYear, setPreviousYear] = useState(selectedYear);
  const mapRef = useRef(null);

  // Center on Quebec/New France region
  const mapCenter = [46.8, -71.2]; // Quebec City coordinates
  const mapZoom = 6;

  const territories = getTerritoriesByYear(selectedYear);

  // Update previous year when year changes (for transitions)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (previousYear !== selectedYear) {
        setPreviousYear(selectedYear);
      }
    }, 50); // Small delay to allow transition to start
    
    return () => clearTimeout(timer);
  }, [selectedYear]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const location = { lat, lng, year: selectedYear };
    setLandingLocation(location);
    if (onLandingSelect) {
      onLandingSelect(location);
    }
  };

  const getLocationName = (lat, lng) => {
    // Simple location identification (can be enhanced with reverse geocoding)
    if (lat >= 46.7 && lat <= 46.9 && lng >= -71.3 && lng <= -71.1) {
      return 'Québec';
    }
    if (lat >= 45.4 && lat <= 45.6 && lng >= -73.6 && lng <= -73.4) {
      return 'Montréal';
    }
    if (lat >= 46.5 && lat <= 46.7 && lng >= -71.2 && lng <= -71.0) {
      return 'Trois-Rivières';
    }
    return `Position: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-blue-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Year Selector */}
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-400" />
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Année</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="1500"
                  max="1760"
                  step="10"
                  value={selectedYear}
                  onChange={(e) => onYearChange(parseInt(e.target.value))}
                  className="w-32 sm:w-48"
                />
                <span className="text-white font-semibold min-w-[60px]">{selectedYear}</span>
              </div>
            </div>
          </div>

          {/* Layer Toggle */}
          <button
            onClick={() => setShowLayers(!showLayers)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              showLayers
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-sm">Territoires</span>
          </button>
        </div>

        {/* Quick Year Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[1608, 1663, 1713, 1759, 1760].map((year) => (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`px-3 py-1 rounded text-sm transition-all ${
                selectedYear === year
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-blue-500/20">
        <div className="relative" style={{ height: '600px', width: '100%' }}>
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
            zoomControl={false}
            whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
            }}
          >
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            <ZoomControl position="topright" />

            {/* Base Map Layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              updateWhenZooming={true}
              updateWhenIdle={true}
            />

            {/* Territory Layers with Smooth Transitions */}
            {showLayers && (
              <TerritoryLayer 
                territories={territories} 
                year={selectedYear}
                previousYear={previousYear}
              />
            )}

            {/* Landing Location Marker */}
            {landingLocation && (
              <Marker
                position={[landingLocation.lat, landingLocation.lng]}
                icon={new L.Icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                })}
              >
                <Popup>
                  <div style={{ fontFamily: 'sans-serif' }}>
                    <strong>Point d'atterrissage</strong><br />
                    {getLocationName(landingLocation.lat, landingLocation.lng)}<br />
                    <small>Année: {landingLocation.year}</small>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Click Handler */}
            <MapClickHandler onMapClick={handleMapClick} />
          </MapContainer>
        </div>

        {/* Instructions */}
        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-sm text-gray-300">
            <strong className="text-blue-300">Instructions:</strong> Cliquez sur la carte pour choisir votre point d'atterrissage. 
            Utilisez le curseur d'année pour voir comment les territoires ont changé au fil du temps.
          </p>
        </div>

        {/* Landing Info */}
        {landingLocation && (
          <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">Point d'atterrissage sélectionné</h3>
                <p className="text-gray-300 text-sm">
                  {getLocationName(landingLocation.lat, landingLocation.lng)}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Coordonnées: {landingLocation.lat.toFixed(4)}, {landingLocation.lng.toFixed(4)}
                </p>
                <p className="text-gray-400 text-xs">
                  Année: {landingLocation.year}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component to handle map clicks
const MapClickHandler = ({ onMapClick }) => {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e) => {
      onMapClick(e);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onMapClick]);

  return null;
};

export default InteractiveVoyageMap;

