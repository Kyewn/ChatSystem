import React, {MouseEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {Message} from '../../types';
import Theme from '../theme';
import {SocketContext} from '../../context';

type Props = {
  clientName: string;
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

const MessageInput: React.FC<Props> = ({clientName, handleSend}) => {
  const classes = useStyles();
  const [input, setInput] = useState('');

  const handleModdedSend = (message: Message) => {
    if (!input) {
      return;
    }
    handleSend(message);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, message: Message) => {
    if (e.key === 'Enter') {
      handleModdedSend(message);
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>, message: Message) => {
    handleModdedSend(message);
  };

  return (
    <SocketContext.Consumer>
      {(socket) => (
        <div className={classes.inputContainer}>
          <TextField
            value={input}
            className={classes.input}
            placeholder="Type something..."
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => handleKeyDown(e, {id: socket.id, name: clientName, content: input})}
          />
          <Button
            variant="contained"
            className={classes.sendButton}
            onClick={(e) => handleClick(e, {id: socket.id, name: clientName, content: input})}
          >
            Send
          </Button>
        </div>
      )}
    </SocketContext.Consumer>
  );
};

export default MessageInput;
