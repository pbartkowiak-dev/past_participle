import React, { useContext } from "react";
import { getVerbsGrouped } from "../data/verbs";
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  styled,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
} from "@mui/material";
import { StoreContext } from "../store";
import { views } from "../App";
import { Link } from "react-router-dom";

const DivGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "20px 10px",
  "@media (max-width: 1020px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@media (max-width: 680px)": {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

const StyledListItemText = styled(ListItemText)(() => ({
  "& .MuiTypography-root": {
    lineHeight: 0.8,
    fontSize: 13,
  },
}));

function SelectView() {
  const store = useContext(StoreContext);
  const { selectedVerbGroups, setSelectedVerbGroups } = store;
  const verbsGrouped = getVerbsGrouped();

  const quizRoute = views[1];

  const handleCheck = ({ target }) => {
    const { value, checked } = target;

    if (checked) {
      setSelectedVerbGroups([...selectedVerbGroups, value]);
    } else {
      setSelectedVerbGroups(
        selectedVerbGroups.filter((selectedIndex) => selectedIndex !== value)
      );
    }
  };

  return (
    <Container>
      <Typography variant="h4" as={"h1"} sx={{ margin: "20px 0 5px" }}>
        Select Verb Groups
      </Typography>
      <Typography
        display="block"
        variant="p"
        as={"p"}
        sx={{ color: "gray", marginTop: 0, marginBottom: 2 }}
      >
        Then, go to{" "}
        <Link to={quizRoute.route} style={{ textDecoration: "none" }}>
          {quizRoute.name} Page
        </Link>{" "}
        to practice.
      </Typography>
      <DivGrid>
        {verbsGrouped.map((group, index) => (
          <List
            dense={true}
            key={index}
            subheader={
              <ListSubheader component="div" sx={{ paddingLeft: 0 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={String(index)}
                        value={String(index)}
                        onChange={handleCheck}
                        checked={selectedVerbGroups.includes(String(index))}
                      />
                    }
                    label={`Group ${index + 1}`}
                  />
                </FormGroup>
              </ListSubheader>
            }
          >
            {group.map((verb) => (
              <ListItem
                key={verb.infinitiv}
                sx={{
                  padding: 0,
                }}
              >
                <StyledListItemText>
                  {verb.infinitiv} ({verb.translation_pol})
                </StyledListItemText>
              </ListItem>
            ))}
          </List>
        ))}
      </DivGrid>
    </Container>
  );
}

export default SelectView;
