import { View, Text,Image, StyleSheet } from 'react-native'
import React from 'react'
import { useSearchParams } from 'expo-router/build/hooks'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { Dumbbell01Icon, Fire03Icon, PlusSignSquareIcon, ServingFoodIcon, TimeQuarter02Icon } from '@hugeicons/core-free-icons'
import Colors from '../shared/Colors'

export default function RecipeIntro({recipeDetail}) {
  const RecipeJson=recipeDetail?.jsonData;
  return (
    <View>
      <Image source={{uri:recipeDetail?.imageUrl}} style={{
        width:'100%',
        height:200,
        borderRadius:15
      }}/>
      <View style={{
       marginTop:15,
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between'
      }}>
        <Text style={{
            fontSize:20,
            fontWeight:'bold'
        }}>{recipeDetail?.recipeName}</Text>
        <HugeiconsIcon icon={PlusSignSquareIcon} size={40} color={Colors.PRIMARY}/>
      </View>
      <Text style={{
        fontSize:16,
        marginTop:6,
        color:Colors.GRAY,
        lineHeight:25
      }}>
        {RecipeJson?.description}
      </Text>
      <View style={{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        gap:2
      }}>
        <View style={styles.propertiesContainer}>
            <HugeiconsIcon icon={Fire03Icon}color={Colors.PRIMARY} style={styles.iconBg} size={25}/>
            <Text style={styles.subText}>Calories</Text>
            <Text style={styles.counts}>{RecipeJson?.calories}</Text>
        </View>
        <View style={styles.propertiesContainer}>
            <HugeiconsIcon icon={TimeQuarter02Icon}color={Colors.PRIMARY} style={styles.iconBg} size={25}/>
            <Text style={styles.subText}>Time To Cook</Text>
            <Text style={styles.counts}>{RecipeJson?.cookTime}</Text>
        </View>
        <View style={styles.propertiesContainer}>
            <HugeiconsIcon icon={ServingFoodIcon}color={Colors.PRIMARY} style={styles.iconBg} size={25}/>
            <Text style={styles.subText}>Serve</Text>
            <Text style={styles.counts}>{RecipeJson?.serveTo}</Text>
        </View>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    iconBg:{
        padding:6
    },
    propertiesContainer:{
        display:'flex',
        alignItems:'center',
        flex:'1',
        padding:6,
        backgroundColor:'#fbf5ff',
        borderRadius:10
    },
    subText:{
        fontSize:18
    },
    counts:{
        fontSize:22,
        color:Colors.PRIMARY,
        fontWeight:'bold'
    }
})