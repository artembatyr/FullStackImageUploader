import React from "react";
import { Container, Typography } from "@mui/material";
import DicomUpload from "./components/DicomUpload";
import DicomTable from "./components/DicomTable";
import './App.css';

function App() {
  return (
    <Container>
      <Typography variant="h3" sx={{ my: 3 }}>DICOM</Typography>
      <DicomUpload />
      <DicomTable />
    </Container>
  );
}

export default App;
