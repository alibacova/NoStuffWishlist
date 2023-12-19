import Button from "@mui/material/Button";

export const FilterButton = ({ disabled, onClick, text }) => {
  return (
    <Button
      sx={{ borderRadius: 8 }}
      variant="contained"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
