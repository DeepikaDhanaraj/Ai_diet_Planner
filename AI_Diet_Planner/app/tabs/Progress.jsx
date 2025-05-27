import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import DateSelectionCard from '../../components/DateSelectionCard'
import TodaysMealPlan from './../../components/TodaysMealPlan'
import TodayProgress from './../../components/TodayProgress'
import GenerateRecipeCard from '../../components/GenerateRecipeCard'
export default function Progress() {
  const [selectedDate,setSelectedDate]=useState()
  return (
    <FlatList
    data={[]}
    renderItem={()=>null}
    ListEmptyComponent={
    <View style={{
      padding:20,

    }}>
      <Text style={{
        fontSize:25,
        fontWeight:'bold'
      }}>Progress</Text>
       <DateSelectionCard selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
       <TodaysMealPlan date={selectedDate}/>
       <TodayProgress/>
       <GenerateRecipeCard/>
    </View>
    }/>
  )
}