import {Container} from '@mui/material';
import {makeStyles} from '@mui/styles';
import Theme from '../theme';
import React from 'react';
import IncomingMessage from './messages/IncomingMessage';
import UserMessage from './messages/UserMessage';
import SystemMessage from './messages/SystemMessage';

const useStyles = makeStyles((theme: typeof Theme) => ({
  container: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '5px',
    width: '75%',
    height: '75%',
    overflowY: 'scroll',
    marginBottom: theme.spacing(2),
  },
}));

const MessageContainer: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <IncomingMessage
        clientName="asd"
        message="asdaasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsd"
      />
      <UserMessage
        clientName="asd"
        message="asdaasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsd"
      />
      <SystemMessage message="asdaasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsd" />
      <UserMessage
        clientName="asd"
        message="asdaasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsd"
      />{' '}
      <IncomingMessage
        clientName="asd"
        message="asdaasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsd"
      />
    </Container>
  );
};

export default MessageContainer;
