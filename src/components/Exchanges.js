import React, { useEffect, useState } from 'react';
import { getData, createData, updateData, deleteData } from '../api';
import { 
  Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  TextField, Button, Paper, Box, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Exchanges = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState('');
  const [newTransaction, setNewTransaction] = useState({ producto: '', cantidad: 1 });
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const transaccionesData = await getData('/transacciones/');
      const proveedoresData = await getData('/proveedores/');
      const productosData = await getData('/productos/');
      const usuariosData = await getData('/usuarios/');
      
      setTransacciones(transaccionesData.filter(tx => tx.tipo === 'C'));
      setProveedores(proveedoresData);
      setProductos(productosData.filter(product => product.tipo === 'C'));
      setUsuarios(usuariosData);
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
      proveedor: selectedProveedor,
      total: total,
      puntos_utilizados: puntosUtilizados,
      tipo: 'C'
    });
    setTransacciones([...transacciones, data]);
  };

  const handleEdit = async () => {
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
  };

  const handleDelete = async (id) => {
    await deleteData('/transacciones', id);
    setTransacciones(transacciones.filter(tx => tx.id !== id));
  };

  const getProveedorName = (proveedorId) => {
    const proveedor = proveedores.find(prov => prov.id === proveedorId);
    if (!proveedor) return 'Desconocido';

    const user = usuarios.find(user => user.id === proveedor.user);
    return user ? user.username : 'Desconocido';
  };

  const getProductoName = (productoId) => {
    const producto = productos.find(prod => prod.id === productoId);
    return producto ? producto.nombre : 'Desconocido';
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Canjes
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {transacciones.map(tx => (
            <ListItem key={tx.id} sx={{ mb: 1 }} divider>
              <ListItemText
                primary={`Proveedor: ${getProveedorName(tx.proveedor)} - Producto: ${getProductoName(tx.producto)} - Cantidad: ${tx.cantidad}`}
                secondary={`Total: ${tx.total} - Puntos Utilizados: ${tx.puntos_utilizados}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => setEditingTransaction(tx)}>
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
          {editingTransaction ? 'Editar Canje' : 'Crear Canje'}
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Proveedor</InputLabel>
            <Select
              value={editingTransaction ? editingTransaction.proveedor : selectedProveedor}
              onChange={(e) => {
                const value = e.target.value;
                if (editingTransaction) {
                  setEditingTransaction({ ...editingTransaction, proveedor: value });
                } else {
                  setSelectedProveedor(value);
                }
              }}
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Producto</InputLabel>
            <Select
              value={editingTransaction ? editingTransaction.producto : newTransaction.producto}
              onChange={(e) => {
                const value = e.target.value;
                if (editingTransaction) {
                  setEditingTransaction({ ...editingTransaction, producto: value });
                } else {
                  setNewTransaction({ ...newTransaction, producto: value });
                }
              }}
              required
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
            name="cantidad"
            label="Cantidad"
            value={editingTransaction ? editingTransaction.cantidad : newTransaction.cantidad}
            onChange={(e) => {
              const value = e.target.value;
              if (editingTransaction) {
                setEditingTransaction({ ...editingTransaction, cantidad: value });
              } else {
                setNewTransaction({ ...newTransaction, cantidad: value });
              }
            }}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={editingTransaction ? handleEdit : handleCreate}
          >
            {editingTransaction ? 'Guardar Cambios' : 'Crear Canje'}
          </Button>
          {editingTransaction && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setEditingTransaction(null)}
            >
              Cancelar
            </Button>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Exchanges;
