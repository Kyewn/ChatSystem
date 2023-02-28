import {Button, Slide, TextField} from '@mui/material';
import {Container} from '@mui/system';
import {makeStyles} from '@mui/styles';
import {KeyboardEvent, useState, useRef} from 'react';
import Theme from '../theme';
import Typography from '@mui/material/Typography';

type Props = {
  visible: boolean;
  handleJoinRoom: (name: string) => void;
};

type ErrorType = '' | 'emptyInput' | 'nameExisted';

const useStyles = makeStyles((theme: typeof Theme) => ({
  container: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    maxWidth: 'unset !important',
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    zIndex: 1,
    '& > *:not(:first-child)': {
      marginTop: `${theme.spacing(4)} !important`,
    },
  },
  btnJoin: {
    marginLeft: `${theme.spacing(2)} !important`,
    border: '2px solid #fff !important',
    color: '#fff !important',
  },
  nameInputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtName: {
    outline: `unset !important`,
    border: 'none !important',
    '& *': {
      border: 'none !important',
    },
    '& input': {
      border: `1px solid ${theme.palette.primary.dark} !important`,
      borderRadius: '10px',
      color: '#fff !important',
    },
    '& input:focus': {
      border: `1px solid ${theme.palette.primary.dark} !important`,
    },
  },
  errorLabel: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '0.9em !important',
  },
}));

const Lobby: React.FC<Props> = ({visible, handleJoinRoom}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [error, setError] = useState<ErrorType>('');

  const joinRoom = (name: string) => {
    if (!name) {
      setError('emptyInput');
      return;
    }
    setError('');
    try {
      handleJoinRoom(name);
    } catch {
      setError('nameExisted');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, name: string) => {
    if (e.key === 'Enter') {
      joinRoom(name);
    }
  };

  return (
    <Slide direction="down" in={visible}>
      <Container className={classes.container}>
        <Typography variant="h2">Chat System</Typography>
        <div className={classes.nameInputContainer}>
          <TextField
            value={name}
            className={classes.txtName}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, name)}
            placeholder="Enter username..."
          ></TextField>
          <Button variant="outlined" className={classes.btnJoin} onClick={() => joinRoom(name)}>
            Join
          </Button>
        </div>
        {!!error &&
          (error === 'nameExisted' ? (
            <Typography className={classes.errorLabel}>
              Someone is already using that name, please choose a new name.
            </Typography>
          ) : (
            <Typography className={classes.errorLabel}>No username provided!</Typography>
          ))}
      </Container>
    </Slide>
  );
};

export default Lobby;
