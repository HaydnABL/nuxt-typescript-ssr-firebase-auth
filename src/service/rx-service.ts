import { Subject } from 'rxjs';
import { Image } from '~/types';

export const profilePhotoObservable = new Subject<Image>();