import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Typography, Grid2 } from "@mui/material";

const GET_DICOM_FILES = gql`
  query {
    dicomFiles {
      id
      patientName
      patientBirthDate
      seriesDescription
      file
    }
  }
`;

const ViewerPage = () => {
  const { data } = useQuery(GET_DICOM_FILES);
  const [selectedImage, setSelectedImage] = useState(`${process.env.REACT_APP_BACKEND_URL}/api/media/dicom_images/${data.dicomFiles[0].id}.png` || null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <Box sx={{ display: "flex", paddingRight: { xs: 1, sm: 3 }, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          maxHeight: "calc(100vh - 64px)",
          padding: 1,
          width: "15%",
        }}
      >
        <Grid2 container spacing={2}>
          {data?.dicomFiles.map((file) => {
            const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/api/media/dicom_images/${file.id}.png`;
            return (
              <Grid2 item xs={12} key={file.id}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    padding: 1,
                    boxShadow: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    background: selectedImage === imageUrl ? "gray" : "transparent",
                    transition: "background 0.3s ease",
                  }}
                  onClick={() => handleImageClick(imageUrl)}
                >
                  <Typography variant="body2">{file.patientName}</Typography>
                  <Typography variant="body2">{file.seriesDescription}</Typography>
                  <Typography variant="body2">{file.patientBirthDate}</Typography>
                  <img
                    src={imageUrl}
                    alt={file.seriesDescription}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 4,
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                      marginTop: 8,
                    }}
                  />
                </Box>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "82%",
          height: "87vh",
          background: "black",
          padding: 2,
        }}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected DICOM"
            style={{
              maxWidth: "100%",
              borderRadius: 4,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          />
        ) : (
          <Typography variant="h6" sx={{ color: "white" }}>
            Select an image to view
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ViewerPage;
