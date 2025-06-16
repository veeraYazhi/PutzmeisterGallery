import { Photo } from './index';
import { ROUTES } from '../constants/routes';

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.PHOTO_DETAIL]: { photo: Photo };
};

export interface HeaderStyle {
  backgroundColor: string;
}

export interface HeaderTitleStyle {
  fontWeight: 'bold';
}

export { ROUTES };


