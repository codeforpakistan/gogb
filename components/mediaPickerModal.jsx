import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons

const MediaPickerModal = ({ visible, onClose, mediaType, onSelect, setModalVisible }) => {
  const handleSelect = (type) => {
    onSelect(type);
    setModalVisible(false);
  };

  const renderOptions = () => {
    switch (mediaType) {
      case 'photo':
        return (
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => handleSelect('camera')}>
              <Icon name="camera-outline" size={30} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect('gallery')}>
              <Icon name="images-outline" size={30} color="#007AFF" />
            </TouchableOpacity>
          </View>
        );
      case 'audio':
        return (
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => handleSelect('mic')}>
              <Icon name="mic-outline" size={30} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect('gallery')}>
              <Icon name="images-outline" size={30} color="#007AFF" />
            </TouchableOpacity>
          </View>
        );
      case 'document':
        return (
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => handleSelect('document')}>
              <Icon name="document-outline" size={30} color="#007AFF" />
            </TouchableOpacity>
          </View>
        );
      case 'video':
        return (
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => handleSelect('camera')}>
              <Icon name="videocam-outline" size={30} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect('gallery')}>
              <Icon name="images-outline" size={30} color="#007AFF" />
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {renderOptions()}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close-outline" size={30} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%', // Adjust width as needed
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row', // Arrange content in a row
    flexWrap: 'wrap', // Allow wrapping if necessary
    justifyContent: 'space-between', // Space out icons
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
    marginBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default MediaPickerModal;

