import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLawTypes } from '../redux/lawTypesSlice';

const useLawTypes = () => {
  const dispatch = useDispatch();
  const lawTypes = useSelector((state) => state.lawTypes.lawTypes);
  const status = useSelector((state) => state.lawTypes.status);
  const error = useSelector((state) => state.lawTypes.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLawTypes());
    }
  }, [status, dispatch]);

  return { lawTypes, status, error };
};

export default useLawTypes;
