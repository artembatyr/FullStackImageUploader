import React, { useState } from "react";
import { Button, Box, Dialog, DialogContent } from "@mui/material";

const DicomImage = ({ base64Image }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        View Image
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <img src={`data:image/png;base64,${base64Image}`} alt="DICOM Preview" width="100%" />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DicomImage;