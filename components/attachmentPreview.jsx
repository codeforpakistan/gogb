import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import pb from '../pocketbaseClient';

const AttachmentPreview = ({ item, id, onRemove, page }) => {
  function truncateFileName(fileName) {
    const maxLength = 25;
    const extension = fileName.split('.').pop();
    return fileName.length > maxLength
      ? fileName.substring(0, maxLength) + '.....' + extension
      : fileName;
  }

  const renderPreview = () => {
    if (!item) {
      return <Text>Unable to load preview</Text>;
    }
    if (typeof(item ==='string')) {
     const url = `https://pb.codeforpakistan.org/api/files/rhr614cyyzbvkfr/${id}/${item}`;
     const extension = url.split('.').pop();
     switch(extension){
      case 'jpg':
      case 'jpeg':
      case 'png': 
      return (
        <Image source={{ uri: url}} style={styles.image} />
      );
      case 'pdf':
      case 'google-doc':
      case 'doc':
      case 'txt':
        return (
          <View style={styles.preview}>
            <TabBarIcon name="document-outline" color="#007AFF" />
            <Text style={styles.fileName}>{truncateFileName(item) || 'Document'}</Text>
          </View>
        );
     }
    }
    switch (item.view) {
      case 'image':
        return (
          <Image source={{ uri: item.uri}} style={styles.image} />
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
            <Text style={styles.fileName}>{truncateFileName(item.name) || 'Document'}</Text>
          </View>
        );
      case 'audio':
        return (
          <View style={styles.preview}>
            <TabBarIcon name="mic-outline" color="#007AFF" />
            <Text style={styles.fileName}>{truncateFileName(item.name) || 'Audio File'}</Text>
          </View>
        );
      default:
        return <Text>{item.name || item.type?.toUpperCase()}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderPreview()}
      {page !== 'details' ? 
      <TouchableOpacity onPress={onRemove}>
      <TabBarIcon name="trash-outline" color="red" />
      </TouchableOpacity> : ''
      }
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

