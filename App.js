/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import SearchableDropDown from './Component/SearchableDropDownPicker/SearchableDropDownPicker';


const App = () => {
  const [selectedService, setSelectedService] = useState(null);
  const data  = [
    {
      id:1,
      name:'USA'
    },
    {
      id:1,
      name:'Canada'
    },
    {
      id:1,
      name:'UAE'
    },
    {
      id:1,
      name:'Australia'
    }
  ]
  return (
    <SafeAreaView style={styles.container}>
      <SearchableDropDown
          list1={data}
          isSearchEnabled={true}
          title={'Select Countries'}
          selectedObjectProp={selectedService}
          onItemSelect={item => {
            setSelectedService(item);
          }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
flex:1,
justifyContent:'center',alignItems:'center'
  },
});

export default App;
