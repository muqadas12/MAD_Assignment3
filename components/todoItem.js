import React,{useState} from "react"
import { StyleSheet, Text, View,TouchableOpacity,Animated} from 'react-native';
import Swipeable from "react-native-gesture-handler/Swipeable"
export default function TodoItem({item,DeleteItem,onPressItem, onRemove}){
	 const [text,setText]=useState('');
	const leftSwipe=(progress,dragX)=>{
		const scale=dragX.interpolate({
			inputRange:[0,100],
			outputRange:[0,1],
			extrapolate:'clamp'
			
			
		})
		return(
		<TouchableOpacity onPress={()=>DeleteItem(text)} activeOpacity={0.6}>
		<View style={styles.deleteBox}>
		
		<Animated.Text style={{transform:[{scale:scale}]}}>Delete</Animated.Text>
		</View>
		</TouchableOpacity>
		
		)
		
	}

   
    return(
	<Swipeable renderLeftActions={leftSwipe}>
        <TouchableOpacity onPress={()=>onPressItem(item)}>
            <Text style={styles.text}>{item.text}</Text>
			 
        </TouchableOpacity>
		
        
        </Swipeable>
        )
		

}

const styles = StyleSheet.create({
	deleteBox:{
		backgroundColor:'red',
		justifyContent:'center',
		height:50,
		width:100,
		alignItems:'center',
		marginTop:20
	
	},
    text:{
        padding:16,
        marginTop:16,
        borderColor:'#bbb',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10
    }
})