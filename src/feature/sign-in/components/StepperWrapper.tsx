"use client";
import Stepper, { Step } from "@/blocks/commons/Stepper";
import { memo, ReactNode } from "react";

function StepperWrapper({ children }: { children: ReactNode }) {
  const steps = Array.isArray(children) ? children : [children];

  return (
    <Stepper
      initialStep={1}
      onStepChange={(step) => console.log(step)}
      onFinalStepCompleted={() => console.log("완료")}
      backButtonText="back"
      nextButtonText="next"
    >
      {steps.map((child, i) => (
        <Step key={`sign-up-step_${i}`}>{child}</Step>
      ))}
    </Stepper>
  );
}

export default memo(StepperWrapper);
