import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';
import React ,{ useState,useContext  } from 'react';
import Input from '../../components/shared/Input';
import  Button from "../../components/shared/Button";
import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../Services/fireBaseConfig"
import { useConvex } from 'convex/react';
import { UserContext } from '../../context/UserContext';
import { api } from '../../convex/_generated/api';
export default function Signin() {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const convex=useConvex();
    const {user,setUser}=useContext(UserContext);
    const onSignIn=()=>{
        if(!email || !password){
            Alert.alert("Enter All Fields")
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed in 
          const user = userCredential.user;
          const userData=await convex.query(api.Users.GetUser,{
            email:email
          })
          // ...
          console.log(userData);
          setUser(userData);
          })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage); 
          Alert.alert("Login failed", errorMessage);
        });
      }
  return (
    <View style={{display:'flex',alignItems:'center',padding:20}}>
      <Image source={require('../../assets/images/logo.jpg')} style={{width:150,height:150,marginTop:60}} />
      <Text  style={{fontSize:35,fontWeight:'bold',margin:20}}>Welcome Back</Text>
      <View style={{marginTop:20,width:'100%'}}>
      <Input placeholder={'Email'} onChangeText={setEmail}/>
      <Input placeholder={'password'} password={true} onChangeText={setPassword}/>
      
      </View>
      <View style={{marginTop:15,width:'100%'}}>
      <Button title={'Sign in'} onPress={()=>onSignIn()}/>
       <Text style={{textAlign:'center',fontSize:16,marginTop:15,fontWeight:'bold'}}>Don't have an account?</Text>
       <Link href={"/auth/SignUp"}><Text style={{textAlign:'center',fontSize:16,marginTop:15,fontWeight:'bold'}}>Create new Account</Text></Link>
      </View>
    </View>
    
  );
}
