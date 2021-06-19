import React,{useState} from "react"

import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View,FlatList,Modal,TextInput,TouchableOpacity,SafeAreaView,Button,Alert } from 'react-native';
import Header from "./components/header"
import TodoItem from "./components/todoItem"
import AddTodo from "./components/appTodo"
export default function App() {
	const[isModalVisible,setisModalVisible]=useState(false);
	const[isRender,setisRender]=useState(false);
	const [showBox, setShowBox] = useState(true);
	const[inputText,setinputText]=useState();
	const [edit,setedit]=useState()
	const [todo,setTodo]=useState([
		{text:'buy shirt',key:'1'},
		{text:'buy bag',key:'2'},
		{text:'buy watch',key:'3'},

			
	]);

	const  SubmitHandler=(text)=>{
        setTodo((prevTodos)=>{
			return[
				{text:text,key:Math.random().toString()},
				...prevTodos
			]
		})
    }
	
	const DeleteItem=(text)=>{
		const arr=[...todo];
		arr.splice(text,1);
		setTodo(arr);
		
	}
	const DeletewholeList=(text)=>{
		const arr=[todo];
		arr.splice(text,1);
		setTodo(arr);
		
	}
	const onPressItem=(item)=>{
		setisModalVisible(true)
		setinputText(item.text)
		setedit(item.key)
		
	}
	const handleEditItem=(editItem)=>{
		const newData=todo.map(item=>{
			if(item.key==editItem){
				item.text=inputText;
				return item;
			}
			return item;
		})
		setTodo(newData)
		
	}
	const onPressSaveEdit=()=>{
		handleEditItem(edit);
		setisModalVisible(false)
		
	}
	 const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove all the items?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            DeletewholeList();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
		 
        },
      ]
    );
  };
	const func  = () => {
showConfirmDialog();


}
	
	
  return (
 
    <View style={styles.container}>
		<Header/>
	<View style={styles.content}>
		<AddTodo SubmitHandler={SubmitHandler}/>
	<View style={styles.list}>
	<FlatList
	data={todo}
	extraData={isRender}
	renderItem={({item})=>(
	<TodoItem item={item}
	DeleteItem={DeleteItem}
	onPressItem={onPressItem}
	
	
	
	/>
	
	)}
	
	/>
	<View style={styles.delbtn}>
	<Button onPress={func} title="Delete All Items"/>
	</View>
	
	<Modal
	animationType="fade"
	visible={isModalVisible}
	onRequestClose={()=>setisModalVisible(false)}
	
	>
	<View style={styles.modalView}>
	<Text style={styles.textchange}>Edit Item:</Text>
	<TextInput  
	style={styles.textInput}
	onChangeText={(text)=>setinputText(text)}
	defaultValue={inputText}
	editable={true}
	multiline={false}
	maxLength={200}
	/>
	<TouchableOpacity
	onPress={()=>onPressSaveEdit()}
style={styles.touchableSave}
	
	>
	<Text style={styles.textsave}>Save</Text>
	
	
	</TouchableOpacity>
	</View>
	</Modal>
	</View>
	</View>
	
	
	
	
     
    </View>
	
  );
}

const styles = StyleSheet.create({
	delbtn:{
		marginTop:20,
		width:170,
		marginLeft:70
		
	},
	textInput:{
		width:'90%',
		height:70,
		borderColor:'grey',
		borderWidth:1,
		fontSize:25
		
	},
	modalView:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
	touchableSave:{
		backgroundColor:'orange',
		paddingHorizontal:100,
		alignItems:'center',
		marginTop:20,
		height:30,
		
	},
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	},
	content: {
	  padding: 40,
	},
	list: {
	  marginTop: 20,
	},
  });
