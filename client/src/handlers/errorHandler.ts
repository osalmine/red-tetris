import { Store } from 'react-notifications-component';
import { Errors } from '../types';

const addErrorNotification = ({ title, message }: { title: string, message: string }) => {
  Store.addNotification({
    title,
    message,
    container: 'top-right',
    type: 'danger',
    insert: 'top',
    dismiss: {
      duration: 4000,
      onScreen: true,
      pauseOnHover: true,
    },
  });
};

const handleError = ({ error }: Errors) => {
  console.log('receive ERROR: ', error);
  if (error.name === 'PlayerAlreadyExistsError') {
    addErrorNotification({
      title: 'Player already exists',
      message: `Player named ${error.data.playerName} has already joined the game`,
    });
  }
  else if (error.name === 'GameAlreadyStartedError') {
    addErrorNotification({
      title: 'Game already started',
      message: `Game named ${error.data.roomName} has already started`,
    });
  }
};

export default handleError;