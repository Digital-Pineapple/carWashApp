import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from './EditProfile';
import BecomePartner from './BecomePartner';

const Stack = createNativeStackNavigator();

const ProfileNavigator = (): JSX.Element => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EditProfile" component={EditProfile}  />
            <Stack.Screen name="BecomePartner" component={BecomePartner}  />
        </Stack.Navigator>
    )
}

export default ProfileNavigator;