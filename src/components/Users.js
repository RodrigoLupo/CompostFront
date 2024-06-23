import React, { useEffect, useState } from 'react';
import { getData, createData, updateData, deleteData } from '../api';
import { 
  Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, 
  TextField, Button, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({ username: '', password: '' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await getData('/usuarios/');
      setUsuarios(data);
    };

    fetchUsuarios();
  }, []);

  const handleCreate = async () => {
    const data = await createData('/register/', newUser);
    setUsuarios([...usuarios, data]);
    setNewUser({ username: '', password: '' });
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    const data = await updateData(`/update-user`, selectedUser.id, editUser);
    setUsuarios(usuarios.map((user) => (user.id === selectedUser.id ? data.user : user)));
    setSelectedUser(null);
    setEditUser({ username: '', password: '' });
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteData('/usuarios', id);
    setUsuarios(usuarios.filter((user) => user.id !== id));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditUser({ username: user.username, password: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setEditUser({ username: '', password: '' });
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Usuarios
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {usuarios.map((user) => (
            <ListItem key={user.id} sx={{ mb: 1 }} divider>
              <ListItemText primary={user.username} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(user)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box mt={4}>
        <Typography variant="h6" component="h3" gutterBottom>
          Crear Nuevo Usuario
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <TextField
            fullWidth
            label="Nuevo usuario"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre de usuario"
            value={editUser.username}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Nueva contraseña"
            type="password"
            value={editUser.password}
            onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
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

export default Users;
