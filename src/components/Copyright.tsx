import Typography from "@mui/material/Typography/Typography";
import { Link } from "react-router-dom";

export function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to=''>
        Checked
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}