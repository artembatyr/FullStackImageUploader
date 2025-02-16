import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";

const DicomUpload = ({ refetch }) => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setMessage("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".dcm",
    multiple: true,
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Please select files first.");
      return;
    }

    setMessage("Uploading...");

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      refetch();
      setMessage("Upload successful!");
      setFiles([]);
    } catch (error) {
      console.error("Upload failed", error);
      setMessage("Upload failed. Please try again.");
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Typography variant="h5">File Scanner</Typography>

      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          mt: 2,
          border: "2px dashed #aaa",
          // backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
          backgroundColor: "transparent",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the files here...</Typography>
        ) : (
          <Typography>
            Drag 'n' drop some files here, or click to select files
          </Typography>
        )}
      </Paper>

      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Selected files:</Typography>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mt: 2, mb: 2 }}
        disabled={files.length === 0}
      >
        Upload
      </Button>

      <Typography sx={{ mb: 2 }} variant="h5">Uploaded Files</Typography>

      {message && <Typography sx={{ mt: 1 }}>{message}</Typography>}
    </Box>
  );
};

export default DicomUpload;
