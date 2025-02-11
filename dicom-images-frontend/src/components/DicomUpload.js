import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import axios from "axios";

const DicomUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Upload successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Upload failed", error);
      setMessage("Upload failed. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Upload DICOM File</Typography>
      <input type="file" accept=".dcm" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default DicomUpload;