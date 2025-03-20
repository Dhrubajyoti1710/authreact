import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Card } from "react-bootstrap";
import { Button, TextField, Drawer, List, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { GridView, TableChart, FilterList } from "@mui/icons-material";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import  { productImageShow } from "../../Helper/Helper";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../Products/Products.css";
import { DeleteProduct, filterProducts, getAllProducts } from "../../../api/functions/apiFunctions";

ModuleRegistry.registerModules([AllCommunityModule]);

const filtersData = {
  size: ["XS", "S", "M", "L", "XL", "XXL"],
  color: ["Black", "Blue", "White", "Red"],
  brand: ["Nike", "Adidas", "Puma", "Reebok", "Air Jordan", "Campus"],
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({ size: [], color: [], brand: [] });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]); 

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products
    ? products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const applyFilters = async () => {
    try {
      const filteredData = await filterProducts(filters);
      setProducts(filteredData); // Update products with filtered data
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await DeleteProduct(id);
      toast("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    // { headerName: "Sl No", valueGetter: (params) => (params.node ? params.node.rowIndex + 1 : ""), width: 100 },
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "Price", field: "price", flex: 1 },
    { headerName: "Size", field: "size", flex: 1, valueFormatter: (params) => params.value ? params.value.join(", ") : "" },
    { headerName: "Color", field: "color", flex: 1, valueFormatter: (params) => params.value ? params.value.join(", ") : "" },
    { headerName: "Brand", field: "brand", flex: 1 },
    {
      headerName: "Image",
      field: "image",
      cellRenderer: (params) => (
        <img
          src={params.value ? productImageShow(params.value) : "https://via.placeholder.com/80"}
          alt="Product"
          style={{ maxHeight: "100px" }}
        />
      ),
      width: 120,
    },
    {
      headerName: "Actions",
      field: "_id",
      cellRenderer: (params) => (
        <>
          <Button variant="outlined" color="primary" component={Link} to={`/update/${params.value}`} style={{ marginRight: "10px" }}>
            Update
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => deleteProduct(params.value)}>
            Delete
          </Button>
        </>
      ),
      width: 250,
    },
  ];


  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", width: "100%" }}>
      <h1 className="product-list-title">Product List</h1>
      <TextField label="Search Products By Name..." variant="outlined" fullWidth value={search} onChange={handleSearch} style={{ marginBottom: "20px", width: "50%" }} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
        <Button style={{ textAlign: "center" }} variant="contained" onClick={() => setDrawerOpen(true)}>Filter  <FilterList /></Button>
        <Button variant="contained" onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}>Toggle View  {viewMode === "table" ? <GridView /> : <TableChart />}</Button>
      </div>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div style={{ width: 220, padding: "15px" }}>
          <h3>Filters</h3><hr />
          <List>
            {Object.entries(filtersData).map(([category, items]) => (
              <FormGroup key={category} style={{ marginBottom: "10px" }}>
                <strong>{category.charAt(0).toUpperCase() + category.slice(1)}</strong>
                {items.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        size="small"
                        checked={filters[category].includes(item)}
                        onChange={(e) => {
                          setFilters((prev) => ({
                            ...prev,
                            [category]: e.target.checked
                              ? [...prev[category], item]
                              : prev[category].filter((i) => i !== item),
                          }));
                        }}
                      />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>
            ))}
          </List>
        </div>
      </Drawer>
      {viewMode === "table" ? (
        <div className="ag-theme-custom" style={{ height: "500px", width: "100%", marginTop: "20px" }}>
          <AgGridReact
            rowData={filteredProducts || []} 
            columnDefs={columns}
            paginationPageSize={5}
            rowHeight={100}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
              resizable: true,
              cellStyle: { textAlign: "left" },
            }}
          />

        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {filteredProducts.length === 0 && <h2>No Data Found</h2>}
          {filteredProducts.map((item) => (
            <Card key={item._id} style={{ width: "18rem", padding: "10px" }}>
              <Card.Img variant="top" src={item.image ? productImageShow(item.image) : "https://via.placeholder.com/150"} style={{ maxWidth: '100%', maxHeight: '150px' }} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text><strong>Size:</strong> {item.size.join(", ")}</Card.Text>
                <Card.Text><strong>Color:</strong> {item.color.join(", ")}</Card.Text>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text><strong>Price:</strong> ${item.price}</Card.Text>
                <Button variant="outlined" style={{ marginRight: '10px' }} color="primary" component={Link} to={`/update/${item._id}`}>Update</Button>
                <Button variant="outlined" color="secondary" onClick={() => deleteProduct(item._id)}>Delete</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}