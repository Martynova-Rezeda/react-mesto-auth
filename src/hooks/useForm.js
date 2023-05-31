import { useState } from 'react';

const useForm = (inputValues = {}) => {
  const [formValues, setFormValues] = useState({ inputValues });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  return { formValues, handleChange };
};
export default useForm;
