import React, { useRef } from 'react';
import { View, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Colors from '../../shared/Colors';
import RecipeIntro from '../../components/RecipeIntro';
import RecipeIngredients from '../../components/RecipeIngredients';
import RecipeSteps from '../../components/RecipeSteps';
import Button from '../../components/shared/Button';
import ActionSheet from 'react-native-actions-sheet';
import AddToMealActionSheet from '../../components/AddToMealActionSheet';

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  const actionSheetRef = useRef(null);

  const recipeDetail = useQuery(api.Recipes.GetRecipeById, recipeId ? { id: recipeId } : undefined);
  console.log('recipeDetail', recipeDetail);

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.WHITE, height: '100%' }}>
          <RecipeIntro recipeDetail={recipeDetail} />
          <RecipeIngredients recipeDetail={recipeDetail} />
          <RecipeSteps recipeDetail={recipeDetail} />
          <View style={{ marginTop: 15 }}>
            <Button title="Add to Meal Plan" onPress={() => actionSheetRef.current?.show()} />
          </View>
          <ActionSheet ref={actionSheetRef}>
            <AddToMealActionSheet
              recipeDetail={recipeDetail}
              hideActionSheet={() => actionSheetRef.current?.hide()}
            />
          </ActionSheet>
        </View>
      }
    />
  );
}
