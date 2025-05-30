import { View, Text,ScrollView,FlatList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import {UserContext} from './../../context/UserContext'
import { useRouter } from 'expo-router'
import HomeHeader from '../../components/HomeHeader';
import TodayProgress from '../../components/TodayProgress';
import GenerateRecipeCard from '../../components/GenerateRecipeCard';
import TodaysMealPlan from '../../components/TodaysMealPlan';
export default function Home() {
  const {user}=useContext(UserContext)
  const router=useRouter();
  useEffect(()=>{
    if(!user?.weight){
        router.replace('/preference')
    }
  })
  return (
    <FlatList
    data={[]} // Dummy data to avoid FlatList crash
    renderItem={null} // No items, just header content
    ListHeaderComponent={
      <View style={{  padding: 20, paddingBottom: 100 }}>
        <HomeHeader />
        <TodayProgress />
        <GenerateRecipeCard />
        <TodaysMealPlan />
      </View>
    }
  />
  )
}