import React from 'react';

interface FormFeedbackProps {
  type: 'valid' | 'invalid';
  children: React.ReactNode;
}

const FormFeedback: React.FC<FormFeedbackProps> = ({ type, children }) => {
  const className = type === 'invalid' 
    ? 'invalid-feedback d-block' 
    : 'valid-feedback d-block';
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default FormFeedback;
