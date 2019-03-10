import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, AsyncStorage} from 'react-native';
import {Container} from 'native-base';
import {Facebook} from "expo";
import firebase from 'firebase';

class AuthScreen extends Component {
    constructor(props){
        super(props);
    }

    facebook = async () => {
        let {type, token} = await Facebook.logInWithReadPermissionsAsync('288397958455507',
            {
                permissions: ['public_profile']
            });

        AsyncStorage.setItem('userToken', token);

        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .then(() => {
                console.log("signed in!");
                this.props.navigation.navigate("Main");
            })
            .catch(() => {
                console.log("sign in failed!");
            })
    }

    render() {
        return (
            <Container style={styles.containerStyle}>
                <View style={{flex: 1}}>
                    <View style={styles.logo}>
                        <Image style={styles.button}
                               resizeMode="contain"
                               source={require('../assets/images/logo.png')}/>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.text}>
                            INVENTORY MANAGEMENT SYSTEM
                        </Text>
                    </View>
                    <View style={styles.login}>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.facebook()}}>
                            <Image style={styles.button}
                                   resizeMode="contain"
                            source={require('../assets/images/facebookLoginButton.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}
let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#ffc242',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button:{
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },
    logo: {
        flexGrow: 7,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'black',
    },
    title:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    text:{
        fontSize: 20,
        color: 'black',
        fontWeight: "bold",
        textShadowColor: '#fff',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    login:{
        flexGrow: 2,
        padding: 10,
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        // backgroundColor: 'white'
    }
});

export default AuthScreen;