
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchableDropDown = ({
  error,
  multiSelect,
  selectedArrayProp,
  selectedObjectProp,
  searchBoxContainerStyle,
  inputStyle,
  titleStyle,
  onEndReached1,
  ListFooterComponent1,
  onEndReached2,
  ListFooterComponent2,
  onEndReached3,
  ListFooterComponent3,
  isSearchEnabled,
  placeholder,
  list1,
  list2,
  list3,
  title,
  onItemSelect,
  List1Title,
  List2Title,
  List3Title,
}) => {
  const [typedText, settypedText] = useState(null);
  const [open, setOpen] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedArray, setSelectedArray] = useState(null);
  const [copiedFromReduxList1, setcopiedFromReduxList1] = useState([]);
  const [copiedFromReduxList2, setcopiedFromReduxList2] = useState([]);
  const [copiedFromReduxList3, setcopiedFromReduxList3] = useState([]);
  const [SearchedcopiedFromReduxList1, setSearchedcopiedFromReduxList1] =
    useState([]);
  const [SearchedcopiedFromReduxList2, setSearchedcopiedFromReduxList2] =
    useState([]);
  const [SearchedcopiedFromReduxList3, setSearchedcopiedFromReduxList3] =
    useState([]);

  const onChangeText = txt => {
    settypedText(txt);
    setSelected(null);
    let newList1 = [];
    let newList2 = [];
    let newList3 = [];
    if (copiedFromReduxList1?.length > 0) {
      copiedFromReduxList1?.map(item => {
        let itemTxt = item?.name?.toLowerCase()?.replace(/\s+/g, '');
        let typedText = txt.toLowerCase()?.replace(/\s+/g, '');
        if (itemTxt.includes(typedText)) {
          newList1.push(item);
        }
      });
    }
    if (copiedFromReduxList2?.length > 0) {
      copiedFromReduxList2?.map(item => {
        let itemTxt = item?.name?.toLowerCase()?.replace(/\s+/g, '');
        let typedText = txt.toLowerCase()?.replace(/\s+/g, '');
        if (itemTxt.includes(typedText)) {
          newList2.push(item);
        }
      });
    }
    if (copiedFromReduxList3?.length > 0) {
      copiedFromReduxList3?.map(item => {
        let itemTxt = item?.name?.toLowerCase()?.replace(/\s+/g, '');
        let typedText = txt.toLowerCase()?.replace(/\s+/g, '');
        if (itemTxt.includes(typedText)) {
          newList3.push(item);
        }
      });
    }
    setSearchedcopiedFromReduxList1(newList1);
    setSearchedcopiedFromReduxList2(newList2);
    setSearchedcopiedFromReduxList3(newList3);
  };

  const onToggle = () => {
    setOpen(!open);
  };
  const onFocus = () => {
    setOpen(true);
  };
  const onSelect = item => {
    if (multiSelect) {
      let newArr = [];
      newArr.push(item);
      selectedArray?.map(innerItem => {
        if (innerItem?._id !== item?._id) {
          newArr.push(innerItem);
        }
      });
      onItemSelect(newArr);
      setSelectedArray(newArr);
    } else {
      settypedText(item?.name);
      setSelected(item);
      onItemSelect(item);
      setOpen(false);
    }
  };
  const onDelete = (item, index) => {
    let dup = [...selectedArray];
    dup.splice(index, 1);
    onItemSelect(dup);
    setSelectedArray(dup);
  };

  useEffect(() => {
    setcopiedFromReduxList1(list1);
    setcopiedFromReduxList2(list2);
    setcopiedFromReduxList3(list3);
    setSearchedcopiedFromReduxList1(list1);
    setSearchedcopiedFromReduxList2(list2);
    setSearchedcopiedFromReduxList3(list3);
  }, [list1, list2, list3]);

  useEffect(() => {
    setSelected(selectedObjectProp);
    settypedText(selectedObjectProp?.name);
  }, [selectedObjectProp]);
  useEffect(() => {
    setSelectedArray(selectedArrayProp);
  }, [selectedArrayProp]);
  return (
    <View>
      {title && <Text style={[styles.titleStyling, titleStyle]}>{title}</Text>}
      {isSearchEnabled ? (
        <View style={[styles.inputTouchable, inputStyle]}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              textContentType={'none'}
              autoCapitalize={'none'}
              numberOfLines={1}
              returnKeyType={'done'}
              spellCheck={false}
              placeholder={placeholder}
              value={typedText}
              autoFocus={false}
              onFocus={onFocus}
              onChangeText={txt => onChangeText(txt)}
              style={[
                styles.txtInputNormalCurrency,
                { color: selected ? 'black' : 'grey' },
              ]}></TextInput>
            <TouchableOpacity
              onPress={onToggle}
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: 10,
                color: 'black',
                opacity: 1,
              }}>
              <Ionicons
                icon={open ? 'ios-arrow-up-sharp' : 'ios-arrow-down'}
                color={'black'}
                size={18}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onToggle}
          style={[styles.inputTouchable, inputStyle]}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[
                styles.txtInputNormalCurrency,
                { color: 'black' },
              ]}>
              {selected ? selected?.name : placeholder}
            </Text>
            <TouchableOpacity
              onPress={onToggle}
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: 10,
                color: 'black',
                opacity: 1,
              }}>
             <Ionicons
                icon={open ? 'ios-arrow-up-sharp' : 'ios-arrow-down'}
                color={'black'}
                size={18}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      {
        error &&
        <Text style={styles.ErrorTxt}>
          {error}
        </Text>
      }
      {open && (
        <View style={[styles.searchBoxContainer, searchBoxContainerStyle]}>
          <ScrollView
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps={'handled'}>
            {SearchedcopiedFromReduxList1?.length > 0 && (
              <View style={{ flex: 1 }}>
                {List1Title && (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      margin: 5,
                      alignSelf: 'flex-start',
                    }}>
                    {List1Title}
                  </Text>
                )}
                <FlatList
                  nestedScrollEnabled
                  data={SearchedcopiedFromReduxList1}
                  onEndReachedThreshold={0.5}
                  scrollEventThrottle={150}
                  onEndReached={onEndReached1}
                  ListFooterComponent={ListFooterComponent1}
                  renderItem={({ item }) => (
                    <View
                      key={item?._id}
                      style={{
                        alignItems: 'flex-start',
                        paddingHorizontal: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                      }}>
                      <TouchableOpacity
                        style={{ paddingVertical: 3 }}
                        onPress={() => {
                          onSelect(item);
                        }}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text numberOfLines={1} style={[styles.dropItemTxt]}>
                            {item?.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item?._id}
                />
              </View>
            )}
            {SearchedcopiedFromReduxList2?.length > 0 && (
              <View style={{ flex: 1 }}>
                {List2Title && (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      margin: 5,
                      alignSelf: 'flex-start',
                    }}>
                    {List2Title}
                  </Text>
                )}
                <FlatList
                  nestedScrollEnabled
                  data={SearchedcopiedFromReduxList2}
                  onEndReachedThreshold={0.5}
                  scrollEventThrottle={150}
                  onEndReached={onEndReached2}
                  ListFooterComponent={ListFooterComponent2}
                  renderItem={({ item }) => (
                    <View
                      key={item?._id}
                      style={{
                        alignItems: 'flex-start',
                        paddingHorizontal: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                      }}>
                      <TouchableOpacity
                        style={styles.dropDownItemAddr}
                        onPress={() => {
                          onSelect(item);
                        }}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text numberOfLines={1} style={[styles.dropItemTxt]}>
                            {item?.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item?._id}
                />
              </View>
            )}
            {SearchedcopiedFromReduxList3?.length > 0 && (
              <View style={{ flex: 1 }}>
                {List3Title && (
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      margin: 5,
                      alignSelf: 'flex-start',
                    }}>
                    {List3Title}
                  </Text>
                )}
                <FlatList
                  nestedScrollEnabled
                  data={SearchedcopiedFromReduxList3}
                  onEndReachedThreshold={0.5}
                  scrollEventThrottle={150}
                  onEndReached={onEndReached3}
                  ListFooterComponent={ListFooterComponent3}
                  renderItem={({ item }) => (
                    <View
                      key={item?._id}
                      style={{
                        alignItems: 'flex-start',
                        paddingHorizontal: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                      }}>
                      <TouchableOpacity
                        style={styles.dropDownItemAddr}
                        onPress={() => {
                          onSelect(item);
                        }}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text numberOfLines={1} style={[styles.dropItemTxt]}>
                            {item?.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item?._id}
                />
              </View>
            )}
          </ScrollView>
        </View>
      )}
      {multiSelect && (
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: 10,
            marginVertical: 10,
            alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
            minWidth: 300,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {selectedArray?.length > 0 &&
            selectedArray?.map((selAnim, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                    backgroundColor: 'black',
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 12,
                    }}>
                    {selAnim?.name}
                  </Text>
                  <TouchableOpacity
                    style={{ marginLeft: 5 }}
                    onPress={() => {
                      onDelete(selAnim, index);
                    }}>
                    <Ionicons
                      size={15}
                      color={'black'}
                      name={'ios-close'}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchableDropDown;

const styles = StyleSheet.create({
  ErrorTxt: {
    fontSize: 12,
    marginHorizontal: 30,
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginTop: 10,
    color: 'black',
  },
  titleStyling: {
    marginTop: responsiveHeight(1),
    width: '100%',
    paddingHorizontal: 15,
    alignSelf: 'center',
    color: 'black',
  },
  addAddressTxt: {
    fontSize: 12,
    color: 'white',
  },
  inputTouchable: {
    marginTop: responsiveHeight(1),
    width: '80%',
    alignSelf: 'center',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  txtInputNormalCurrency: {
    // flex:1,
    padding: 0,
    margin: 0,
    width: '80%',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    textAlign: 'left',
    fontSize: 14,
    color: 'black',
    paddingVertical: 0,
  },
  dropItemTxt: {
    width: '100%',
    paddingLeft: 5,
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
  },
  searchBoxContainer: {
    paddingVertical: 5,
    backgroundColor: 'white',
    marginHorizontal: 7,
    // marginTop: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: 'grey',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 2,
    borderColor: 'grey',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 170,
    overflow: 'scroll',
    width: '90%',
    alignSelf: 'center',
  },
  errorStyling: {
    width: '80%',
    alignSelf: 'center',
    marginTop: responsiveHeight(1),
    color: 'red',
    fontSize: 10,
  },
});
