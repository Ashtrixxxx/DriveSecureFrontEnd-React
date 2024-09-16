import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";

// Define validation schema using yup
const schema = yup.object({
  addressProof: yup.string().required("Address Proof is required"),
  rcProof: yup.string().required("RC Proof is required"),
}).required();

const SupportDetailsForm = ({ onSubmit }) => {
  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onFormSubmit = (data) => {
    console.log(data);
    onSubmit(data); // Pass form data to parent component
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="addressProof"
              label="Address Proof"
              {...register("addressProof")}
              invalid={!!errors.addressProof}
              validationError={errors.addressProof?.message}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="rcProof"
              label="RC Proof"
              {...register("rcProof")}
              invalid={!!errors.rcProof}
              validationError={errors.rcProof?.message}
            />
          </MDBCol>
        </MDBRow>

        <MDBBtn type="submit" block>
          Submit Support Details
        </MDBBtn>
      </form>
    </div>
  );
};

export default SupportDetailsForm;
