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
    justifyContent: 'flex-end',
    margin: theme.spacing(2),
  },
  messageContainer: {
    display: 'flex',
    width: '75%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: theme.spacing(2),
  },
  messageBubble: {
    maxWidth: '100%',
    wordWrap: 'break-word',
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
    color: theme.palette.secondary.light,
  },
}));

const UserMessage: React.FC<Props> = ({clientName, message}) => {
  const classes = useStyles();

  return (
    <div className={classes.messageRow}>
      <div className={classes.messageContainer}>
        <Typography variant="subtitle2">{clientName}</Typography>
        <div className={classes.messageBubble}>{message}</div>
      </div>
      <Avatar variant="rounded">
        <PersonIcon />
      </Avatar>
    </div>
  );
};

export default UserMessage;
