import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

const AttachmentPreview = ({ item, onRemove }) => {
  const renderPreview = () => {
    if (!item.uri) {
      return <Text>Unable to load preview</Text>;
    }
    
    switch (item.type) {
      case 'image':
        return (
          <Image source={{ uri: item.uri }} style={styles.image} />
        );
      case 'video':
        return (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: item.uri }}
              style={styles.video}
              useNativeControls
              shouldPlay
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <TabBarIcon name="play-circle-outline" color="#fff" />
            </View>
          </View>
        );
      case 'document':
        return (
          <View style={styles.preview}>
            <TabBarIcon name="document-outline" color="#007AFF" />
            <Text style={styles.fileName}>{item.name || 'Document'}</Text>
          </View>
        );
      case 'audio':
        return (
          <View style={styles.preview}>
            <TabBarIcon name="mic-outline" color="#007AFF" />
            <Text style={styles.fileName}>{item.name || 'Audio File'}</Text>
          </View>
        );
      default:
        return <Text>{item.name || item.type?.toUpperCase()}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderPreview()}
      <TouchableOpacity onPress={onRemove}>
        <TabBarIcon name="trash-outline" color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  videoContainer: {
    width: 100,
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileName: {
    marginLeft: 10,
  },
});

export default AttachmentPreview;

