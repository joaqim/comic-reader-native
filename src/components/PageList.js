import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import axios from 'axios';


class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <TouchableOpacity onPress={this._onPress}>
      <View>
      <Text style={{color: textColor}}>{this.props.title}</Text>
      </View>
      </TouchableOpacity>
    );
  }
}


export default class PageList extends Component {
  state = {
    selected: (new Map(): Map<string, boolean>)
  };

  _keyExtractor = (item, index) => item.key;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.})
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    })
  }
  _renderItem = ({item}) => (
    <MyListItem
    id={item.key}
    onPressItem={this._onPressItem}
    selected={!!this.state.selected.get(item.key)}
    title={item.title}
    />
  );

  componentWillMount() {
    if (this.props.data) {
      return
    }

    {axios.get('https://comic-editor.s3.eu-north-1.amazonaws.com/comics_database.json')
          .then(response => {
            this.setState({data: response.data})
    })}
  }
  
  render() {
    //console.warn(this.props.navigation.state)
    //const { data } = this.props.navigation.state.params;
    //const data = this.props.navigation.getParam('data', undefined);

    //const data = undefined
    const data = this.props.data
    //console.log(data)
    return (
      <View style={styles.container}>
      <Text>PageList</Text>


      {data !== undefined ? <FlatList
        data={data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        /> : null}

      </View>
    );
  }
}

//<FlatList data={['1': 0, '2': 1, '3': 2, '4': 3, '5': 4]} renderItem={({item}) => <Text style={styles.item}>Item: {item.key} </Text>} keyExtractor={(item, index) => index.toString()} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    fontSize: 18,
  },
})

