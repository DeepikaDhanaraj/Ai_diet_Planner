import { View, Text, Image, Alert } from 'react-native';
import React, { useState,useContext } from 'react';
import Input from '../../components/shared/Input';
import Button from "../../components/shared/Button";
import { Link, useRouter } from 'expo-router';
import { auth } from '../../Services/fireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useMutation } from 'convex/react';
import {api} from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const createNewUser=useMutation(api.Users.createNewUser);
  const {user,setUser}=useContext(UserContext);
  const onSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Please fill all fields.");
      return;
    }
  createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      //console.log("Signed Up:", userCredential.user);
      const user=userCredential.user;
      console.log(user)
      if(user){
        const result=await createNewUser({
          name:name,
          email:email
        });
        console.log(result);
        setUser(result);
      }
    })
    .catch(error => {
      console.error("Signup Error:", error.code, error.message);
    });
  };
  return (
    <View style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
      <Image source={require('../../assets/images/logo.jpg')} style={{ width: 150, height: 150, marginTop: 60 }} />
      <Text style={{ fontSize: 35, fontWeight: 'bold', margin: 20 }}>Create Account</Text>
      <View style={{ marginTop: 20, width: '100%' }}>
        <Input placeholder={'Full Name'} onChangeText={setName} />
        <Input placeholder={'Email'} onChangeText={setEmail} />
        <Input placeholder={'Password'} onChangeText={setPassword} password />
      </View>
      <View style={{ marginTop: 15, width: '100%' }}>
        <Button title={'Create an account'} onPress={onSignUp} />
        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 15, fontWeight: 'bold' }}>
          Already have an account?
        </Text>
        <Link href={'/auth/SignIn'}>
          <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 15, fontWeight: 'bold' }}>
            Sign In Here
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
