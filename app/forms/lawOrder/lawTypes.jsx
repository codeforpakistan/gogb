import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import useLawTypes from '../../../hooks/useLawTpes'

const LawTypesDropdown = ({ value, onValueChange }) => {
  const { lawTypes } = useLawTypes();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(value); 

  useEffect(() => {
    if (lawTypes.length > 0) {
      setItems(
        lawTypes.map((lawType) => ({
          label: lawType.title, 
          value: lawType.id,   
        }))
      );
    }
  }, [lawTypes]);

  useEffect(() => {
    setSelectedValue(value); 
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={selectedValue}
      items={items}
      setOpen={setOpen}
      setValue={setSelectedValue}
      setItems={setItems}
      onChangeValue={onValueChange} 
      searchable={true}
      placeholder="Select or search a law type"
      style={{
        borderColor: '#ccc',
        marginBottom: 15,
        borderRadius: 5,
        paddingHorizontal: 10,
      }}
      dropDownContainerStyle={{ borderColor: '#ccc' }}
    />
  );
};

export default LawTypesDropdown;
