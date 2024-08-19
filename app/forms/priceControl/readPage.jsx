import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLoctaionTitle, getTypeTitle } from '../../../utils/Ui';
import { dateDisplay, dbDate } from '../../../utils/formatDate';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useHeaderTitle from '@/hooks/useHeaderTitle';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { handleInspectionSubmission } from '../../../utils/priceControlUtils';
import AttachmentPreview from '../../../components/attachmentPreview';

const ReadPage = () => {
  // Ensure hooks are always called at the top level
  useHeaderTitle('Inspection Details');
  const router = useRouter();
  const dispatch = useDispatch();
  const inspections = useSelector((state) => state.priceControl.allInspections);
  const offlineInspections = useSelector((state) => state.priceControl.offlineInspections);
  const inspection = useSelector((state) => state.priceControl.currInspection);

  // Function handlers should be defined outside of the render logic
  const handleEdit = (inspection) => {
    router.push({
      pathname: '/forms/priceControl/priceControlForm',
      params: {id: inspection.id },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inspection Details</Text>
      </View>
      {inspection && (
        <>
          <View style={styles.detailContainer}>
            <Text style={styles.detailText}>Location: {getLoctaionTitle(inspection.location) || ""}</Text>
            <Text style={styles.detailText}>Date Time: {inspection.datetime}</Text>
            <Text style={styles.detailText}>Shops Visited: {inspection.shops_visited}</Text>
            <Text style={styles.detailText}>Arrests Made: {inspection.arrests_made}</Text>
            <Text style={styles.detailText}>Violations: {inspection.violations}</Text>
            <Text style={styles.detailText}>Compliances: {inspection.compliances}</Text>
            <Text style={styles.detailText}>Fines Issued: {inspection.fines_issued}</Text>
            <Text style={styles.detailText}>Warnings Issued: {inspection.warnings_issued}</Text>
            <Text style={styles.detailText}>Shops Sealed: {inspection.shops_sealed}</Text>
            <Text style={styles.detailText}>FIRs Registered: {inspection.firs_registered}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => handleEdit(inspection)} style={{ ...styles.button, backgroundColor: '#1DA1F2' }}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          {inspection.attachments && (
            <View>
              {inspection.attachments.map((item, index) => (
                <AttachmentPreview
                  key={index}
                  item={item}
                  id={inspection.id}
                  page="details"
                />
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10,
    marginBottom:20
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:3,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ReadPage;
