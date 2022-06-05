import React, { useState } from "react";
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
export default function Dialog({ children, open, closeDialog }) {
  function dismiss() {
    closeDialog();
  }
  return (
    <MuiDialog open={open} onBackdropClick={dismiss}>
      {children}
    </MuiDialog>
  );
}
