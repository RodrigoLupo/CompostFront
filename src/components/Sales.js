import React, { useEffect, useState } from 'react';
import { getData, createData, updateData, deleteData } from '../api';
import {
  Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  TextField, Button, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Sales = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [newTransaction, setNewTransaction] = useState({ producto: '', cantidad: 1 });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const transaccionesData = await getData('/transacciones/');
      const clientesData = await getData('/clientes/');
      const productosData = await getData('/productos/');
      setTransacciones(transaccionesData.filter(tx => tx.tipo === 'V'));
      setClientes(clientesData);
      setProductos(productosData.filter(product => product.tipo === 'V'));
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    const producto = productos.find(prod => prod.id === parseInt(newTransaction.producto));
    if (!producto) {
      alert('Producto no encontrado');
      return;
    }

    const total = producto.precio * newTransaction.cantidad;
    const puntosUtilizados = producto.puntos_requeridos * newTransaction.cantidad;

    const data = await createData('/transacciones/', { 
      ...newTransaction, 
      cliente: selectedCliente,
      total: total,
      puntos_utilizados: puntosUtilizados,
      tipo: 'V'
    });
    setTransacciones([...transacciones, data]);
    setNewTransaction({ producto: '', cantidad: 1 });
  };

  const handleUpdate = async () => {
    const producto = productos.find(prod => prod.id === parseInt(editingTransaction.producto));
    if (!producto) {
      alert('Producto no encontrado');
      return;
    }

    const total = producto.precio * editingTransaction.cantidad;
    const puntosUtilizados = producto.puntos_requeridos * editingTransaction.cantidad;

    const data = await updateData('/transacciones', editingTransaction.id, { 
      ...editingTransaction,
      total: total,
      puntos_utilizados: puntosUtilizados
    });
    setTransacciones(transacciones.map(tx => (tx.id === editingTransaction.id ? data : tx)));
    setEditingTransaction(null);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteData('/transacciones', id);
    setTransacciones(transacciones.filter(tx => tx.id !== id));
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTransaction(null);
  };

  const getClienteName = (clienteId) => {
    const cliente = clientes.find(cli => cli.id === clienteId);
    return cliente ? `${cliente.nombre} ${cliente.apellidos}` : 'Desconocido';
  };

  const getProductoName = (productoId) => {
    const producto = productos.find(prod => prod.id === productoId);
    return producto ? producto.nombre : 'Desconocido';
  };

  const getTotalPuntos = (productoId, cantidad) => {
    const producto = productos.find(prod => prod.id === productoId);
    return producto ? producto.puntos_requeridos * cantidad : 0;
  };

  const getTotalPrice = (productoId, cantidad) => {
    const producto = productos.find(prod => prod.id === productoId);
    return producto ? producto.precio * cantidad : 0;
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Ventas
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {transacciones.map(tx => (
            <ListItem key={tx.id} sx={{ mb: 1 }} divider>
              <ListItemText primary={`Cliente: ${getClienteName(tx.cliente)} - Producto: ${getProductoName(tx.producto)} - Cantidad: ${tx.cantidad} - Total: ${tx.total} - Puntos Utilizados: ${tx.puntos_utilizados}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(tx)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(tx.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box mt={4}>
        <Typography variant="h6" component="h3" gutterBottom>
          Crear Nueva Venta
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Seleccione un cliente</InputLabel>
            <Select
              value={selectedCliente}
              onChange={(e) => setSelectedCliente(e.target.value)}
            >
              <MenuItem value="" disabled>Seleccione un cliente</MenuItem>
              {clientes.map(cliente => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {getClienteName(cliente.id)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Seleccione un producto</InputLabel>
            <Select
              value={newTransaction.producto}
              onChange={(e) => setNewTransaction({ ...newTransaction, producto: e.target.value })}
            >
              <MenuItem value="" disabled>Seleccione un producto</MenuItem>
              {productos.map(producto => (
                <MenuItem key={producto.id} value={producto.id}>
                  {producto.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="number"
            label="Cantidad"
            value={newTransaction.cantidad}
            onChange={(e) => setNewTransaction({ ...newTransaction, cantidad: e.target.value })}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            fullWidth
            sx={{ mt: 2 }}
          >
            Crear Venta
          </Button>
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Venta</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Seleccione un cliente</InputLabel>
            <Select
              value={editingTransaction?.cliente || ''}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, cliente: e.target.value })}
            >
              <MenuItem value="" disabled>Seleccione un cliente</MenuItem>
              {clientes.map(cliente => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {getClienteName(cliente.id)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Seleccione un producto</InputLabel>
            <Select
              value={editingTransaction?.producto || ''}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, producto: e.target.value })}
            >
              <MenuItem value="" disabled>Seleccione un producto</MenuItem>
              {productos.map(producto => (
                <MenuItem key={producto.id} value={producto.id}>
                  {producto.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="number"
            label="Cantidad"
            value={editingTransaction?.cantidad || ''}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, cantidad: e.target.value })}
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

export default Sales;
