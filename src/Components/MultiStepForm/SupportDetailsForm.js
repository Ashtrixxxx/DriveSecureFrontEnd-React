import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Support.css"
// Define validation schema using yup
const schema = yup.object({
  addressProof: yup.mixed().required("Address Proof is required"),
  rcProof: yup.mixed().required("RC Proof is required"),
}).required();

const SupportDetailsForm = ({ onSubmit }) => {
  // Initialize react-hook-form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // State to hold uploaded file URLs
  const [addressProofUrl, setAddressProofUrl] = useState("");
  const [rcProofUrl, setRcProofUrl] = useState("");
  
  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle file upload and form submission
  const onFormSubmit = async () => {
    const decodedToken = jwtDecode(localStorage.getItem("Auth-Token"));
    const userId = decodedToken.nameid; // Extract userId from JWT token

    // Prepare form data to send to parent component
    const formDataWithUserId = {
      UserID: userId,
      addressProofUrl, // Save address proof URL
      rcProofUrl, // Save RC proof URL
    };

    onSubmit(formDataWithUserId); // Pass form data to parent component
  };

  // Handle file selection and upload
  const handleFileChange = async (event, type) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;

    setLoading(true); // Start loading

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make the Axios request to upload the file
      const response = await axios.post(
        "https://localhost:7063/api/FileUpload/upload", // Adjust the URL as necessary
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileId = response.data.fileId;
      const viewLink = `https://drive.google.com/uc?export=view&id=${fileId}`; // Changed format

      if (type === "addressProof") {
        setAddressProofUrl(viewLink);
        setValue("addressProof", file); // Update react-hook-form value
      } else if (type === "rcProof") {
        setRcProofUrl(viewLink);
        setValue("rcProof", file); // Update react-hook-form value
      }

    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false); // Stop loading when upload completes
    }
  };

  return (
    <div className="form-wrapper">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div> {/* A simple spinner */}
          <p>Uploading, please wait...</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="addressProof"
              label="Address Proof"
              type="file"
              {...register("addressProof")}
              invalid={!!errors.addressProof}
              validationError={errors.addressProof?.message}
              onChange={(e) => handleFileChange(e, "addressProof")} // Handle file change
            />
            {addressProofUrl && <p>Uploaded: <a href={addressProofUrl} target="_blank" rel="noopener noreferrer">{addressProofUrl}</a></p>}
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="rcProof"
              label="RC Proof"
              type="file"
              {...register("rcProof")}
              invalid={!!errors.rcProof}
              validationError={errors.rcProof?.message}
              onChange={(e) => handleFileChange(e, "rcProof")} // Handle file change
            />
            {rcProofUrl && <p>Uploaded: <a href={rcProofUrl} target="_blank" rel="noopener noreferrer">{rcProofUrl}</a></p>}
          </MDBCol>
        </MDBRow>

        <MDBBtn type="submit" block disabled={loading}>
          Submit Support Details
        </MDBBtn>
      </form>
    </div>
  );
};

export default SupportDetailsForm;
