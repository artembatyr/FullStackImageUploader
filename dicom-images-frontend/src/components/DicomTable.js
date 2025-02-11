import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box } from "@mui/material";

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

const DicomTable = () => {
  const { loading, error, data } = useQuery(GET_DICOM_FILES);
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handlePreviewClick = (url) => {
    setImageUrl(url);
    setOpenModal(true);
  };

  console.log('imageDataArray', data)
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Series</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.dicomFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.patientName}</TableCell>
                <TableCell>{file.patientBirthDate}</TableCell>
                <TableCell>{file.seriesDescription}</TableCell>
                <TableCell>
                  {/* <Button onClick={() => handlePreviewClick(file.imageUrl)}>Preview</Button> */}
                  <Button onClick={() => handlePreviewClick(`http://localhost:8000/api/media/dicom_images/${file.id}.png` )}>Preview</Button>
                </TableCell>
                <TableCell>
                <Button href={'http://localhost:8000/api/media/' + file.file} download>
                Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 2,
            maxWidth: 500,
          }}
        >
          <h2>Let's see DICOM img</h2>
          <img src={imageUrl} alt="DICOM Preview" style={{ width: "100%" }} />
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DicomTable;

