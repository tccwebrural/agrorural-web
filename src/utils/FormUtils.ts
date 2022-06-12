import { useFormik } from "formik";

/**
 * Método responsável por adicionar ao Input os valores métodos e atributos para construção de um formulário;
 * @param formik - @see {@link useFormik}
 * @param field - Nome do atributo
 * @returns { name, value, onChange, error, helperText };
 */
const getControls = (formik: any, field: string) => {
  return {
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    error: formik.touched[field] && Boolean(formik.errors[field]),
    helperText: formik.touched[field] && formik.errors[field],

    // helpertext: formik.touched[field] && formik.errors[field],
  };
};

export { getControls };
