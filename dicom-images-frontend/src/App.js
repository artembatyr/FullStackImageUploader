import React from "react";
import { Container, Typography } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import DicomUpload from "./components/DicomUpload";
import DicomTable from "./components/DicomTable";
import './App.css';

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

function App() {
  const { loading, error, data, refetch } = useQuery(GET_DICOM_FILES);
  return (
    <Container>
      <Typography variant="h3" sx={{ my: 3 }}>DICOM</Typography>
      <DicomUpload refetch={refetch} />
      <DicomTable loading={loading} error={error} data={data} />
    </Container>
  );
}

export default App;
