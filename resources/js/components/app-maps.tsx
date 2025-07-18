import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const MAP_CENTER = {
    lat: -0.05561422701172856,
    lng: 109.34854659970061,
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function AppMaps() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    });

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
            />
        </div>
    );
}
