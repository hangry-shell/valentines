import { useState } from "react";
import smiski from "./smiski.png";

const NO_MESSAGES = [
  "are you sure?",
  "really sure?",
  "absolutely sure?",
  "pretty please?????",
  "if you say no again, ill be sad...",
  "WHY DID U PRESS IT IM GONNA CRY",
  "PRESS IT AGAIN AND IM GONNA WATCH ONE WAY",
  "u are breaking my heart...",
  "sosimgonnacry",
];

const QUESTION_TITLE = "Michelle, would you like to be my Valentine?";
const YES_TITLE = "YAYAYAYAYAAYAYAYAY";
const YES_RESPONSE = "i miss you lots :(";

const MAX_YES_FONT_SCALE = 2.4;
const MAX_YES_BUTTON_SCALE = 2.1;
const YES_FONT_STEP = (MAX_YES_FONT_SCALE - 1) / NO_MESSAGES.length;
const YES_BUTTON_STEP = (MAX_YES_BUTTON_SCALE - 1) / NO_MESSAGES.length;
const NO_SCALE_STEP = 0.03;

const App = () => {
  const [yesFontScale, setYesFontScale] = useState(1);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noIndex, setNoIndex] = useState(-1);
  const [noScale, setNoScale] = useState(1);
  const [noHidden, setNoHidden] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const noLabel = noIndex < 0 ? "NO" : NO_MESSAGES[noIndex];

  const handleNoClick = () => {
    if (noIndex >= NO_MESSAGES.length - 1) {
      setNoHidden(true);
      return;
    }
    setNoIndex((prev) => Math.min(prev + 1, NO_MESSAGES.length - 1));
    setYesFontScale((prev) =>
      Math.min(MAX_YES_FONT_SCALE, prev + YES_FONT_STEP)
    );
    setYesButtonScale((prev) =>
      Math.min(MAX_YES_BUTTON_SCALE, prev + YES_BUTTON_STEP)
    );
    setNoScale((prev) => prev - NO_SCALE_STEP);
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  if (accepted) {
    return (
      <main className="layout layout--yes">
        <p className="yes-message">{YES_TITLE}</p>
        <p className="yes-sub">{YES_RESPONSE}</p>
        <img className="yes-image" src={smiski} alt="Smiski figure" />
      </main>
    );
  }

  return (
    <main className="layout">
      <p className="prompt">{QUESTION_TITLE}</p>
      <div className="button-row" role="group" aria-label="Answer buttons">
        <button
          className="button button--yes"
          type="button"
          style={{
            "--font-scale": yesFontScale,
            "--button-scale": yesButtonScale
          }}
          onClick={handleYesClick}
        >
          <span className="button__label">YES</span>
        </button>
        {!noHidden && (
          <button
            className="button button--no"
            type="button"
            style={{ "--button-scale": noScale, "--font-scale": noScale }}
            onClick={handleNoClick}
            aria-live="polite"
          >
            <span className="button__label">{noLabel}</span>
          </button>
        )}
      </div>
    </main>
  );
};

export default App;
