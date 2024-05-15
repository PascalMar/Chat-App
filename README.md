# Project Description
Chat app for mobile devices using React Native. This app provides users with a chat interface and options to share images and their location.

# Project Features
- Send and receive messages in real-time
- Share location
- Take a photo and share
- Choose a photo from library and share
- Customize theme(e.g Backgroundcolor)

## Technologies Used

* React Native
* Expo
* Expo ImagePicker
* Expo Location
* Google Firestore/Firebase
* Gifted Chat Library
* Android Studio


## Dependencies

* @react-navigation/native: ^6.1.17
* @react-navigation/native-stack: ^6.9.26
* expo: ~50.0.13
* expo-status-bar: ~1.11.1
* firebase: ^10.3.1
* react: "18.2.0
* react-native: 0.73.5
* react-native-gifted-chat: ^2.4.0
* react-native-safe-area-context: 4.8.2
* react-native-screens: ~3.29.0
* @react-native-async-storage/async-storage: 1.21.0
* @react-native-community/netinfo: 11.1.0
* expo-image-picker: ~14.7.1
* expo-location: ~16.5.5
* react-native-maps: 1.10.0

## Project Setup

### Prerequisites

* use Node.js version 16

`nvm install 16.19.0`
`nvm use 16.19.0`
`nvm alias default 16.19.0`

### Google Firestore/Firebase

* create an account and a new project
* obtain the configuration code, and add it to App.js:
* set up the database under build --> Firestore Database
* activate storage
* change rules to: 

`allow read, write: if true`

for database and storage

* activate anonymous authentication

## Installation

1. clone the repository 

`git clone https://github.com/Eliaslichi96/chat-app`

2. navigate to the project directory
3. install dependencies

`npm install`

4. start the expo project

`npx expo start`

## Testing Options

* download and connect the expo app on your mobile device
* Android Studio (android)
* Xcode (iOS)
