import React, { useEffect, useState } from 'react';
import { getData, createData, updateData, deleteData } from '../api';
import { 
  Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  TextField, Button, Paper, Box, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Kilos = () => {
  const [kilos, setKilos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newKilo, setNewKilo] = useState({ proveedor: '', kilos: 0, descripcion: '' });
  const [conversionRate, setConversionRate] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      const kilosData = await getData('/kilos/');
      const proveedoresData = await getData('/proveedores/');
      const usuariosData = await getData('/usuarios/');
      const configuracion = await getData('/configuracion/'); // Endpoint para obtener configuración

      setKilos(kilosData);
      setProveedores(proveedoresData);
      setUsuarios(usuariosData);
      setConversionRate(configuracion.conversion_rate); // Asignar la tasa de conversión desde la configuración
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    const data = await createData('/kilos/', newKilo);
    setKilos([...kilos, data]);
    
    // Actualiza los puntos del proveedor en la API
    const proveedor = proveedores.find(prov => prov.id === newKilo.proveedor);
    if (proveedor) {
      const updatedPoints = proveedor.puntos_acumulados + newKilo.kilos * conversionRate;
      await updateData('/proveedores', proveedor.id, { ...proveedor, puntos_acumulados: updatedPoints });
      setProveedores(proveedores.map(prov => prov.id === proveedor.id ? { ...prov, puntos_acumulados: updatedPoints } : prov));
    }
  };

  const handleUpdate = async (id, updatedKilo) => {
    const data = await updateData('/kilos', id, updatedKilo);
    setKilos(kilos.map(kilo => (kilo.id === id ? data : kilo)));
  };

  const handleDelete = async (id) => {
    await deleteData('/kilos', id);
    setKilos(kilos.filter(kilo => kilo.id !== id));
  };

  const getProveedorName = (proveedorId) => {
    const proveedor = proveedores.find(prov => prov.id === proveedorId);
    if (!proveedor) return 'Desconocido';

    const user = usuarios.find(user => user.id === proveedor.user);
    return user ? user.username : 'Desconocido';
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Kilos
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {kilos.map(kilo => (
            <ListItem key={kilo.id} sx={{ mb: 1 }} divider>
              <ListItemText
                primary={`Proveedor: ${getProveedorName(kilo.proveedor)} - Kilos: ${kilo.kilos} - Descripción: ${kilo.descripcion}`}
                secondary={`Fecha: ${new Date(kilo.fecha).toLocaleString()}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleUpdate(kilo.id, {
                  proveedor: prompt('Nuevo proveedor (ID):', kilo.proveedor),
                  kilos: prompt('Nuevos kilos:', kilo.kilos),
                  descripcion: prompt('Nueva descripción:', kilo.descripcion)
                })}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(kilo.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box mt={4}>
        <Typography variant="h6" component="h3" gutterBottom>
          Agregar Kilos
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Proveedor</InputLabel>
            <Select
              value={newKilo.proveedor}
              onChange={(e) => setNewKilo({ ...newKilo, proveedor: e.target.value })}
              required
            >
              <MenuItem value="" disabled>Seleccione un proveedor</MenuItem>
              {proveedores.map(proveedor => (
                <MenuItem key={proveedor.id} value={proveedor.id}>
                  {getProveedorName(proveedor.id)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="number"
            name="kilos"
            label="Kilos"
            value={newKilo.kilos}
            onChange={(e) => setNewKilo({ ...newKilo, kilos: parseFloat(e.target.value) })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            name="descripcion"
            label="Descripción"
            value={newKilo.descripcion}
            onChange={(e) => setNewKilo({ ...newKilo, descripcion: e.target.value })}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleCreate}
          >
            Agregar Kilos
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Kilos;
