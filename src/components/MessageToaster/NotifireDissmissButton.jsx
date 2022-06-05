import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { closeSnackbar } from "../../store/actions/notistack/notistack.actions";
export default function NotifireDissmissButton({ key }) {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(closeSnackbar(key));
      }}>
      close
    </Button>
  );
}
