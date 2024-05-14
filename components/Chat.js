import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected }) => {

    const { name, background, userID } = route.params;
    const [messages, setMessages] = useState([]);
    const collectionName = "messages";


    const onSend = async (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        let newItem = {
            ...newMessages[0],
            createdTime: new Date()
        }
        await addDoc(collection(db, collectionName), newItem);
    }

    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    // useEffect hook to set messages options
    let unsubMessages;
    useEffect(() => {
        if (isConnected === true) {
            // unregister current onSnapshot() listener to avoid registering multiple listeners when
            // useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;
            navigation.setOptions({ title: name });
            // Create a query to get the "messages" collection from the Firestore database
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            // This function will be called whenever there are changes in the collection.
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                // Iterate through each document in the snapshot
                docs.forEach(doc => {
                    newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()), })
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]); //isConnected used as a dependency value enabling the component to call the callback of useEffect whenewer the isConnected prop's value changes.


    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem(
                "messages",
                JSON.stringify(messagesToCache)
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    // Call this function when isConnected prop turns out to be false in useEffect()
    const loadCachedMessages = async () => {
        // The empty array is for cachedMessages in case AsyncStorage() fails when the messages item hasn’t been set yet in AsyncStorage.
        const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
        setMessages(JSON.parse(cachedMessages));
    };



    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Chat;
