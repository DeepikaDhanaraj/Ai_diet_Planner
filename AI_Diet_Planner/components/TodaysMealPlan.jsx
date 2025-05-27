import { View, Text, ScrollView ,FlatList} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { CalendarAdd01Icon } from '@hugeicons/core-free-icons';
import Colors from '../shared/Colors';
import Button from './shared/Button';
import { useConvex } from 'convex/react';
import { api } from '../convex/_generated/api';
import moment from 'moment';
import { UserContext } from '../context/UserContext';
import MealPlanCard from './MealPlanCard';
import { RefreshDataContext } from '../context/RefreshDataContext';
export default function TodaysMealPlan({selectedDate=null}) {
  const [mealPlan, setMealPlan] = useState([]);
  const { user } = useContext(UserContext);
  const convex = useConvex();
  const {refreshData,setRefreshData}=useContext(RefreshDataContext)

  useEffect(() => {
    user && GetTodaysMealPlan();
  }, [user,refreshData]);

  const GetTodaysMealPlan = async () => {
    const result = await convex.query(api.MealPlan.GettodaysMealPlan, {
      date:selectedDate ?? moment().format('DD/MM/YYYY'),
      uid: user?._id,
    });
    console.log(result);
    setMealPlan(result);
  };

  return (
    <View
      contentContainerStyle={{
        padding: 15,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      {!selectedDate && <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 15,
          marginTop:10
        }}
      >
        Today's Meal Plan!
      </Text>}

      {mealPlan.length === 0 ? (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 20,
            backgroundColor: Colors.WHITE,
            borderRadius: 15,
          }}
        >
          <HugeiconsIcon icon={CalendarAdd01Icon} size={40} color={Colors.PRIMARY} />
          <Text
            style={{
              fontSize: 18,
              color: Colors.GRAY,
              marginBottom: 20,
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            You don't have any meal plan today
          </Text>
          <Button title={'Create New Meal Plan'} />
        </View>
      ) : (
        mealPlan.map((item, index) => (
          <MealPlanCard key={index} mealPlanInfo={item}  style={{ marginBottom: 15 }} />
        ))
      )}
    </View>
  );
}
