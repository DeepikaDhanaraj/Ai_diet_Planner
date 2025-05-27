import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from './../../shared/Colors'
import Input from './../../components/shared/Input'
import { HugeiconsIcon } from '@hugeicons/react-native';
import { MaleSymbolIcon ,FemaleSymbolIcon,WeightScale01Icon, Dumbbell01Icon, WeightScaleIcon, PlusSignSquareIcon} from '@hugeicons/core-free-icons';
import { useMutation } from 'convex/react';
import {api} from './../../convex/_generated/api'
import Button from './../../components/shared/Button'
import { UserContext } from './../../context/UserContext';
import { useRouter } from 'expo-router';
import Prompt from './../../shared/Prompt';
import {CalculateCaloriesAI} from './../../Services/Ai1_model'
export default function preferance() {
  const [weight,setWeight]=useState()
  const [height,setHeight]=useState()
  const [gender,setGender]=useState()
  const [goal,setGoal]=useState()
  const {user,setUser}=useContext(UserContext)
  const UpdateUserPref=useMutation(api.Users.UpdateUserPref)
  const router=useRouter();
  const OnContinue=async()=>{
    if(!weight || !height || !gender){
      Alert.alert("Fill All Details",'Enter all to Continue!');
      return ;
    }
    const data={
      uid:user?._id,
      weight:weight,
      height:height,
      gender:gender,
      goal:goal
    }

    const PROMPT = JSON.stringify(data) + Prompt.CALORIES_PROMPT;
    const AIResults = await CalculateCaloriesAI(PROMPT);
    console.log("AI Response:", AIResults.choices[0].message.content);
    const AIResp=AIResults.choices[0].message.content;
    const JSONContent=JSON.parse(AIResp.replace('```json','').replace('```',''));
    
    console.log(JSONContent)
    
    const result=await UpdateUserPref({
      ...data,
      ...JSONContent
    })
    setUser(prev=>({
      ...prev,
      ...data
    }))
    router.replace('/tabs/Home')
  }
  return (
    <View style={{
      padding:20,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <Text style={{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        marginTop:30

      }}>Tell us about Yourself</Text>
      <Text style={{
        fontSize:16,
        textAlign:'center',
        color:Colors.GRAY,
      }}>This help us create your personalized meal plan</Text>
      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:10
      }}>
        <View style={{
          flex:1
        }}><Input placeholder={'e.g 70'} label='Weight (Kg)' onChangeText={setWeight}/></View>
        <View style={{
          flex:1
        }}><Input placeholder={'e.g 5.10'} label='Height (ft)' onChangeText={setHeight}/></View>
        
      </View>
      <View style={{marginTop:20}}>
        <Text style={{fontWeight:'medium',fontSize:18}}>Gender</Text>
        <View style={{
          display:'flex',
          flexDirection:'row',
          gap:10
        }}>
          <TouchableOpacity style={{
            borderWidth:1,
            padding:15,
            borderColor:gender=='Male' ? Colors.PRIMARY : Colors.GRAY,
            borderRadius:10,
            flex:1,
            alignItems:'center'
          }} onPress={()=>setGender('Male')}>
          <HugeiconsIcon icon={MaleSymbolIcon} size={40} color={Colors.BLUE}/>
          </TouchableOpacity>
          <TouchableOpacity style={{
            borderWidth:1,
            padding:15,
            borderColor:gender=='Female' ? Colors.PRIMARY : Colors.GRAY,borderRadius:10,flex:1,alignItems:'center'
          }} onPress={()=>setGender('Female')}>
            <HugeiconsIcon icon={FemaleSymbolIcon} size={40} color={Colors.PINK}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop:15}}>
        <Text style={{
          fontWeight:'medium',
          fontSize:18
        }}>What's Your Goal</Text>
        <TouchableOpacity style={[styles.goalContainer,{
          borderColor:goal=='Weight Loss'?Colors.PRIMARY:Colors.GRAY
        }]} onPress={()=>setGoal('Weight Loss')}>
        <HugeiconsIcon icon={WeightScale01Icon} />
        <View>
          <Text style={styles.goalText}>Weight Loss</Text>
          <Text>Reduce Body fat & Get Lean</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.goalContainer,{
          borderColor:goal=='Muscle Gain'?Colors.PRIMARY:Colors.GRAY
        }]} onPress={()=>setGoal('Muscle Gain')}>
        <HugeiconsIcon icon={Dumbbell01Icon} />
        <View>
          <Text style={styles.goalText}>Muscle Gain</Text>
          <Text>Build Muscle & Get Stronger</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.goalContainer,{
          borderColor:goal=='Weight Gain'?Colors.PRIMARY:Colors.GRAY
        }]} onPress={()=>setGoal('Weight Gain')}>
        <HugeiconsIcon icon={PlusSignSquareIcon} />
        <View>
          <Text style={styles.goalText}>Weight Gain</Text>
          <Text>Increase Healthy Body mass</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:25}}><Button title={'Continue'} onPress={OnContinue}/></View>
      
    </View>
  )
}

const styles=StyleSheet.create({
  goalContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:20,
    padding:15,
    borderColor:Colors.GRAY,
    borderRadius:15,
    borderWidth:1,
    marginTop:10
  },
  goalText:{
    fontSize:20,
    fontWeight:'bold'
  },
  goalSubText:{
    color:Colors.GRAY
  }
})