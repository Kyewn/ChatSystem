import React, {MouseEvent, KeyboardEvent, useState, useRef} from 'react';
import {Button, TextField} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {Message} from '../../../types';
import Theme from '../theme';
import {SocketContext} from '../../context';

type Props = {
  handleSend: (message: Message) => void;
};

const useStyles = makeStyles((theme: typeof Theme) => ({
  inputContainer: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignContent: 'center',
  },
  input: {
    width: '100%',
    '& input': {
      padding: `${theme.spacing(2)} ${theme.spacing(1)} !important`,
    },
  },
  sendButton: {
    boxShadow: 'none !important',
    marginLeft: `${theme.spacing(2)} !important`,
  },
}));

const MessageInput: React.FC<Props> = ({handleSend}) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, message: Message) => {
    if (e.key === 'Enter') {
      handleSend(message);
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>, message: Message) => {
    (inputRef.current as HTMLInputElement).value = '';
    handleSend(message);
  };

  return (
    <SocketContext.Consumer>
      {(socket) => (
        <div className={classes.inputContainer}>
          <TextField
            inputRef={inputRef}
            value={input}
            className={classes.input}
            placeholder="Type something..."
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => handleKeyDown(e, {id: socket.id, content: input})}
          />
          <Button
            variant="contained"
            className={classes.sendButton}
            onClick={(e) => handleClick(e, {id: socket.id, content: input})}
          >
            Send
          </Button>
        </div>
      )}
    </SocketContext.Consumer>
  );
};

export default MessageInput;
