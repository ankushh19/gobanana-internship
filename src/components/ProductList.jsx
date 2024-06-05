import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

// Card Styling
const StyledCard = styled(Card)({
  width: 300,
  height: 350,
  margin: "20px auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  objectFit: "contain",
});

const StyledCardContent = styled(CardContent)({
  textAlign: "center",
  padding: "10px",
  flexGrow: 1,
});

const Title = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxHeight: "3em",
  marginBottom: "10px",
});

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetching Data with axios
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
        setLoading(false);
      });
  }, []);

  // Filtering Data
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Search BUtton
  const handleSearchClick = () => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div>
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        style={{ marginBottom: "20px", marginTop: "20px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={2} justifyContent="center">
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <StyledCard>
                <CardActionArea style={{ height: "100%" }}>
                  <StyledCardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                  />
                  <StyledCardContent>
                    <Title
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {product.title}
                    </Title>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      ${product.price}
                    </Typography>
                  </StyledCardContent>
                </CardActionArea>
              </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
