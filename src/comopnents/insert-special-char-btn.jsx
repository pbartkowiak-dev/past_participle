import React from "react";
import { Button, styled, TextField } from "@mui/material";

const ButtonStyled = styled(Button)(() => ({
  textTransform: "lowercase",
}));

function InsertSpecialCharBtn({ specialCharacter, insertFn }) {
  return (
    <ButtonStyled
      variant="outlined"
      size="small"
      onClick={() => insertFn(specialCharacter)}
    >
      {specialCharacter}
    </ButtonStyled>
  );
}

export default InsertSpecialCharBtn;
