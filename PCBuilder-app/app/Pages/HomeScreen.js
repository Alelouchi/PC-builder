
// import React from 'react';

// import {View,Text} from 'react-native';
// import { SelectList } from 'react-native-dropdown-select-list'
// import { MultipleSelectList } from 'react-native-dropdown-select-list'
// const HomeScreen=()=>{
//     const [selected, setSelected] = React.useState("");
    
  
//     const country = [
//         {key:'1', value:'Saudi arabia'},
//         {key:'2', value:'UAE'},
//         {key:'3', value:'BAHRAIN'},
       
//     ]
//     const data = [
//       {key:'1', value:'Saudi arabia'},
//       {key:'2', value:'UAE'},
//       {key:'3', value:'BAHRAIN'},
     
//   ]
//     return(
        
           
//       <SelectList 
//       placeholder='select a country'
//       dropdownStyles={{
//         backgroundColor: "white",
//         position: "absolute",
//         top: 40,
//         width: "100%",
//         zIndex: 999,
        
//       }}
//           setSelected={(val) => setSelected(val)} 
//           data={country} 
//           save="value"
//          />

//     )
    
// }
// export default HomeScreen;

//


import React, { useState } from 'react';
import { useRoute } from "@react-navigation/native"
import { View, Text,TouchableOpacity,Image } from 'react-native';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCase, setSelectedCase] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(2000); 
  const navigation=useNavigation();
  const [formattedValues, setFormattedValues] = useState("");

  const countries = [
    { key: '1', value: 'Saudi Arabia' },
    { key: '2', value: 'UAE' },
    { key: '3', value: 'Bahrain' },
  ];


  const Cases = [
    { key: '1', value: '3D Modelling', parentKey: '1' },
    { key: '2', value: 'Gaming', parentKey: '2' },
    { key: '3', value: 'Editing Videos', parentKey: '3' },
    { key: '4', value: 'Programming', parentKey: '4' },
    { key: '5', value: 'General Use', parentKey: '5' },
    
  ];
  
  // const formatSelectedValues = () => {
  //   const selectedCasesString = selectedCase.toString();
  //    userValue = `Country: ${selectedCountry}, Use Cases: ${selectedCasesString}, Budget: ${selectedBudget} SAR`;
  //   console.log(userValue);
  //   return userValue;
  // };
  
  const combined =()=>{
    const selectedCasesString = selectedCase.toString();
    userValue = `\nCountry: ${selectedCountry},\n Use Cases: ${selectedCasesString},\n Budget: ${selectedBudget} SAR`;
    
    if(selectedCountry!="" && selectedCasesString!=""){
    navigation.navigate('chat',{userValue});
    }
  }
  
  return (
    
    <View style={{flex:1,backgroundColor:'#282a36'}}>
      <View style={{alignItems:'center',paddingTop:100}}><Image
          source={require('../Images/LOGO.png')} // Replace with the path to your image
          style={{width: 225,
            height: 225,
            borderRadius: 15,
            marginRight: 10,}}
        /></View>
      
      <Text style={{marginTop:30,marginLeft:7,color:'white',fontWeight:'bold'}}>Select a country:</Text>
      <SelectList
      
        boxStyles={{backgroundColor:'white'}}
        placeholder='Select a country...'
        dropdownStyles={{
          
          backgroundColor: 'white',
          position: 'absolute',
          top: 40,
          width: '100%',
          zIndex: 999,
          
        }}
        setSelected={(val) => setSelectedCountry(val)}
        data={countries}
        save="value"
        
      />
      
      
       
      <Text style={{marginTop:30,marginLeft:5,color:'white',fontWeight:'bold'}}> Select Use cases:</Text>
      <MultipleSelectList
        boxStyles={{backgroundColor:'white'}}
        placeholder='Select use cases...'
        dropdownStyles={{
          backgroundColor: 'white',
          position: 'absolute',
          
          top: 120, // Adjust the top position accordingly
          width: '100%',
          zIndex: 999,
        }}
        setSelected={(val) => setSelectedCase(val)}
        data={Cases}
        save="value"
        showCheckbox
      />

<Text style={{marginTop:30,marginLeft:10,color:'white',fontWeight:'bold'}}>Select Your Budget:</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={2000}
          maximumValue={12000}
          minimumTrackTintColor="light green"
          maximumTrackTintColor="#000000"
          value={selectedBudget}
          onValueChange={(value) => setSelectedBudget(Math.round(value))}
        />
        <Text style={{color:'white',textAlign:'center',paddingBottom:50,fontSize:20,fontWeight:'bold'}}> {selectedBudget} SAR</Text>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity
        
      onPress={combined}
      style={{backgroundColor: 'purple',
      borderRadius: 10, // Adjust the borderRadius as needed
      padding: 10, // Adjust the padding as needed
      width: 100, // Adjust the width as needed
      alignItems: 'center',justifyContent:'center'}}>
      <Text style={{color: 'white',
    fontWeight: 'bold'}}>Build</Text>
    </TouchableOpacity>
    
    </View>
     
    </View>
  );
  
  
};

export default HomeScreen;
