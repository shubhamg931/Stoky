import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {Content, Card, CardItem, Icon, Right} from "native-base";
import firebase from "firebase";
import 'firebase/firestore';
import config from '../config/config';

export default class StockScreen extends React.Component {
  static navigationOptions = {
    title: 'View Stock',
  };

  constructor(props){
    super(props);
    this.state = {
      list: [{id: "sdfsdf", name: "loading list...", quantity: "loading..."}],
    }
  }

  componentDidMount(){
    if(!firebase.apps.length)
      firebase.initializeApp(config);

    const db = firebase.firestore();
    const settings = { timestampsInSnapshots: true};
    db.settings(settings);

    db.collection(`users/${firebase.auth().currentUser.uid}/stock`).onSnapshot((query) => {
      let data, list = [];
      query.forEach((doc) => {
        data = doc.data();
        console.log("amm: " + JSON.stringify(data));
        list.push(data);
        this.setState({list: list});
      });
    });

    console.log("COMPONENT RENDERED!");

  }

  renderStock = () => {
    return this.state.list.map((data) => {
     return(
      <Card key={data.id}>
        <CardItem style={styles.cardStyle}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexGrow: 1}}>
              <Icon active name="playlist-check" type="MaterialCommunityIcons"/>
            </View>
            <View style={{flexGrow: 7}}>
              <Text>{data.name} - {data.quantity} gm</Text>
            </View>
            <View style={{flexGrow: 2}}>
              <Right>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flexGrow: 2}}>
                    <Icon name="md-add-circle"/>
                  </View>
                  <View style={{flexGrow: 2}}>
                    <Icon name="arrow-forward"/>
                  </View>
                </View>
              </Right>
            </View>
          </View>
        </CardItem>
      </Card>
     );
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Content>
          {this.renderStock()}
        </Content>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  cardStyle: {
  }
});
