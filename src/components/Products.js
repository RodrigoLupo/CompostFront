import React, { useState, useEffect } from 'react';
import { getData, createData, updateData, deleteData } from '../api';
import {
  Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  TextField, Button, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    puntos_requeridos: '',
    tipo: 'C',
    imagen: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const productosData = await getData('/productos/');
      setProductos(productosData);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, imagen: e.target.files[0] });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in newProduct) {
      formData.append(key, newProduct[key]);
    }
    const data = await createData('/productos/', formData, true);
    setProductos([...productos, data]);
    setNewProduct({
      nombre: '',
      descripcion: '',
      precio: '',
      puntos_requeridos: '',
      tipo: 'C',
      imagen: null,
    });
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setNewProduct({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      puntos_requeridos: producto.puntos_requeridos,
      tipo: producto.tipo,
      imagen: null,
    });
    setOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in newProduct) {
      formData.append(key, newProduct[key]);
    }
    const data = await updateData('/productos', editingProduct.id, formData, true);
    setProductos(productos.map((producto) => (producto.id === editingProduct.id ? data : producto)));
    setEditingProduct(null);
    setNewProduct({
      nombre: '',
      descripcion: '',
      precio: '',
      puntos_requeridos: '',
      tipo: 'C',
      imagen: null,
    });
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteData('/productos', id);
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setNewProduct({
      nombre: '',
      descripcion: '',
      precio: '',
      puntos_requeridos: '',
      tipo: 'C',
      imagen: null,
    });
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Productos
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {productos.map((producto) => (
            <ListItem key={producto.id} sx={{ mb: 1 }} divider>
              <ListItemText
                primary={`${producto.nombre} - ${producto.descripcion}`}
                secondary={`Precio: ${producto.precio} - Puntos Requeridos: ${producto.puntos_requeridos} - Tipo: ${producto.tipo}`}
              />
              {producto.imagen && (
                <Box component="img" src={producto.imagen} alt={producto.nombre} width="100px" />
              )}
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(producto)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(producto.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box mt={4}>
        <Typography variant="h6" component="h3" gutterBottom>
          {editingProduct ? 'Editar Producto' : 'Crear Producto'}
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <form onSubmit={editingProduct ? handleUpdate : handleCreate}>
            <TextField
              fullWidth
              name="nombre"
              label="Nombre"
              value={newProduct.nombre}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="descripcion"
              label="Descripción"
              value={newProduct.descripcion}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="number"
              name="precio"
              label="Precio"
              value={newProduct.precio}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              type="number"
              name="puntos_requeridos"
              label="Puntos Requeridos"
              value={newProduct.puntos_requeridos}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo</InputLabel>
              <Select
                name="tipo"
                value={newProduct.tipo}
                onChange={handleChange}
                required
              >
                <MenuItem value="C">Canje</MenuItem>
                <MenuItem value="V">Venta</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
              Subir Imagen
              <input type="file" hidden name="imagen" onChange={handleImageChange} accept="image/*" />
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
            {editingProduct && (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleClose}
              >
                Cancelar
              </Button>
            )}
          </form>
        </Paper>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdate}>
            <TextField
              fullWidth
              name="nombre"
              label="Nombre"
              value={newProduct.nombre}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="descripcion"
              label="Descripción"
              value={newProduct.descripcion}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="number"
              name="precio"
              label="Precio"
              value={newProduct.precio}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              type="number"
              name="puntos_requeridos"
              label="Puntos Requeridos"
              value={newProduct.puntos_requeridos}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo</InputLabel>
              <Select
                name="tipo"
                value={newProduct.tipo}
                onChange={handleChange}
                required
              >
                <MenuItem value="C">Canje</MenuItem>
                <MenuItem value="V">Venta</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
              Subir Imagen
              <input type="file" hidden name="imagen" onChange={handleImageChange} accept="image/*" />
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Actualizar Producto
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products;
