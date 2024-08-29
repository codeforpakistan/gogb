import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { dbDate } from '../../../utils/formatDate';
const ActionTakenModal = ({ visible, onClose, onConfirm, activity }) => {
  const [actionTaken, setActionTaken] = useState('');

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Resolve Activity</Text>
          <Text style={styles.alertMessage}>
            Are you sure you want to mark this activity as resolved?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter action taken"
            value={actionTaken}
            onChangeText={setActionTaken}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Confirm" onPress={() => {
              const newActivity = {
                ...activity,
                end: dbDate(),
                status: 'oc1pvgu8gv29bp0',
                actionTaken: actionTaken,
              };
              onConfirm(newActivity);
            }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ActionTakenModal;
