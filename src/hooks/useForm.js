// import { helpHttp } from "helpers/helpHttp";
import { useState } from "react";

const useForm = (initialForm, validationsForm, submit) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);
    handleBlur(newForm, true);
  };
  const handleBlur = (formValidation = {}, forValidation = false) => {
    if (forValidation) {
      setErrors(validationsForm(formValidation));
    } else {
      setErrors(validationsForm(form));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationsForm(form));
    if (Object.keys(validationsForm(form)).length >= 1) return;
    submit(form);
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export { useForm };
