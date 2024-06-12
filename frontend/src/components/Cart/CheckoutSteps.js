import React, { Fragment } from "react";
// import { Stepper, StepLabel, Step } from "@material-ui/core";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <p>Shipping Details</p>,
      icon: <LiaShippingFastSolid />,
    },
    {
      label: <p>Confirm Order</p>,
      icon: <MdLibraryAddCheck />,
    },
    {
      label: <p>Payment</p>,
      icon: <MdAccountBalanceWallet />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      {/* <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper> */}
    </Fragment>
  );
};

export default CheckoutSteps;
