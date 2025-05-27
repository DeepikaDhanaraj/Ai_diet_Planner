import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Colors from '../shared/Colors'

export default function RecipeIngredients({ recipeDetail }) {
  const ingredients = recipeDetail?.jsonData?.ingredients;

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>Ingredients</Text>
        <Text style={{
          fontSize: 16,
          color: Colors.GRAY
        }}>{ingredients?.length} Items</Text>
      </View>

      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{
                fontSize: 22,
                backgroundColor: Colors.SECONDARY,
                borderRadius: 50,
                padding: 6,
              }}>{item?.icon}</Text>
              <Text style={{
                fontSize: 17,
                fontWeight: '600'
              }}>{item?.ingredient}</Text>
            </View>
            <Text style={{
              fontSize: 15,
              color: Colors.GRAY
            }}>{item?.quantity}</Text>
          </View>
        )}
      />
    </View>
  )
}
