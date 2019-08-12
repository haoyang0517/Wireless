import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Picker
} from 'react-native';
import {
  InputWithLabel,
  PickerWithLabel,
  AppButton,
} from './UI';


let SQLite = require('react-native-sqlite-storage');

type Props = {};
export default class CreateScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Add Movie',
  };

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      language: 'English',
      release_date: '',
    };

    this._insert = this._insert.bind(this);

    this.db = SQLite.openDatabase({name: 'Moviedb', createFromLocation : '~moviesdb.sqlite'}, this.openDb, this.errorDb);
  }

  _insert() {
    this.db.transaction((tx) => {
      tx.executeSql('INSERT INTO movies(title,language,release_date) VALUES(?,?,?)', [
        this.state.title,
        this.state.language,
        this.state.release_date,
      ]);
    });

    this.props.navigation.getParam('refresh')();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <InputWithLabel style={styles.input}
          label={'Title'}
          value={this.state.title}
          onChangeText={(title) => {this.setState({title})}}
          orientation={'vertical'}
        />
        <Text style={styles.label}>Language </Text>
        <Picker
          style={styles.picker}
          mode={'dropdown'}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => 
            this.setState({language: itemValue})
          }>
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Malay" value="Malay" />
          <Picker.Item label="Mandarin" value="Mandarin" />
          <Picker.Item label="Cantonese" value="Cantonese"/>
          <Picker.Item label="Japanese" value="Japanese"/>
          <Picker.Item label="Korean" value="Korean" />

        </Picker>
        <InputWithLabel style={styles.input}
          label={'Release Date'}
          value={this.state.release_date}
          onChangeText={(release_date) => {this.setState({release_date})}}
          orientation={'vertical'}
        />
        
        <AppButton style={styles.button}
          title={'Save'}
          theme={'primary'}
          onPress={this._insert}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },
});