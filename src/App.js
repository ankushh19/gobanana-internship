import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <Router>
      <div>
        <CssBaseline />
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
