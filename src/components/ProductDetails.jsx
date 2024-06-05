import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Card Styling
const StyledCard = styled(Card)(({ theme }) => ({
  width: "90%",
  maxWidth: 600,
  margin: "20px auto",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  transition: "0.3s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 400,
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

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //   Fetching Data
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the product:", error);
        setLoading(false);
      });
  }, [id]);

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
            variant="h4"
            component="div"
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            {product.title}
          </Title>
          <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
            Price: ${product.price}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProductDetails;
