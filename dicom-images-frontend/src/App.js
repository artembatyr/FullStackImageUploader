import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import DownloadPage from "./components/DownloadPage";
import UploadPage from "./components/UploadPage";
import ViewerPage from "./components/ViewerPage";
import DemoPage from "./components/DemoPage";

function App() {
  const [openSideBar, setOpenSideBar] = useState(true);

  const toggleSideBar = (open) => {
    setOpenSideBar(!open);
  };

  return (
    <Router>
      <Container  sx={{ paddingLeft: { xs: 0, sm: 0 }, paddingRight: { xs: 0, sm: 0 } }} maxWidth={false} >
        <Header openSideBar={openSideBar} toggleSideBar={toggleSideBar} />
        <Sidebar openSideBar={openSideBar}/>
        <Box sx={{ ml: openSideBar ? 12 : 1, mt: 3}}>
          <Routes>
              <Route path="/" element={<DownloadPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/view" element={<ViewerPage />} />
              <Route path="/demo" element={<DemoPage />} />
            </Routes>
        </Box>
      </Container>
    </Router>

  );
}

export default App;
