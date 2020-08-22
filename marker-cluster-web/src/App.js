import React from 'react';
import useSwr from 'swr';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import './GlobalStyles.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: -23.31509536897005,
  lng: -46.57099951314262,
};

const Marker = ({ children }) => children;

export default function App() {
  const mapRef = React.useRef();

  const [zoom, setZoom] = React.useState(10);
  const [baseUrl] = React.useState(`http://localhost:3333/api/v1`);
  const [url, setUrl] = React.useState(baseUrl);

  const { data, error } = useSwr(url, { fetcher });
  const clusters = data && !error ? data.data : [];

  return (
    <div style={mapContainerStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setUrl(
            `${baseUrl}?zoom=${zoom}&nwlng=${bounds.nw.lng}&selat=${bounds.se.lat}&selng=${bounds.se.lng}&nwlat=${bounds.nw.lat}`
          );
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${20}px`,
                    height: `${20}px`,
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`point-${cluster.properties.name}`}
              lat={latitude}
              lng={longitude}
            >
              <button
                className="point-marker"
                type="button"
                title={`Nome: ${cluster.properties.name} Coord.: ${cluster.geometry.coordinates}`}
              >
                <img src="/map-marker.svg" alt={cluster.properties.name} />
              </button>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
