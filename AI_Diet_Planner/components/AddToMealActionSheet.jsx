import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from './../shared/Colors'
import Button from './shared/Button'
import moment from 'moment';
import { Coffee02Icon, Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useMutation } from 'convex/react';
import { UserContext } from '../context/UserContext';
import { api } from '../convex/_generated/api';
import DateSelectionCard from './DateSelectionCard';
export default function AddToMealActionSheet({ recipeDetail, hideActionSheet }) {
  const [dateList, setDateList] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedMeal, setSelectedMeal] = useState();
  const {user}=useContext(UserContext)
  const CreateMealPlan=useMutation(api.MealPlan.CreateMealPlan);
  const mealOptions = [
    { title: 'Breakfast',
      icon:Coffee02Icon
     },
    { title: 'Lunch',
      icon:Sun03Icon
     },
    { title: 'Dinner',
      icon:Moon02Icon
     }
  ];
  
  
  
  const AddToMealPlan=async()=>{
    if(!selectedMeal || !selectedDate){
      Alert.alert('Error!','Please Select all Fields')
      return;
    }
    const result=await CreateMealPlan({
      date:selectedDate,
      mealType:selectedMeal,
      recipeId:recipeDetail?._id,
      uid:user?._id
    })
    console.log(result)
    Alert.alert('Added!','Added to Meal Plan')
    hideActionSheet()
  };

  return (
    <View>
      <View>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>Add To Meal</Text>
        
        <DateSelectionCard selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      </View>
      
      <View>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 20
        }}>Select Meal</Text>
        
        <FlatList 
          data={mealOptions} 
          keyExtractor={(item) => item.title}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => setSelectedMeal(item.title)}
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 7,
                borderWidth: 1,
                borderRadius: 10,
                margin: 5,
                backgroundColor: selectedMeal === item.title ? Colors.SECONDARY : Colors.WHITE,
                borderColor: selectedMeal === item.title ? Colors.PRIMARY : Colors.GRAY
              }}
            >
              <HugeiconsIcon icon={item.icon}/>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <View style={{ marginTop: 15 }}>
        <Button title={'+ Add to Meal Plan'} onPress={AddToMealPlan}/>
        <TouchableOpacity 
          onPress={() => hideActionSheet()}
          style={{ padding: 15 }}
        >
          <Text style={{ textAlign: 'center', fontSize: 20 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
