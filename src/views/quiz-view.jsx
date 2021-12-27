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

const getRandom = (max) => Math.floor(Math.random() * max);

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
  margin: "0 auto 20px",
  justifyContent: "space-evenly",
  width: inputWidth,
  "@media (max-width: 680px)": {
    width: "100%",
  },
}));

const specialCharacters = ["ä", "ö", "ü", "ß"];

function QuizView() {
  const [inputValue, setInputValue] = useState("");
  const [prevRandom, setPrevRandom] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [currentVerb, setCurrentVerb] = useState({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const store = useContext(StoreContext);
  const { selectedVerbs } = store;

  const getNewIndex = (max) => {
    const random = getRandom(max);
    if (random === prevRandom) {
      return getNewIndex(max);
    } else {
      setPrevRandom(random);
      return random;
    }
  };

  const getNewVerb = () => {
    setHasError(false);
    setShowTranslation(false);
    setShowAnswer(false);
    setInputValue("");

    if (selectedVerbs && selectedVerbs.length) {
      const newIndex = getNewIndex(selectedVerbs.length);
      const newVerb = selectedVerbs[newIndex];
      setCurrentVerb(newVerb);
    }
  };

  useEffect(() => {
    getNewVerb();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const isCorrect = inputValue.trim() === currentVerb.partizip_ii.trim();
    if (isCorrect) {
      getNewVerb();
    } else {
      setHasError(true);
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
    setHasError(false);
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
      <Container sx={{ textAlign: "center", marginTop: 10 }}>
        <Alert severity="warning">Select some verbs first!</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ textAlign: "center", marginTop: 10 }}>
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
                marginTop: 1,
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
        sx={{ marginTop: 1, marginBottom: 1 }}
        variant="caption"
        display="block"
      >
        Press <strong>Enter</strong> to submit, press{" "}
        <strong>Enter + Ctrl</strong> to show the answer.
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
            }}
            onClick={handleShowAnswer}
          >
            Click to show the answer
          </Typography>
        )}
      </Box>
      {hasError && (
        <Alert severity="error">This is not correct! Try again.</Alert>
      )}
    </Container>
  );
}

export default QuizView;
