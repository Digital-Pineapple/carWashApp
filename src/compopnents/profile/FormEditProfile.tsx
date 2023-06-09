import { Pressable, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAuth } from '../../hooks/useAuth';

import { ICustomer } from '../../Interfaces/LoginInterface';
import { userInfoVlidationSchema } from '../../validations/ProfileValidations';
import { INavigator } from '../../Interfaces/NavigatorInterface';
import { Input } from '../ui';
import { keyboardTypes } from '../ui/Input';

const FormEditProfile = ({ navigation, user }: { navigation: INavigator,  user: ICustomer }): JSX.Element => {

    const { startUpdateUserInfo } = useAuth(navigation);

    const initialValues = {
        fullname    : user.fullname,
        email       : user.email,
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => startUpdateUserInfo(values)}
            validationSchema={userInfoVlidationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                    <Input
                        placeholder="Nombre Completo"
                        Icon={<Ionicons name="person" size={20} color="#fff" />}
                        isPassword={false}
                        name="fullname"
                        containerInputStyle={{}}
                        inputStyle={{}}
                        onChange={handleChange('fullname')}
                        onBlur={handleBlur('fullname')}
                        value={values.fullname}
                        keyboard={keyboardTypes.default}
                        errors={errors || {}}
                    />
                    <Input
                        placeholder='Correo electronico'
                        Icon={<Ionicons name="mail" size={20} color="#fff" />}
                        isPassword={false}
                        name="email"
                        containerInputStyle={{}}
                        inputStyle={{}}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboard={keyboardTypes.emailAddress}
                        errors={errors || {}}
                    />
                     <Input
                        placeholder="Telefono"
                        Icon={<Ionicons name="call" size={20} color="#fff" />}
                        isPassword={false}
                        name="phone"
                        editable={false}
                        containerInputStyle={{}}
                        inputStyle={{}}
                        onChange={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={`${user.phone.prefix} ${user?.phone?.phone_number}`}
                        keyboard={keyboardTypes.numeric}
                        errors={{}}
                    />
                    <Pressable style={styles.buttons} onPress={handleSubmit}>
                        <Text style={{ color: 'white', fontWeight: 'bold', borderColor: 'white' }}>Actualizar</Text>
                    </Pressable>
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        marginVertical: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#666',
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttons: {
        backgroundColor: '#1548a1',
        paddingVertical: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 40,
        maxWidth: '100%', 
    }
});

export default FormEditProfile