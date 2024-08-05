// useAddresses.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses } from '../redux/addressSlice';

const useAddresses = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.addresses.addresses);
  const status = useSelector((state) => state.addresses.status);
  const error = useSelector((state) => state.addresses.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAddresses());
    }
  }, [status, dispatch]);

  return { addresses, status, error };
};

export default useAddresses;
