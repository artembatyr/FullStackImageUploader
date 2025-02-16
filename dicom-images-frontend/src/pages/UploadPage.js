import React from "react";
import DicomUpload from "../components/DicomUpload";
import DicomTable from "../components/DicomTable";
import { useQuery, gql } from "@apollo/client";

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


const UploadPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_DICOM_FILES);
  
  return (
    <>
        <DicomUpload refetch={refetch} />
        <DicomTable loading={loading} error={error} data={data} />
    </>
  )
};

export default UploadPage;