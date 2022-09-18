import { Background } from './src/components/Background';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { useEffect, useRef } from 'react';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

//TODO Implement backend notification
//TODO Public

export default function App() {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
    getNotificationListener.current = Notifications.addNotificationReceivedListener(onNotificationReceived);
    getNotificationListener.current = Notifications.addNotificationResponseReceivedListener(onNotificationResponsed);
    return () => {
      if(getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    };
  }, []);

  function onNotificationReceived(notification: Notifications.Notification) {
      console.log(notification);
  }

  function onNotificationResponsed(response: Notifications.NotificationResponse) {
      console.log(response);
  }

  return (
    <Background>
      { fontLoaded ? <Routes /> : <Loading /> }
    </Background>
  );
}
