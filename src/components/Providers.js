import React, { useEffect, useState } from 'react';
import { getData, createData, updateData, deleteData } from '../api';
import {
  Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  TextField, Button, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Providers = () => {
  const [proveedores, setProveedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newProvider, setNewProvider] = useState({ user: '', puntos_acumulados: 0 });
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [open, setOpen] = useState(false);
  const [editProvider, setEditProvider] = useState({ user: '', puntos_acumulados: 0 });

  useEffect(() => {
    const fetchProveedores = async () => {
      const proveedoresData = await getData('/proveedores/');
      const usuariosData = await getData('/usuarios/');
      setProveedores(proveedoresData);
      setUsuarios(usuariosData);
    };

    fetchProveedores();
  }, []);

  const handleCreate = async () => {
    const data = await createData('/proveedores/', newProvider);
    setProveedores([...proveedores, data]);
    setNewProvider({ user: '', puntos_acumulados: 0 });
  };

  const handleUpdate = async () => {
    if (!selectedProvider) return;

    const data = await updateData(`/proveedores`, selectedProvider.id, editProvider);
    setProveedores(proveedores.map((provider) => (provider.id === selectedProvider.id ? data : provider)));
    setSelectedProvider(null);
    setEditProvider({ user: '', puntos_acumulados: 0 });
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteData('/proveedores', id);
    setProveedores(proveedores.filter((provider) => provider.id !== id));
  };

  const handleEditClick = (provider) => {
    setSelectedProvider(provider);
    setEditProvider({ user: provider.user, puntos_acumulados: provider.puntos_acumulados });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProvider(null);
    setEditProvider({ user: '', puntos_acumulados: 0 });
  };

  const getUserName = (userId) => {
    const user = usuarios.find(user => user.id === userId);
    return user ? user.username : 'Desconocido';
  };

  const getAvailableUsers = () => {
    const assignedUserIds = proveedores.map(provider => provider.user);
    return usuarios.filter(user => !assignedUserIds.includes(user.id));
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Proveedores
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {proveedores.map((provider) => (
            <ListItem key={provider.id} sx={{ mb: 1 }} divider>
              <ListItemText primary={`Proveedor ID: ${provider.id} - Usuario: ${getUserName(provider.user)} - Puntos: ${provider.puntos_acumulados}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(provider)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(provider.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box mt={4}>
        <Typography variant="h6" component="h3" gutterBottom>
          Crear Nuevo Proveedor
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Seleccione un usuario</InputLabel>
            <Select
              value={newProvider.user}
              onChange={(e) => setNewProvider({ ...newProvider, user: e.target.value })}
            >
              <MenuItem value="" disabled>Seleccione un usuario</MenuItem>
              {getAvailableUsers().map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="number"
            label="Puntos acumulados"
            value={newProvider.puntos_acumulados}
            onChange={(e) => setNewProvider({ ...newProvider, puntos_acumulados: e.target.value })}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            fullWidth
            sx={{ mt: 2 }}
          >
            Crear
          </Button>
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Proveedor</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Seleccione un usuario</InputLabel>
            <Select
              value={editProvider.user}
              onChange={(e) => setEditProvider({ ...editProvider, user: e.target.value })}
            >
              <MenuItem value="" disabled>Seleccione un usuario</MenuItem>
              {usuarios.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="number"
            label="Puntos acumulados"
            value={editProvider.puntos_acumulados}
            onChange={(e) => setEditProvider({ ...editProvider, puntos_acumulados: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Providers;
