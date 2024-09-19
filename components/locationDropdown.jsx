import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import useAddresses from '../hooks/useAddresses';

const LocationDropdown = ({ value, onValueChange }) => {
  const { addresses } = useAddresses();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(value); // Track the selected value

  useEffect(() => {
    if (addresses.length > 0) {
      setItems(
        addresses.map((address) => ({
          label: `${address.Town} (${address.District}, ${address.Division})`,
          value: `${address.id}`, 
        }))
      );
    }
  }, [addresses]);

  useEffect(() => {
    setSelectedValue(value); // Update selected value when props change
  }, [value]);

  return (
    <DropDownPicker
      listMode='MODAL'
      open={open}
      value={selectedValue}
      items={items}
      setOpen={setOpen}
      setValue={setSelectedValue}
      setItems={setItems}
      onChangeValue={onValueChange} // Ensure onValueChange updates parent state
      searchable={true}
      placeholder="Select or search a location"
      style={{
        borderColor: '#ccc',
        marginBottom: 15,
        borderRadius: 5,
        paddingHorizontal: 10,
        zIndex: 3000, // Increased zIndex
        elevation: 3000, // For Android
      }}
      dropDownContainerStyle={{
        borderColor: '#ccc',
        zIndex: 2000, // Ensure it's below the main picker
        elevation: 2000,
      }}
      zIndex={3000} // Ensure this is higher than other components
    />
  );
};

export default LocationDropdown;
