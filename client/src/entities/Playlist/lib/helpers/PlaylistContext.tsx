import { createContext } from 'react';
import { IPlaylist } from '../../model/types';

export const PlaylistContext = createContext<IPlaylist | null>(null);
