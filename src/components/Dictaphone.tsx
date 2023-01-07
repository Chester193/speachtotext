import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { MicFill, MicMuteFill } from 'react-bootstrap-icons';
import { CSSTransition } from 'react-transition-group';

const Dictaphone = () => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="dictaphone">
      {styleButton()}
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <ButtonGroup aria-label="dictaphone-controls">
        <Button
          variant="record"
          onClick={() => {
            SpeechRecognition.startListening();
            console.log('abc');
          }}
        >
          <MicFill />
        </Button>
        <Button
          variant="record"
          onClick={() => SpeechRecognition.stopListening()}
        >
          <MicMuteFill />
        </Button>
      </ButtonGroup>
      <CSSTransition in={transcript ? true : false} timeout={300} classNames="fade">
        <p>
          {transcript
            ? transcript
            : 'Press the microphone button and start speaking'}
        </p>
      </CSSTransition>
    </div>
  );
};

const styleButton = () => {
  return (
    <style type="text/css">
      {`
          .btn-record {
          background-color: #edc7b7;
          color: #ac3b61;
          }

          .btn-xxl {
          padding: 1rem 1.5rem;
          font-size: 1.5rem;
          }
      `}
    </style>
  );
};

export default Dictaphone;
