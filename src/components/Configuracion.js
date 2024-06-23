import React, { useEffect, useState } from 'react';
import { getData, updateDato } from '../api';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';

const Configuracion = () => {
  const [conversionRate, setConversionRate] = useState(100);

  useEffect(() => {
    const fetchConfiguracion = async () => {
      const data = await getData('/configuracion/');
      setConversionRate(data.conversion_rate);
    };

    fetchConfiguracion();
  }, []);

  const handleUpdate = async () => {
    const data = await updateDato('/configuracion/', { conversion_rate: conversionRate });
    setConversionRate(data.conversion_rate);
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Configuración
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            type="number"
            label="Tasa de Conversión (puntos por kilo)"
            value={conversionRate}
            onChange={(e) => setConversionRate(e.target.value)}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            fullWidth
            sx={{ mt: 2 }}
          >
            Actualizar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Configuracion;