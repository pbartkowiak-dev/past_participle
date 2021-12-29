import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  styled,
  Alert,
  Button,
} from "@mui/material";
import { StoreContext } from "../store";
import InsertSpecialCharBtn from "../comopnents/insert-special-char-btn";

const getRandomIndex = (max) => Math.floor(Math.random() * max);

const inputWidth = "360px";

const Input = styled(TextField)(() => ({
  minWidth: inputWidth,
  "& .MuiTextField-root": {
    fontSize: 43,
  },
  "@media (max-width: 680px)": {
    minWidth: "auto",
    width: "100%",
  },
}));

const CharactersBox = styled(Box)(() => ({
  display: "flex",
  margin: "0 auto 15px",
  justifyContent: "space-evenly",
  width: inputWidth,
  padding: "0 5px",
  "@media (max-width: 680px)": {
    width: "100%",
  },
}));

const specialCharacters = ["ä", "ö", "ü", "ß"];

function QuizView() {
  const [inputValue, setInputValue] = useState("");
  const [previousIndex, setPreviousIndex] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [currentVerb, setCurrentVerb] = useState({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [wasShowTranslationUsed, setWasShowTranslationUsed] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [counter, setCounter] = useState(0);
  const store = useContext(StoreContext);
  const { selectedVerbs } = store;

  const getNewIndex = (max) => {
    const newIndex = getRandomIndex(max);
    if (newIndex === previousIndex) {
      return getNewIndex(max);
    }
    return newIndex;
  };

  const getNewVerb = () => {
    setHasError(false);
    setShowTranslation(false);
    setWasShowTranslationUsed(false);
    setShowAnswer(false);
    setInputValue("");

    if (selectedVerbs && selectedVerbs.length) {
      const newIndex = getNewIndex(selectedVerbs.length);
      const newVerb = selectedVerbs[newIndex];

      setPreviousIndex(newIndex);
      setCurrentVerb(newVerb);
    }
  };

  useEffect(() => {
    getNewVerb();
    setCounter(0);
    setWasShowTranslationUsed(false);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const isCorrect =
      inputValue.toLowerCase().trim() ===
      currentVerb.partizip_ii.toLowerCase().trim();
    if (isCorrect) {
      if (!wasShowTranslationUsed) {
        setCounter(counter + 1);
      }
      getNewVerb();
    } else {
      setHasError(true);
      setCounter(0);
    }
  };

  const handleInput = (event) => {
    setHasError(false);
    setShowAnswer(false);
    setInputValue(event.target.value);
  };

  const onKeyPress = (event) => {
    const { key, ctrlKey } = event;
    if (key === "Enter" && ctrlKey === true) {
      event.preventDefault();
      handleShowAnswer();
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setShowTranslation(true);
    setWasShowTranslationUsed(true);
    setHasError(false);
    setCounter(0);
    setInputValue(currentVerb.partizip_ii);
  };

  const handleInsertSpecialCharacter = (specialCharacter) => {
    if (specialCharacter) {
      setInputValue(inputValue + specialCharacter);
      document.getElementById("quiz-input").focus();
    }
  };

  if (selectedVerbs.length === 0) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <Alert severity="warning">Select some verbs first!</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ textAlign: "center", marginTop: { md: 4, xs: 2 } }}>
      <Box sx={{ height: "40px", margin: "0 auto 5px", maxWidth: "450px" }}>
        {counter >= 2 && (
          <Alert severity="success" sx={{ padding: "0 16px" }}>
            <strong>{counter}</strong> verbs in a row. Keep going!
          </Alert>
        )}
      </Box>
      <form onSubmit={handleSubmit}>
        <Typography variant={"h3"}>{currentVerb.infinitiv}</Typography>
        <Box
          sx={{
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showTranslation ? (
            <Typography variant={"h5"}>
              {currentVerb.translation_pol}
            </Typography>
          ) : (
            <Typography
              variant={"h5"}
              role="button"
              sx={{
                display: "inline-block",
                color: "lightgray",
                cursor: "pointer",
                marginTop: { md: 1, xs: 0 },
                lineHeight: "18px",
              }}
              onClick={() => setShowTranslation(true)}
            >
              Click to show translation
            </Typography>
          )}
        </Box>
        <Box sx={{ marginTop: 2, marginBottom: 1 }}>
          <Input
            id="quiz-input"
            label="Enter Past Participle Form"
            variant="outlined"
            value={inputValue}
            onChange={handleInput}
            onKeyPress={onKeyPress}
            error={hasError}
            autoComplete="off"
          />
        </Box>
      </form>
      <CharactersBox>
        {specialCharacters.map((specialCharacter) => (
          <InsertSpecialCharBtn
            specialCharacter={specialCharacter}
            insertFn={handleInsertSpecialCharacter}
          />
        ))}
      </CharactersBox>
      <Typography
        sx={{ marginTop: 0, marginBottom: 1, lineHeight: "13px" }}
        variant="caption"
        display="block"
      >
        Press <strong>Enter</strong> to submit, press{" "}
        <strong>Enter + Ctrl</strong> to show the answer
      </Typography>
      <Box
        sx={{
          height: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        {showAnswer ? (
          <Button size="sm" onClick={getNewVerb}>
            Next Verb
          </Button>
        ) : (
          <Typography
            variant={"h6"}
            role="button"
            sx={{
              display: "inline-block",
              color: "lightgray",
              cursor: "pointer",
              marginTop: 1,
              lineHeight: "17px",
            }}
            onClick={handleShowAnswer}
          >
            Click to show the answer
          </Typography>
        )}
      </Box>
      <Box sx={{ maxWidth: "450px", margin: "15px auto 0" }}>
        {hasError && (
          <Alert severity="error" sx={{ display: { xs: "none", md: "flex" } }}>
            This is not correct! Try again.
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default QuizView;
