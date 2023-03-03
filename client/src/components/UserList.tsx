import {Button, Popover, List, ListItemButton, ListItemText} from '@mui/material';
import Person from '@mui/icons-material/Person';
import {makeStyles} from '@mui/styles';
import Theme from 'src/theme';
import {useRef, useState} from 'react';

type Presence = {
  timestamp: number;
  data: {
    name: string;
  };
};

type Props = {
  presences: Presence[];
};

// @ts-ignore
const useStyles = makeStyles((theme: typeof Theme) => ({
  button: {
    position: 'absolute !important',
    top: '10px !important',
    right: '10px !important',
    padding: `${theme.spacing(1)} ${theme.spacing(1)} !important`,
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
  list: {
    maxHeight: '80vh',
  },
  listItemButton: {
    width: '20em',
    maxWidth: '20em',
  },
  listItemText: {
    wordWrap: 'break-word',
  },
}));

const UserList: React.FC<Props> = ({presences}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const parsedPresences = presences.filter((presence) => presence.data.name);

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Button ref={buttonRef} className={classes.button} variant="contained" onClick={toggleOpen}>
        <Person className={classes.buttonIcon} />
        {parsedPresences.length}
      </Button>
      <Popover
        open={open}
        onClose={toggleOpen}
        anchorEl={buttonRef.current}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <List className={classes.list}>
          {parsedPresences.map((presence) => {
            const connectedDate = new Date(presence.timestamp);
            const isAfternoon = connectedDate.getHours() >= 12;

            return (
              <ListItemButton className={classes.listItemButton}>
                <ListItemText
                  className={classes.listItemText}
                  primary={presence.data.name}
                  secondaryTypographyProps={{variant: 'caption'}}
                  secondary={`Connected at ${
                    !(connectedDate.getHours() % 12) ? 12 : connectedDate.getHours() % 12
                  }:${String(connectedDate.getMinutes()).padStart(2, '0')} ${
                    isAfternoon ? 'PM' : 'AM'
                  }, ${connectedDate.getDate()}/${connectedDate.getMonth() + 1}/${connectedDate.getFullYear()}`}
                ></ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </Popover>
    </>
  );
};

export default UserList;
