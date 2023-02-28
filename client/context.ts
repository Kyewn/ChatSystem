import {Realtime} from '@ably-labs/react-hooks';
import {createContext} from 'react';

export const AblyContext = createContext({} as Realtime);
