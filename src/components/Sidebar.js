import React from 'react';
import { Link } from 'react-router-dom';
import WeatherWidget from './WeatherWidget';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="dashboard/users">Usuarios</Link></li>
        <li><Link to="dashboard/providers">Proveedores</Link></li>
        <li><Link to="dashboard/clients">Clientes</Link></li>
        <li><Link to="dashboard/products">Productos</Link></li>
        <li><Link to="dashboard/sales">Ventas</Link></li>
        <li><Link to="dashboard/exchanges">Canjes</Link></li>
        <li><Link to="dashboard/kilos">Kilos</Link></li>
        <li><Link to="dashboard/monitoreo">Monitoreo</Link></li> {/* Nuevo enlace */}
      </ul>
    </div>
  );
};

export default Sidebar;

