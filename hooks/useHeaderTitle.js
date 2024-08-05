import { useLayoutEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

const useHeaderTitle = (defaultTitle = 'Default Title') => {
  const route = useRoute();
  const navigation = useNavigation();
  const title = route.params?.title || defaultTitle;

  useLayoutEffect(() => {
    navigation.setOptions({ 
      title, 
      headerTitleAlign: 'center' // Center the title
    });
  }, [navigation, title]);
};

export default useHeaderTitle;
