import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';

const MAP_CENTER = {
    lat: -0.05561422701172856,
    lng: 109.34854659970061,
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

type MarkerData = {
    id: number;
    name: string;
    coords: string;
};

type ImageData = {
    file_path: string;
    time: string;
};

export default function AppMaps({
    markers = [],
    images = {},
}: {
    markers: MarkerData[];
    images: Record<number, ImageData>; // key: loc_id
}) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    });

    const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);

    if (loadError) {
        console.error('Google Maps failed to load:', loadError);
        return (
            <div className="flex size-full items-center justify-center rounded-md bg-red-100 text-red-600">
                <p className="text-sm font-semibold">Failed to load map</p>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="flex size-full items-center justify-center rounded-md bg-gray-100 text-gray-500">
                <p className="text-sm">Loading map...</p>
            </div>
        );
    }

    return (
        <div className="flex size-full items-center justify-center overflow-hidden rounded-md">
            <GoogleMap
                mapContainerClassName="w-full h-full"
                center={MAP_CENTER}
                zoom={14}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                }}
            >
                {markers.map((marker) => {
                    const [lat, lng] = marker.coords.split(',').map(parseFloat);
                    const isActive = activeMarkerId === marker.id;
                    const image = images[marker.id]; 

                    return (
                        <Marker key={marker.id} position={{ lat, lng }} title={marker.name} onClick={() => setActiveMarkerId(marker.id)}>
                            {isActive && (
                                <InfoWindow onCloseClick={() => setActiveMarkerId(null)}>
                                    <div className="w-48 text-sm">
                                        <p className="mb-4 font-semibold text-black">{marker.name}</p>
                                        {image && (
                                            <img
                                                src={`/storage/${image.file_path}`}
                                                alt={marker.name}
                                                className="mb-2 h-24 w-full rounded-md object-cover"
                                            />
                                        )}
                                        <p className="text-xs text-gray-500">
                                            Lat: {lat.toFixed(6)}, Lng: {lng.toFixed(6)}
                                        </p>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    );
                })}
            </GoogleMap>
        </div>
    );
}
