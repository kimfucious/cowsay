import React from "react";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const CowsayForm = ({
  characters,
  handleRando,
  handleSubmit,
  message,
  selectedCharacter,
  setMessage,
  setSelectedCharacter
}) => {
  const doOrDoes = character => {
    const plural = ["Frogs", "Ghostbusters"];
    const proper = ["Beavis", "Tux", "Ren", "Stimpy"];
    if (character === "default") {
      return "does the Cow";
    }
    if (plural.includes(character)) {
      return "do the " + character;
    }
    if (proper.includes(character)) {
      return "does " + character;
    }
    return "does the " + character;
  };

  const getHelperText = () => {
    if (message.includes("\\n")) {
      return `Line breaks will be ignored`;
    }
    const brackets = /<.*?>/gm;
    const matches = brackets.exec(message);

    if (matches !== null) {
      return `Arrow brackets will be stripped.`;
    }
  };

  const getRandomValue = array => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const randomize = () => {
    const randomCharacter = getRandomValue(characters);
    setSelectedCharacter(randomCharacter);
    handleRando(randomCharacter);
  };

  const renderCharacterOptions = () => {
    return characters.sort().map(character => {
      return (
        <option key={characters.indexOf(character)} value={character}>
          {character}
        </option>
      );
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center w-100 mt-4"
    >
      <div className="w-100">
        <FormGroup className="d-flex align-items-end pb-1" row>
          <Col sm={5}>
            <Label className="label__cowsay-terminal" for="cowsay-input">
              What {doOrDoes(selectedCharacter)} say?
            </Label>
          </Col>
          <Col sm={7}>
            <Input
              type="text"
              className="input__cowsay-terminal no-border"
              name="cowsay-input"
              onChange={e => setMessage(e.target.value)}
              placeholder="Say anything..."
              value={message}
            />
          </Col>
          <small className="mb-3 helper__cowsay-terminal text-danger">
            {getHelperText()}
          </small>
        </FormGroup>
        <FormGroup className="d-flex align-items-end pb-1" row>
          <Col sm={5}>
            <Label className="label__cowsay-terminal" for="select-character">
              Character
            </Label>
          </Col>
          <Col sm={7}>
            <CustomInput
              className="no-border"
              id="select-character"
              name="selectCharacter"
              onChange={e => setSelectedCharacter(e.target.value)}
              type="select"
              value={selectedCharacter}
            >
              <option value="default">Cow</option>
              {characters && characters.length
                ? renderCharacterOptions()
                : null}
            </CustomInput>
          </Col>
        </FormGroup>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Button className="" color="link" onClick={() => randomize()}>
          RANDOMIZE
        </Button>
        <Button
          color="link"
          disabled={!message}
          type="submit"
          title={!message ? "Say something..." : ""}
          style={{ cursor: message ? "pointer" : "not-allowed" }}
        >
          SAY WHAT?
        </Button>
      </div>
    </Form>
  );
};

export default CowsayForm;
