import React from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor(){
    super()
     this.state={
       hasCameraPermission: null,
       scaned:false,
       scanedBookId:'',
       scanedStudentId:'',
       buttonState:'normal'
     }
    
  }
  getCameraPermission=async(Id)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission:status==='granted',
      buttonState:'clicked',
      scaned:false,
buttonState:Id
    })
  }
  hasBarScan=async({type,data})=>{
    const {buttonState}=this.state
    if(buttonState==='BookId'){
    this.setState({
      scaned:true,
      scanedBookId:data,
      buttonState:'normal'
    })
  }
  else if(buttonState==='StudentId'){
    this.setState({
      scaned:true,
      scanedStudentId:data,
      buttonState:'normal'
    })
  }
}
    render() {
      const hasCameraPermission=this.state.hasCameraPermission;
      const scaned=this.state.scaned;
      const buttonState=this.state.buttonState;
      if (buttonState!=='normal' && hasCameraPermission){
        return(
          <BarCodeScanner
          onBarCodeScanned={scaned?undefined:this.hasBarScan}
          ></BarCodeScanner>
        )
      }
      else if(buttonState==='normal') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
          source={require('../assets/booklogo.jpg')}
          style={{width:200, height:200}}
          />
          <Text>{
            hasCameraPermission===true ? this.state.scanedData:'Request camera Permission'}
          </Text>
          <TextInput
          placeholder='book Id'
          value={this.state.scanedBookId}
          />
          <TouchableOpacity
onPress={()=>{this.getCameraPermission('BookId')}}
          >
            <Text>Scan book Id</Text>
          </TouchableOpacity>
          <TextInput
          placeholder='Student Id'
          value={this.state.scanedStudentId}
          />
          <TouchableOpacity
onPress={()=>{this.getCameraPermission('StudentId')}}
          >
            <Text>Scan Student Id</Text>
          </TouchableOpacity>
          <TouchableOpacity
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}