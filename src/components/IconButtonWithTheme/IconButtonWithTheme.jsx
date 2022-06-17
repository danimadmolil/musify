import React from "react";
import { styled } from "@mui/material";
import { IconButton } from "@mui/material";
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.accent.default,
}));
export default function IconButtonWithTheme({ children, onClick }) {
  return <StyledIconButton onClick={onClick}>{children}</StyledIconButton>;
}
