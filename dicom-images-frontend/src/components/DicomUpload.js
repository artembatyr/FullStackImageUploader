import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import axios from "axios";

const DicomUpload = ({ refetch }) => {
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
    console.log('difference', formData, 'and', file)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      refetch();
      setMessage("Upload successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Upload failed", error);
      setMessage("Upload failed. Please try again.");
    }
  };

  return (
    <Box>
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