import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const useHeaderTitle = (title) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ 
      title, 
      headerTitleAlign: 'center' // Center the title
    });
  }, [navigation, title]);
};

export default useHeaderTitle;
