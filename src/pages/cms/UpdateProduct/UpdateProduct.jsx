import {
    Container,
    TextField,
    Typography,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    Card,
    CardContent,
    Box,
    CardActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance, { productImageShow } from "../../Helper/Helper";
import { updateProduct } from "../../../api/functions/apiFunctions";

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'Blue', 'White', 'Red'];
const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Air Jordan', 'Campus'];

export default function Update() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        size: [],
        color: [],
        brand: '',
        image: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axiosInstance.get(`/product/${id}`);
                const productData = response.data.data;

                // Ensure `size` and `color` are parsed correctly and stored as flat arrays
                const parsedSizes = Array.isArray(productData.size)
                    ? productData.size
                    : JSON.parse(productData.size || '[]');

                const parsedColors = Array.isArray(productData.color)
                    ? productData.color
                    : JSON.parse(productData.color || '[]');

                setFormData({
                    name: productData.name,
                    price: productData.price,
                    description: productData.description,
                    size: parsedSizes,
                    color: parsedColors,
                    brand: productData.brand,
                    image: null
                });

                if (productData.image) {
                    setPreviewImage(productImageShow(productData.image));
                }
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Fix: Store `size` as a flat array
    const handleSizeChange = (event) => {
        const { value } = event.target;
        setFormData((prev) => ({
            ...prev,
            size: prev.size.includes(value)
                ? prev.size.filter(size => size !== value) // Remove if exists
                : [...prev.size, value] // Add if not exists
        }));
    };

    // Fix: Store `color` as a flat array
    const handleColorChange = (event) => {
        const { value } = event.target;
        setFormData((prev) => ({
            ...prev,
            color: prev.color.includes(value)
                ? prev.color.filter(color => color !== value) // Remove if exists
                : [...prev.color, value] // Add if not exists
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        try {
            await updateProduct(id, formData);
            toast('Item updated successfully');
            navigate('/products');
        } catch (error) {
            console.error('Error updating item:', error);
            toast.error('Failed to update product');
        }
    };

    return (
        <Container maxWidth="md" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '100%', padding: 3, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>Update Product</Typography>
                    {previewImage && <Box display="flex" justifyContent="center"><img src={previewImage} alt="Product" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px', borderRadius: '8px' }} /></Box>}
                    <TextField margin="dense" label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} />
                    <TextField margin="dense" label="Price" name="price" fullWidth value={formData.price} onChange={handleChange} />
                    
                    <Typography variant="h6" mt={2}>Size</Typography>
                    <FormGroup row>
                        {sizes.map((size) => (
                            <FormControlLabel key={size} control={<Checkbox value={size} checked={formData.size.includes(size)} onChange={handleSizeChange} />} label={size} />
                        ))}
                    </FormGroup>
                    
                    <Typography variant="h6" mt={2}>Color</Typography>
                    <FormGroup row>
                        {colors.map((color) => (
                            <FormControlLabel key={color} control={<Checkbox value={color} checked={formData.color.includes(color)} onChange={handleColorChange} />} label={color} />
                        ))}
                    </FormGroup>
                    
                    <Typography variant="h6" mt={2}>Brand</Typography>
                    <Select fullWidth name="brand" value={formData.brand} onChange={handleChange}>
                        {brands.map((brand) => (<MenuItem key={brand} value={brand}>{brand}</MenuItem>))}
                    </Select>
                    
                    <TextField margin="dense" label="Description" name="description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} />
                    
                    <Typography variant="h6" mt={2}>Image</Typography>
                    <TextField type="file" margin="dense" name="image" fullWidth onChange={handleImageChange} />
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>Update Product</Button>
                </CardActions>
            </Card>
        </Container>
    );
}
