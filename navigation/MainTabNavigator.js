import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {Icon} from 'native-base';
import TabBarIcon from '../components/TabBarIcon';
import AddScreen from '../screens/AddScreen';
import StockScreen from '../screens/StockScreen';
import SellScreen from '../screens/SellScreen';
import NewItemScreen from "../screens/NewItemScreen";

const AddStack = createStackNavigator({
  Add: AddScreen,
});

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused, tintColor }) => (
    <Icon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-add-circle${focused ? '' : '-outline'}`
          : 'ios-add-circle'
      }
      style={{color: tintColor}}
    />
  ),
};

const NewStack = createStackNavigator({
    New: NewItemScreen,
});

NewStack.navigationOptions = {
    tabBarLabel: 'New',
    tabBarIcon: ({ focused, tintColor }) => (
        <Icon
            focused={focused}
            name="burst-new"
            type="Foundation"
            style={{color: tintColor}}
        />
    ),
};

const StockStack = createStackNavigator({
  Stock: StockScreen,
});

StockStack.navigationOptions = {
  tabBarLabel: 'Stock',
  tabBarIcon: ({ focused, tintColor }) => (
    <Icon
      focused={focused}
      name="list"
      type="Entypo"
      style={{color: tintColor}}
    />
  ),
};

const SellStack = createStackNavigator({
  Sell: SellScreen,
});

SellStack.navigationOptions = {
  tabBarLabel: 'Sell',
  tabBarIcon: ({ focused, tintColor }) => (
    <Icon
      focused={focused}
      name="forward"
      type="AntDesign"
      style={{color: tintColor}}
    />
  ),
};

export default createBottomTabNavigator({
    AddStack,
    NewStack,
    StockStack,
    SellStack,
  },
  {
  tabBarOptions:
      {
        activeTintColor: "black",
        inactiveTintColor: "grey"
      }
  });
