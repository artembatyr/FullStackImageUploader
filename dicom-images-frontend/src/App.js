import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import DicomUpload from "./components/DicomUpload";
import DicomTable from "./components/DicomTable";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/SideBar";

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
  const [openSideBar, setOpenSideBar] = useState(true);

  const toggleSideBar = (open) => {
    setOpenSideBar(!open);
  };

  return (
    <Container  sx={{ paddingLeft: { xs: 0, sm: 0 }, paddingRight: { xs: 0, sm: 0 } }} maxWidth={false} >
      <Header openSideBar={openSideBar} toggleSideBar={toggleSideBar} />
      <Sidebar openSideBar={openSideBar}/>
      <Box sx={{ ml: openSideBar ? 12 : 1, mt: 3}}>
        <DicomUpload refetch={refetch} />
        <DicomTable loading={loading} error={error} data={data} />
      </Box>
    </Container>
  );
}

export default App;
