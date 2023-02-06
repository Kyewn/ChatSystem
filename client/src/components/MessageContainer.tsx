import {Container} from '@mui/material';
import {makeStyles} from '@mui/styles';
import Theme from '../theme';
import React from 'react';
import IncomingMessage from './messages/IncomingMessage';
import UserMessage from './messages/UserMessage';
import SystemMessage from './messages/SystemMessage';

type Props = {
  renderMessages: () => JSX.Element[];
};

const useStyles = makeStyles((theme: typeof Theme) => ({
  container: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '5px',
    width: '75%',
    height: '75%',
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const MessageContainer: React.FC<Props> = ({renderMessages}) => {
  const classes = useStyles();

  return <Container className={classes.container}>{renderMessages()}</Container>;
};

export default MessageContainer;
