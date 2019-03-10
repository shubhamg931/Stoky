import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import * as actions from '../actions';
import {Button, Card, CardItem, Container, Content, Form, Icon, Input, Item, Label, Picker} from "native-base";

class SellScreen extends React.Component {
  static navigationOptions = {
    title: 'Sell Items',
  };

  constructor(props){
      super(props);
      this.state = {
          ids: [],
          selectedID: undefined,
          selected1: undefined,
          selected2: undefined,
          quantity: '',
          list: [],
      };
  }

  componentDidMount(){
      this.props.loadItems();
  }

  componentWillReceiveProps(nextProps){
      console.log("componentWillReceiveProps sellscreen: " + this.props.Items);
  }

    addToList = () => {
        // console.log("add to list fn called with state as:" + JSON.stringify(this.state));
        let arr = this.state.list, measure= this.state.selected2;

        if(measure === 'Kg'){
            this.state.quantity *= 1000;
        }

        arr.push({
            id: this.state.selectedID,
            name: this.state.selected1,
            quantity: this.state.quantity,
        });
        this.setState({
            list: arr,
            selectedID: undefined,
            selected1: undefined,
            selected2: undefined,
            quantity: '',
        }, () => {
            console.log("State at the point of leaving addtoList fn:" + JSON.stringify(this.state));
        });
    };

    removeFromStock = () => {
        console.log("Remove From stock function called!");
        this.props.removeFromStock(this.state);
        this.setState({
            list: [],
        })
    };

    onValueChange1(value: string, key: string) {
        this.setState({
            selected1: value,
            selectedID: this.state.ids[key-1]
        }, () => {
            console.log("SELECTED_ITEM: " + value);
            console.log("SELECTED_ITEM_KEY: " + key);
        });
    }

    onValueChange2(value: string) {
        this.setState({
            selected2: value,
        }, () => {
            // console.log("SELECTED_MEASURE: " + this.state.selected2);
        });
    }

    renderList = () => {
        let i = 0,arr;
        this.state.ids = [];
        console.log("renderList");
        // console.log(this.props.Item);
        // if(this.props.Item !==  undefined) {
        if (this.props.Item.length > 0)
            arr = this.props.Item;
        else {
            arr = [{name: "loading items...", cost: "56", key: "dsfdsf"}];
        }
        // console.log("houuu");
        console.log("arr.length: " + arr.length);

        return (arr.map(item => {
                ++i;
                this.state.ids.push(item.key);
                // console.log("i:" + i);
                return (
                    <Picker.Item label={item.name} value={item.name} key={item.key}/>
                );
            })
        );
    };

    renderItemsList = () => {
        // console.log("RENDERING!!! with LENGTH: " + this.state.list.length);
        let i = 0;
        if(this.state.list.length > 0){
            return (
                this.state.list.map((listItem) => {
                    i++;
                    return (
                        <CardItem key={`key${i}`}>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Icon active name="checklist" type="Octicons"/>
                                <View style={{flexGrow: 10}}>
                                    <Text>{listItem.name} - {listItem.quantity}gm</Text>
                                </View>
                                <View style={{flexGrow: 1}}>
                                    <TouchableOpacity onPress={() => {this.deleteRow(i)}}>
                                        <Icon name="closecircleo" type="AntDesign" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </CardItem>
                    );
                })
            );
        }
    };

    deleteRow = (value) => {
        console.log("delete row called with values As: ");
        console.log(value);
        console.log("before deleting: " + JSON.stringify(this.state.list));
        this.state.list.splice(value-1, 1);
        console.log("after deleting: " + JSON.stringify(this.state.list));
        this.setState(this.state);
    };

  render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder="Select your SIM"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={{ margin: 5 }}
                            selectedValue={this.state.selected1}
                            onValueChange={this.onValueChange1.bind(this)}
                        >
                            <Picker.Item label="Select Item Name" enabled={false} />
                            {this.renderList()}
                        </Picker>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <View style={{flexGrow: 3}}>
                                <Item floatingLabel>
                                    <Label>Quantity</Label>
                                    <Input keyboardType="numeric" value={this.state.quantity} onChangeText={(quantity) => {this.setState({quantity})}}/>
                                </Item>
                            </View>
                            <View style={{flexGrow: 2}}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={{ width: undefined }}
                                    selectedValue={this.state.selected2}
                                    onValueChange={this.onValueChange2.bind(this)}
                                >
                                    <Picker.Item label="Unit" enabled={false} />
                                    <Picker.Item label="Kg" value="Kg" />
                                    <Picker.Item label="gm" value="gm" />
                                </Picker>
                            </View>
                        </View>
                    </Form>
                    <Button block success style={styles.buttonStyle} onPress={() => {
                        this.addToList()
                    }}>
                        <Text style={{color: 'white'}}>Add Item</Text>
                    </Button>
                    <View
                        style={{
                            borderBottomColor: '#8f97a0',
                            borderBottomWidth: 1,
                        }}
                    />
                    <Button block info style={styles.sellButtonStyle} onPress={() => {this.removeFromStock()}}>
                        <Text style={{color: 'white'}}>Sell Items</Text>
                    </Button>

                    <Card>
                        {this.renderItemsList()}
                    </Card>
                </Content>
            </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    buttonStyle: {
        marginVertical: 50,
        marginHorizontal: 10,
    },
    sellButtonStyle: {
        marginVertical: 20,
        marginHorizontal: 10,
    }
});

const mapStateToProps = ({addItem}) => {
  return({
      Item: addItem.items,
  });
};

export default connect(mapStateToProps, actions)(SellScreen);