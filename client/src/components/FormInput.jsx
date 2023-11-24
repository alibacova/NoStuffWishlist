import TextField from "@mui/material/TextField";

const FormInput = ({
  error,
  helperText,
  id,
  label,
  isMultiline,
  isRequired,
  onChange,
  value,
}) => {
  return (
    <TextField
      error={error}
      helperText={helperText}
      id={id}
      label={label}
      multiline={isMultiline}
      onChange={onChange}
      required={isRequired}
      value={value}
    />
  );
};

export default FormInput;
