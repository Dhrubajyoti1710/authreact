import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Card,
  CardContent,
  Paper,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProduct } from './../../../api/functions/apiFunctions';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'Blue', 'White', 'Red'];
const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Air Jordan', 'Campus'];

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    size: [],
    color: [],
    brand: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prev) => {
      const newSizes = checked
        ? [...prev.size, value] 
        : prev.size.filter((size) => size !== value); 
      return { ...prev, size: newSizes };
    });
  };

  const handleColorChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prev) => {
      const newColors = checked
        ? [...prev.color, value] 
        : prev.color.filter((color) => color !== value); 
      return { ...prev, color: newColors };
    });
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    try {

      await createProduct(formData);

      toast.success('Item added successfully');
      navigate('/products');
    } catch (error) {
      console.error('Error adding item:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', py: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Add New Product
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} />
            <TextField label="Price" name="price" fullWidth value={formData.price} onChange={handleChange} />

            <Typography variant="h6">Size</Typography>
            <FormGroup row>
              {sizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      value={size}
                      checked={formData.size.includes(size)}
                      onChange={handleSizeChange}
                    />
                  }
                  label={size}
                />
              ))}
            </FormGroup>

            <Typography variant="h6">Color</Typography>
            <FormGroup row>
              {colors.map((color) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox
                      value={color}
                      checked={formData.color.includes(color)}
                      onChange={handleColorChange}
                    />
                  }
                  label={color}
                />
              ))}
            </FormGroup>

            <Typography variant="h6">Brand</Typography>
            <Select fullWidth name="brand" value={formData.brand} onChange={handleChange} displayEmpty>
              <MenuItem value="" disabled>Select a brand</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>{brand}</MenuItem>
              ))}
            </Select>

            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />

            <Typography variant="h6">Image</Typography>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="upload-image" />
              <label htmlFor="upload-image">
                <Button variant="contained" component="span">Upload Image</Button>
              </label>
              {formData.image && (
                <Box mt={2}>
                  <img src={URL.createObjectURL(formData.image)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: 8 }} />
                </Box>
              )}
            </Paper>

            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3, py: 1.5 }}>
              Add Product
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddItem;
