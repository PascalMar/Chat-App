import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const [background, setBackground] = useState('');

    const auth = getAuth();

    const signInUser = () => {
        signInAnonymously(auth).then(res => {
            navigation.navigate("Chat", { userID: res.user.uid, name: name, background: background });
            Alert.alert("Signed in Successfully");
        }).catch(err => {
            Alert.alert("Unable to sign in, try later again");
        })
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../images/background-img.png")}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Type your username her'
                />
                <View style={styles.colorButtonContainer}>
                    {colors.map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            accessible={true}
                            accessibilityRole="button"
                            accessibilityHint="Lets you choose background color for your chat screen"
                            style={[
                                styles.colorButton,
                                { backgroundColor: color },
                                background === color && styles.selectedColor,
                            ]}
                            onPress={() => setBackground(color)}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityHint="Lets you choose to enter the chat room"
                    style={styles.button}
                    onPress={() => {
                        if (name == '') {
                            Alert.alert('You need a username');
                        } else {
                            signInUser();
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
            </ImageBackground >
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, textInput: {
        width: '88%',
        borderColor: 'black',
        borderRadius: 4,
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        opacity: 50,
        padding: 15,
        borderWidth: 1,
        marginBottom: 10,
        placeholderTextColor: 'black',
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#757083',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.25,
        color: '#FFFFFF',
    },
    chooseBgColor: {
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity: 100,
    },
    colorButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5
    },
    selectedColor: {
        borderColor: 'white',
        borderWidth: 2,
    },
});

export default Start;
