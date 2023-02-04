import MessageInput from './components/MessageInput';
import MessageContainer from './components/MessageContainer';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    width: '100vw',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <MessageContainer />
      <MessageInput />
    </div>
  );
}

export default App;
