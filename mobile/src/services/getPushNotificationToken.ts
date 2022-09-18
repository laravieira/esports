import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {
    const { granted } = await Notifications.getPermissionsAsync();

    if(!granted)
        await Notifications.requestPermissionsAsync();

    if(!granted)
        return;

    const { data: token } = await Notifications.getExpoPushTokenAsync();
    console.log('NOTIFICATION TOKEN: ', token);
    return token;
}