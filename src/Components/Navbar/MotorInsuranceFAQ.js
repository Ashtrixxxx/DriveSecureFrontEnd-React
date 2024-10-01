import React from 'react';
import { Accordion } from 'react-bootstrap';

const MotorInsuranceFAQ = () => {
  return (
    <div>
      <h2>LET'S SIMPLIFY MOTOR INSURANCE</h2>
      <Accordion defaultActiveKey="0" >
        <Accordion.Item eventKey="0" style={{backgroundColor: "#E3afbc"}}>
          <Accordion.Header>What is Motor/Vehicle Insurance?</Accordion.Header>
          <Accordion.Body>
            Motor insurance provides financial protection against physical damage or bodily injury resulting from traffic collisions and against liability that could also arise from incidents in a vehicle.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" style={{backgroundColor: "#E3afbc"}}>
          <Accordion.Header>Why should I buy Motor Insurance?</Accordion.Header>
          <Accordion.Body>
            Motor insurance is mandatory by law and protects you from financial losses in case of accidents, theft, or damage to your vehicle, including liabilities to third parties.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2"  style={{backgroundColor: "#E3afbc"}}>
          <Accordion.Header>What are the eligibility criteria to avail Motor Insurance?</Accordion.Header>
          <Accordion.Body>
            You must be the registered owner of the vehicle, and the vehicle must meet specific safety and roadworthiness standards.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3" style={{backgroundColor: "#E3afbc"}}>
          <Accordion.Header>What does Motor Insurance cover?</Accordion.Header>
          <Accordion.Body>
            It covers damage or loss to the vehicle due to accidents, theft, natural disasters, man-made disasters, and third-party liability.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4" style={{backgroundColor: "#E3afbc"}}>
          <Accordion.Header>What are the Motor Insurance policy exclusions?</Accordion.Header>
          <Accordion.Body>
            Exclusions include regular wear and tear, mechanical breakdowns, and damages incurred while driving under the influence of alcohol or drugs.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5" style={{backgroundColor: "#E3afbc"}}>
          <Accordion.Header>How to file Motor Insurance claims?</Accordion.Header>
          <Accordion.Body>
            You can file a claim by informing your insurance provider about the incident, submitting relevant documents, and getting the vehicle inspected if necessary.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6" style={{backgroundColor: "#E3afbc"}}>
          <Accordion.Header>What is No Claim Bonus and how does it benefit me?</Accordion.Header>
          <Accordion.Body>
            No Claim Bonus (NCB) is a discount offered on the premium for every claim-free year, reducing your insurance costs in the subsequent years.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7" style={{backgroundColor: "#E3afbc"}}>
          <Accordion.Header>What if I have to make changes/endorsements in the policy?</Accordion.Header>
          <Accordion.Body>
            You can make changes to your policy by contacting your insurer and submitting the necessary documents for updates like address change or adding accessories.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8" style={{backgroundColor: "#E3afbc"}}>
          <Accordion.Header>How can I reduce the insurance premium for my vehicle?</Accordion.Header>
          <Accordion.Body>
            You can reduce the premium by choosing a higher deductible, avoiding unnecessary claims, and installing anti-theft devices.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default MotorInsuranceFAQ;
