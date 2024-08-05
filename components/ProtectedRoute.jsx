import React, { useEffect } from 'react';
import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  useEffect(() => {
    if (!navigationState?.key) return;
    const inAuthGroup = segments[0] === "(auth)";
    if (!user && !inAuthGroup) {
      router.replace('/login');
    }
  }, [user, segments, navigationState?.key]);
  return children;
};
