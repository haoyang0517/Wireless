import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {
  InputWithLabel,
  PickerWithLabel,
  AppButton,
} from './UI'

let common = require('./CommonData');
let SQLite = require('react-native-sqlite-storage');

type Props = {};
export default class EditScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Edit: ' + navigation.getParam('headerTitle')
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      movieId: this.props.navigation.getParam('id'),
      title: '',
      language: '',
      release_date: '',
    };

    this._query = this._query.bind(this);
    this._update = this._update.bind(this);

    this.db = SQLite.openDatabase({name: 'Moviedb', createFromLocation : '~moviesdb.sqlite'}, this.openDb, this.errorDb);
  }

  componentDidMount() {
    this._query();
  }

  _query() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM movies WHERE id = ?', [this.state.movieId], (tx, results) => {
        if(results.rows.length) {
          this.setState({
            title: results.rows.item(0).title,
            language: results.rows.item(0).language,
            release_date: results.rows.item(0).release_date,
          })
        }
      })
    });
  }

  _update() {
    this.db.transaction((tx) => {
      tx.executeSql('UPDATE movies SET title=?,language=?,release_date=? WHERE id=?', [
        this.state.title,
        this.state.language,
        this.state.release_date,
        this.state.movieId,
      ]);
    });

    this.props.navigation.getParam('refresh')();
    this.props.navigation.getParam('homeRefresh')();
    this.props.navigation.goBack();
  }

  openDb() {
      console.log('Database opened');
  }

  errorDb(err) {
      console.log('SQL Error: ' + err);
  }

  render() {
    let movie = this.state.movie;

    return (
      <ScrollView style={styles.container}>
        <InputWithLabel style={styles.input}
          label={'Title'}
          value={this.state.title}
          onChangeText={(title) => {this.setState({title})}}
          orientation={'vertical'}
        />
        <PickerWithLabel style={styles.picker}
          label={'Language'}
          items={common.languages}
          mode={'dialog'}
          value={this.state.language}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({language: itemValue})
          }}
          orientation={'vertical'}
          textStyle={{fontSize: 24}}
        />
        <InputWithLabel style={styles.input}
          label={'Release Date'}
          value={this.state.release_date}
          onChangeText={(release_date) => {this.setState({release_date})}}
          orientation={'vertical'}
        />
        
        <AppButton style={styles.button}
          title={'Save'}
          theme={'primary'}
          onPress={this._update}
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
  output: {
    fontSize: 24,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
});