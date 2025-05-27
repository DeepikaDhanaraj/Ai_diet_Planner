import { Text, View, Image, Dimensions } from "react-native";
import Colors from '../shared/Colors';
import React ,{ useState,useContext, useEffect  } from 'react';
import  Button from "../components/shared/Button";
import { useRouter } from "expo-router";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from "./../Services/fireBaseConfig";
import { UserContext } from  "./../context/UserContext";
import { useConvex } from "convex/react";
import { api } from './../convex/_generated/api';
export default function Index() {
  const router=useRouter();
  const {user,setUser}=useContext(UserContext);
  const convex=useConvex();
  const { width, height } = Dimensions.get("window");
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,async(userInfo)=>{
      console.log(userInfo?.email);
      const userData=await convex.query(api.Users.GetUser,{
        email:userInfo.email,
      });
      console.log(userData);
      setUser(userData);
      console.log('Redirecting to /tabs...');
      router.replace('/tabs');
    })
    return ()=>unsubscribe();
  },[]);
  
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('./../assets/images/land1.png')}
        style={{
          width: width,
          height: height,
          resizeMode: 'cover', // or 'stretch' if needed
        }}
      />
      <View
        style={{
          position: "absolute",
          height: height,
          backgroundColor: "#0707075e",
          width: '100%',
          display:'flex',
          alignItems:'center',
          padding:20
        }}
      >
        <Image
          source={require('./../assets/images/logo.jpg')}
          style={{ width: 150, height: 150 ,marginTop:100}}
        />
        <Text style={{fontSize:30,fontFamily:'bold',color:Colors.WHITE ,margin:20}}> AI Diet Planner</Text>
        <Text style={{textAlign:'center',marginHorizontal:20,fontSize:20,color:Colors.WHITE,opacity:0.8}} >From Craving to Cooking 🍕🛒 | Let AI Guide Your Kitchen Journey!</Text>
      </View>
      <View style={{position:'absolute',width:'100%',bottom:25,padding:20}}>
      <Button title={'Get Started'} onPress={()=>router.push('/auth/SignIn')}/>
      </View>
      
    </View>
  );
}
