import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../shared/Colors'
import Button from './../../components/shared/Button'
import {GenerateRecipesOptionAIModel} from '../../Services/Ai1_model'
import Prompt from '../../shared/Prompt'
import RecipeOptionList from '../../components/RecipeOptionList'
export default function GenerateAiRecipe() {
  const [input,setInput]=useState('');
  const [loading,setLoading]=useState(false);
  const [recipeOption,setRecipeOption]=useState([]);
  const GenerateRecipesOptions = async () => {
    setLoading(true);
    try {
      const PROMPT = input + Prompt.GENERATE_RECIPE_OPTION_PROMPT;
      const result = await GenerateRecipesOptionAIModel(PROMPT);
      
      // Step 1: Get raw content
      const content = result.choices[0].message.content;
      console.log('Raw content:', content);
  
      // Step 2: Clean markdown formatting
      const cleaned = content.replace(/```json|```/g, '');
  
      // Step 3: Parse
      const parsedJSON = JSON.parse(cleaned);
      console.log('Parsed JSON:', parsedJSON);
  
      // Step 4: Save to state
      setRecipeOption(parsedJSON);
      setLoading(false);
    } catch (e) {
      console.log('ERROR:', e);
      setLoading(false);
    }
  }
  
  return (
    <View style={{
        paddingTop:30,
        padding:20,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        fontSize:30,
        fontWeight:'bold'
      }}>AI Recipe Generator</Text>
      <Text style={{
        marginTop:15,
        color:Colors.GRAY,
        fontSize:16
      }}>Generate Personalized Fitness Meal Plan using Ai</Text>
      <TextInput  style={styles.textArea} onChangeText={(value)=>setInput(value)} placeholder='Enter your ingridents or recipes'/>
      <View style={{
        marginTop:25,
      }}>
        <Button title={'Generate Recipe'} onPress={GenerateRecipesOptions} loading={loading}/>
      </View>
      {recipeOption?.length >0 && <RecipeOptionList recipeOption={recipeOption}/>}
    </View>
  )
}

const styles=StyleSheet.create({
    textArea:{
        padding:15,
        borderWidth:1,
        borderRadius:10,
        fontSize:20,
        marginTop:15,
        height:150,
        textAlignVertical:'top',
        backgroundColor:Colors.WHITE
    }
})