import React from "react";
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

const DownloadPage = () => {
  const { loading, error, data } = useQuery(GET_DICOM_FILES);

  return (
    <>
        <DicomTable loading={loading} error={error} data={data} />
    </>
  )
};

export default DownloadPage;