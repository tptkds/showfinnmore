import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../types/reduxTypes';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
