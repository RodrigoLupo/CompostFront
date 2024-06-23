import React, { useEffect, useState } from 'react';
import { getSensorData, getServoMotorState, updateServoMotorState } from '../api';
import { Button, Container, Paper, Typography, Box } from '@mui/material';
import './WeatherWidget.css';

// Componente de icono para la temperatura
const TemperatureIcon = ({ temperature }) => {
  let iconClass = 'fas fa-thermometer-half';
  let colorClass = '';
  let progress = (temperature / 50) * 100;

  if (temperature > 50) {
    iconClass = 'fas fa-thermometer-full';
    colorClass = 'text-danger';
    progress = 100;
  } else if (temperature > 25) {
    iconClass = 'fas fa-thermometer-three-quarters';
    colorClass = 'text-warning';
  } else if (temperature < 15) {
    iconClass = 'fas fa-thermometer-quarter';
    colorClass = 'text-primary';
  }

  return (
    <div className="icon">
      <i className={`${iconClass} ${colorClass}`}></i>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{temperature} °C</p>
    </div>
  );
};

// Componente de icono para la humedad
const HumidityIcon = ({ humidity }) => {
  let iconClass = 'fas fa-tint';
  let progress = humidity;

  return (
    <div className="icon">
      <i className={iconClass}></i>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{humidity}%</p>
    </div>
  );
};

const WeatherWidget = () => {
  const [device, setDevice] = useState(false);
  const [data, setData] = useState({ humidity: '', temperature: '' });
  const [servoMotorState, setServoMotorState] = useState(false);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const sensorData = await getSensorData();
        setData({ humidity: sensorData.humidity, temperature: sensorData.temperature });
        setDevice(true);
      } catch (error) {
        setDevice(false);
        console.error('Error fetching sensor data:', error);
      }
    };

    const fetchServoMotorState = async () => {
      try {
        const servoData = await getServoMotorState();
        setServoMotorState(servoData.is_active); // Assuming the state is stored in 'is_active'
      } catch (error) {
        console.error('Error fetching servo motor state:', error);
      }
    };

    fetchSensorData();
    fetchServoMotorState();

    const interval = setInterval(() => {
      fetchSensorData();
      fetchServoMotorState();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleServoToggle = async () => {
    try {
      const newState = !servoMotorState;
      await updateServoMotorState({ is_active: newState });
      setServoMotorState(newState);
    } catch (error) {
      console.error('Error updating servo motor state:', error);
    }
  };

  return (
    <Container className="weather-widget">
      <header>
        <div className="status">
          <b>Device</b>
          <div className={device ? 'status-icon success' : 'status-icon danger'}></div>
          <p>{device ? 'online' : 'offline'}</p>
        </div>
      </header>
      <main>
        <Paper elevation={3} className="sensor">
          <TemperatureIcon temperature={parseFloat(data.temperature)} />
          <HumidityIcon humidity={parseFloat(data.humidity)} />
        </Paper>
        <Box mt={4}>
          <Button
            variant="contained"
            style={{ backgroundColor: servoMotorState ? 'green' : 'red', color: 'white' }}
            onClick={handleServoToggle}
          >
            {servoMotorState ? 'Servo ON' : 'Servo OFF'}
          </Button>
        </Box>
      </main>
    </Container>
  );
};

export default WeatherWidget;
