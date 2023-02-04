import {autocompleteClasses, Button, TextField} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import {KeyboardEvent} from 'react';
import Theme from '../theme';

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

const MessageInput: React.FC = () => {
  const classes = useStyles();

  const handleSend = () => {
    alert('HELLO!');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={classes.inputContainer}>
      <TextField className={classes.input} placeholder="Type something..." onKeyDown={handleKeyDown} />
      <Button variant="contained" className={classes.sendButton} onClick={handleSend}>
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
