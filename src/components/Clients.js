import React, { useEffect, useState } from 'react';
import { getData, createData, updateData, deleteData } from '../api';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, TextField, Button, Paper, Box } from '@mui/material';

const Clients = () => {
  const [clientes, setClientes] = useState([]);
  const [newClient, setNewClient] = useState({ nombre: '', apellidos: '', dni: '', ruc: '', ubicacion: '' });

  useEffect(() => {
    const fetchClientes = async () => {
      const data = await getData('/clientes/');
      setClientes(data);
    };

    fetchClientes();
  }, []);

  const handleCreate = async () => {
    const data = await createData('/clientes/', newClient);
    setClientes([...clientes, data]);
    setNewClient({ nombre: '', apellidos: '', dni: '', ruc: '', ubicacion: '' }); // Limpiar el formulario después de crear
  };

  const handleUpdate = async (id, updatedClient) => {
    const data = await updateData('/clientes', id, updatedClient);
    setClientes(clientes.map((client) => (client.id === id ? data : client)));
  };

  const handleDelete = async (id) => {
    await deleteData('/clientes', id);
    setClientes(clientes.filter((client) => client.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Clientes
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {clientes.map((client) => (
            <ListItem key={client.id} disablePadding>
              <ListItemText
                primary={`${client.nombre} ${client.apellidos}`}
                secondary={`DNI: ${client.dni} - RUC: ${client.ruc} - Ubicación: ${client.ubicacion}`}
              />
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdate(client.id, {
                    nombre: prompt('Nuevo nombre:', client.nombre),
                    apellidos: prompt('Nuevos apellidos:', client.apellidos),
                    dni: prompt('Nuevo DNI:', client.dni),
                    ruc: prompt('Nuevo RUC:', client.ruc),
                    ubicacion: prompt('Nueva ubicación:', client.ubicacion)
                  })}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDelete(client.id)}
                  sx={{ ml: 1 }}
                >
                  Eliminar
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box component="form" sx={{ mt: 2 }} noValidate autoComplete="off">
        <TextField
          fullWidth
          type="text"
          label="Nombre"
          value={newClient.nombre}
          onChange={(e) => setNewClient({ ...newClient, nombre: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="text"
          label="Apellidos"
          value={newClient.apellidos}
          onChange={(e) => setNewClient({ ...newClient, apellidos: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="text"
          label="DNI"
          value={newClient.dni}
          onChange={(e) => setNewClient({ ...newClient, dni: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="text"
          label="RUC"
          value={newClient.ruc}
          onChange={(e) => setNewClient({ ...newClient, ruc: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          type="text"
          label="Ubicación"
          value={newClient.ubicacion}
          onChange={(e) => setNewClient({ ...newClient, ubicacion: e.target.value })}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ mt: 2 }}
        >
          Crear
        </Button>
      </Box>
    </Container>
  );
};

export default Clients;
