import React from 'react';
import "./DetailPopover.css"; 

import { toDMS } from '~/services/geo';

import type { Vehicle } from '~/types/database_functions.types';

interface DetailProps {
  vehicle: Vehicle;
  style: React.CSSProperties;
}

const DetailPopover: React.FC<DetailProps> = ({ vehicle, style }) => {

  const longitudeDMS = toDMS(vehicle.longitude, 'lon');
  const latitudeDMS = toDMS(vehicle.latitude, 'lat');
    
  return (
    <div 
      className="vehicle_detail_popover"
      style={{
          position: 'absolute',
          ...style,
        }}>
      <h2>{vehicle.vehicle_label}</h2>
      <p>{longitudeDMS}, {latitudeDMS}</p>
    </div>
  )
}

export default DetailPopover;