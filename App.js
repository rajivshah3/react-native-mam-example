/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import * as Mam from '@iota/mam';
import { generateNewSeed } from './crypto';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      seed: '',
    };
    this.onButtonPress = this.unboundOnButtonPress.bind(this);
  }

  async componentDidMount() {
    const seed = await generateNewSeed();
    this.setState({ seed });
  }

  unboundOnButtonPress() {
    const { seed } = this.state;
    if (seed) {
      const mam = Mam.init("https://nodes.thetangle.org:443", seed, 2);
      console.log(mam);
      console.log(seed);
    } else {
      console.warn("Seed has not been generated!");
    }
  }

  render() {
    const { seed } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button onPress={this.onButtonPress} title={seed ? "Press Me!" : "Generating seed..."} disabled={seed ? false : true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
