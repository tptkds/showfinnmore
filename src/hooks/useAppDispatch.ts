import { AppDispatch } from '@/types/reduxTypes';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
