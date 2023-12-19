import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const GenericIconButton = ({ color, handleClick, type }) => {
  return (
    <IconButton aria-label={type} onClick={handleClick} size="small">
      {type === "close" && <HighlightOffOutlinedIcon sx={{ color: color }} />}
      {type === "edit" && <EditIcon sx={{ color: color }} />}
      {type === "delete" && <DeleteIcon sx={{ color: color }} />}
    </IconButton>
  );
};
