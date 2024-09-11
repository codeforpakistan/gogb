import React from 'react';
import { Text, FlatList, Image, StyleSheet, View, AppRegistry } from 'react-native';
import { Link } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import { ThemedText } from '@/components/ThemedText';
import {
  DatadogProvider,
  DatadogProviderConfiguration,
  UploadFrequency,
  BatchSize,
  SdkVerbosity,
} from "@datadog/mobile-react-native";

// Datadog configuration
const config = new DatadogProviderConfiguration(
  "pub554769a2e389611f24adf585e085846d",
  "staging",
  "5c538705-1b1a-4c04-84ad-88f2b348c2b9",
  true, true, true
);
config.site = "US5";
config.nativeCrashReportEnabled = true;
config.sessionSamplingRate = 100;
if (__DEV__) {
  config.uploadFrequency = UploadFrequency.FREQUENT;
  config.batchSize = BatchSize.SMALL;
  config.verbosity = SdkVerbosity.DEBUG;
}

// Data for grid icons
const data = [
  { id: '1', name: 'Law & Order', icon: require('../../assets/images/order.png'), link: '/forms/lawOrder/lawNOrder' },
  { id: '2', name: 'Price Control', icon: require('../../assets/images/price.png'), link: '/forms/priceControl/price' },
  // Add more items as needed
];

const Index = () => {
  const renderItem = ({ item }) => (
    <Link href={`${item.link}`} style={styles.itemContainer}>
      <View style={styles.innerContainer}>
        <Image source={item.icon} style={styles.icon} />
        <ThemedText type="subtitle" style={styles.iconName}>{item.name}</ThemedText>   
      </View>
    </Link>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
};

// Main app component with Datadog and Navigation tracking
const Main = () => {
  const navigationRef = React.useRef(null);

  return (
    <DatadogProvider configuration={config}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
        }}
      >
        <Index />
      </NavigationContainer>
    </DatadogProvider>
  );
};

AppRegistry.registerComponent('Go GB', () => Main);

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  innerContainer: {
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  iconName: {
    textAlign: 'center',
    color: '#333',
  },
});

export default Index;