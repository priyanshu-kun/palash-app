import { useState, ChangeEvent } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from './Button';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Location {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  coordinates?: Coordinates;
}

interface LocationPickerProps {
  value: Location;
  onChange: (location: Location) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleInputChange = (field: keyof Location, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange({
          ...value,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        setIsGettingLocation(false);
      },
      () => {
        alert('Unable to retrieve your location');
        setIsGettingLocation(false);
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Address"
          value={value.address || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('address', e.target.value)}
        />
        <Input
          placeholder="City"
          value={value.city || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('city', e.target.value)}
        />
        <Input
          placeholder="State"
          value={value.state || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('state', e.target.value)}
        />
        <Input
          placeholder="Country"
          value={value.country || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('country', e.target.value)}
        />
        <Input
          placeholder="Postal Code"
          value={value.postalCode || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('postalCode', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
          >
            {isGettingLocation ? 'Getting location...' : 'Get Current Location'}
          </Button>
        </div>
        {value.coordinates && (
          <div className="text-sm text-gray-600">
            <p>Latitude: {value.coordinates.latitude}</p>
            <p>Longitude: {value.coordinates.longitude}</p>
          </div>
        )}
      </div>
    </div>
  );
} 