import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Content, Item, Form, Input, Label, Button, Toast} from "native-base";
import * as actions from '../actions';
import {connect} from 'react-redux';
import firebase from 'firebase';

class NewItemScreen extends Component{
    sendData = (data) => {
        this.props.registerItem(data);
        this.setState({
            name: '',
            cost: ''
        });
        this.showToast("Item Registered!");
    };

    constructor(props){
        super(props);

        this.state = {
            name: '',
            cost: ''
        }
    }

    static navigationOptions = {
        title: 'Register New Item'
    };

    showToast = (message) => {
        Toast.show({
            text: message,
            buttonText: "Okay",
            type: "success",
            duration: 3000,
            position: "bottom",
            style: { bottom: "80%" }
        });
    };

    componentWillReceiveProps(nextProps) {
        console.log("componentreceive props new item:" + this.props.status);
        if(this.props.status === 'added'){
            this.showToast("hmmm");
        }
    }

    render(){
        return(
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input value={this.state.name} onChangeText={(name) => {this.setState({name})}} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Cost</Label>
                            <Input keyboardType="numeric" value={this.state.cost} onChangeText={(cost) => {this.setState({cost})}} />
                        </Item>
                    </Form>
                    <View style={{padding:10}}>
                        <Button onPress={() => {this.sendData(this.state)}} block success style={styles.buttonStyle}>
                            <Text style={{color: 'white'}}>Register</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        flex: 1,
    },
    buttonStyle:{
        marginTop: 50,
    }

});

const mapStateToProps = ({newItem}) => {
    return ({
        status: newItem.status,
    });
};


export default connect(mapStateToProps, actions)(NewItemScreen);