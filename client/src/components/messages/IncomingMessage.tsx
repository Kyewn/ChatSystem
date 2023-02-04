import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {makeStyles} from '@mui/styles';
import React from 'react';
import Theme from '../../theme';

type Props = {
  clientName: string;
  message: string;
};

const useStyles = makeStyles((theme: typeof Theme) => ({
  messageRow: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  messageContainer: {
    display: 'flex',
    width: '75%',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
  },
  messageBubble: {
    maxWidth: '100%',
    wordWrap: 'break-word',
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
    color: theme.palette.primary.main,
  },
}));

const IncomingMessage: React.FC<Props> = ({clientName, message}) => {
  const classes = useStyles();

  return (
    <div className={classes.messageRow}>
      <Avatar variant="rounded">
        <PersonIcon />
      </Avatar>
      <div className={classes.messageContainer}>
        <Typography variant="subtitle2">{clientName}</Typography>
        <div className={classes.messageBubble}>{message}</div>
      </div>
    </div>
  );
};

export default IncomingMessage;
