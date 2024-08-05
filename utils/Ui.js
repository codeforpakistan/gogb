import useAddresses from '../hooks/useAddresses';
import useLawTypes from '../hooks/useLawTpes';

export const getInitials = (str) => {
    if (!str) return '';
    return str.substring(0, 2).toUpperCase();
  };

export const getLoctaionTitle = (id) =>{
  if (!id) return '';
  const { addresses } = useAddresses();
  const item = addresses?.find((addr) => id === addr?.id)
  return (`${item?.Town},${item?.District}`)
}

export const getTypeTitle = (id) =>{
  if (!id) return '';
  const { lawTypes } = useLawTypes();
  const item = lawTypes?.find((type) => id === type?.id)
  return item?.title
}