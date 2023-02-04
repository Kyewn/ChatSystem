import {makeStyles} from '@mui/styles';
import React from 'react';
import {Typography} from '@mui/material';
import Theme from '../../theme';

type Props = {
  message: string;
};

const useStyles = makeStyles((theme: typeof Theme) => ({
  messageRow: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
  messageBubble: {
    maxWidth: '80%',
    wordWrap: 'break-word',
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '10px',
  },
}));

const SystemMessage: React.FC<Props> = ({message}) => {
  const classes = useStyles();

  return (
    <div className={classes.messageRow}>
      <div className={classes.messageBubble}>
        <Typography variant="body2">{message}</Typography>
      </div>
    </div>
  );
};

export default SystemMessage;
