import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

const AttachmentPreview = ({ item, id, onRemove, page, module }) => {
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

    // Handling when item is a string (URL or file name from server)
    if (typeof item === 'string') {
      var url = '';
      if (module === 'lawOrder') {
        url = `https://pb.codeforpakistan.org/api/files/rhr614cyyzbvkfr/${id}/${item}`;
      }
      if (module === 'priceControl') {
        url = `https://pb.codeforpakistan.org/api/files/9gyv934r65fssiy/${id}/${item}`;
      }
      const extension = url.split('.').pop().toLowerCase();
      console.log(url);
      if (['jpg', 'jpeg', 'png'].includes(extension)) {
        return <Image source={{ uri: url }} style={styles.image} />;
      } else if (['pdf', 'doc', 'docx', 'txt', 'xlsx', 'xls'].includes(extension)) {
        return <Text style={styles.fileName}>{truncateFileName(item)}</Text>; // For documents, show name
      } else if (['mp4', 'mov'].includes(extension)) {
        return (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: url }}
              style={styles.video}
              useNativeControls
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <TabBarIcon name="play-circle-outline" color="#fff" />
            </View>
          </View>
        );
      } else if (['mp3', 'wav', 'm4a', 'ogg'].includes(extension)) {
        return <Text style={styles.fileName}>{truncateFileName(item)}</Text>; // Show name for audio files
      } else {
        return <Text>Unsupported file type</Text>;
      }
    }

    // Handling when item is an object (local files with view property)
    switch (item.view) {
      case 'image':
        return <Image source={{ uri: item.uri }} style={styles.image} />;
      case 'video':
        return (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: item.uri }}
              style={styles.video}
              useNativeControls
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <TabBarIcon name="play-circle-outline" color="#fff" />
            </View>
          </View>
        );
      case 'document':
        return <Text style={styles.fileName}>{truncateFileName(item.name)}</Text>; // Show name for documents
      case 'audio':
        return <Text style={styles.fileName}>{truncateFileName(item.name)}</Text>; // Show name for audio files
      default:
        return <Text>{item.name || item.type?.toUpperCase()}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderPreview()}
      {page !== 'details' && (
        <TouchableOpacity onPress={onRemove}>
          <TabBarIcon name="trash-outline" color="red" />
        </TouchableOpacity>
      )}
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
  fileName: {
    marginLeft: 10,
    color: '#007AFF',
  },
});

export default AttachmentPreview;