import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import "./insurance.css";

// Define validation schema using yup
const schema = yup.object({
  coverageType: yup.string().required("Coverage Type is required"),
  coverageStartDate: yup.date().required("Coverage Start Date is required"),
  coverageEndDate: yup
    .date()
    .required("Coverage End Date is required")
    .min(yup.ref('coverageStartDate'), "Coverage End Date must be after the Start Date"),
  coverageAmount: yup.number().required("Coverage Amount is required").positive(),
  status: yup.number().required("Status is required").integer().min(0).max(1),
}).required();

export default function InsuranceDetailsForm({ onSubmit }) {
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
              id="coverageType"
              label="Coverage Type"
              {...register("coverageType")}
              invalid={!!errors.coverageType}
              validationError={errors.coverageType?.message}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="date"
              id="coverageStartDate"
              label="Coverage Start Date"
              {...register("coverageStartDate")}
              invalid={!!errors.coverageStartDate}
              validationError={errors.coverageStartDate?.message}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              type="date"
              id="coverageEndDate"
              label="Coverage End Date"
              {...register("coverageEndDate")}
              invalid={!!errors.coverageEndDate}
              validationError={errors.coverageEndDate?.message}
            />
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit" block>
          Submit Insurance Policy
        </MDBBtn>
      </form>
    </div>
  );
}
