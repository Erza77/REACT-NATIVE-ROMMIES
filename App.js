import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { firebaseConfig } from './config';

import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import GroupScreen from './screens/GroupScreen';
import CalendarScreen from './screens/CalendarScreen';
import EventFormScreen from './screens/EventFormScreen';
import ProfileHome from './screens/ProfileHome';
import FeedScreen from './screens/FeedScreen';
import TbdScreen from './screens/TbdScreen';

import * as firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <AppNavigator />
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
  ProfileHome: ProfileHome,
  CalendarScreen: CalendarScreen,
  EventFormScreen: EventFormScreen,
  GroupScreen: GroupScreen,
  FeedScreen: FeedScreen,
  TbdScreen: TbdScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});