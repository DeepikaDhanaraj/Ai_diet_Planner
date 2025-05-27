import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../shared/Colors'
import Prompt from '../shared/Prompt'
import LoadingDialog from './LoadingDialog'
import { GenerateRecipesOptionAIModel,GenerateRecipeImage } from '../Services/Ai1_model'
import { useMutation } from 'convex/react'
import {api} from './../convex/_generated/api'
import {UserContext} from './../context/UserContext'
import { useRouter } from 'expo-router'
export default function RecipeOptionList({recipeOption}) {
  const [loading,setLoading]=useState(false)
  const CreateRecipe=useMutation(api.Recipes.CreateRecipe)
  const {user}=useContext(UserContext)
  const router=useRouter();
  const onRecipeOptionSelect=async(recipe)=>{
    setLoading(true);
    try {
     // const PROMPT = "RecipeName:" + recipe?.recipeName + " Description" + recipe?.description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT
     const PROMPT = Prompt.GENERATE_COMPLETE_RECIPE_PROMPT({
      recipeName: recipe?.recipeName,
      description: recipe?.description }) 
     const result = await GenerateRecipesOptionAIModel(PROMPT);
      const content = result.choices[0].message.content;

      const cleaned = content.replace(/```json|```/g, '');
      const parsedJSON = JSON.parse(cleaned);
      console.log(parsedJSON);
      //generate image
      console.log("Image prompt:", parsedJSON?.imagePrompt);

      const aiImageResp=await GenerateRecipeImage(parsedJSON?.imagePrompt)
      console.log(aiImageResp?.data?.image);
      //save to db
      const saveRecipeResult=await CreateRecipe({
        jsonData:parsedJSON,
        imageUrl:aiImageResp?.data?.image,
        recipeName:parsedJSON?.recipeName,
        uid:user?._id
      });
      console.log(saveRecipeResult);
      setLoading(false);
      router.push({
        pathname: "/recipe-detail",
        params: { recipeId: saveRecipeResult },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    
    }
  }
  return (
    <View style={{marginTop:15}}>
      <Text style={{
        fontSize:20,
        fontWeight:'bold'
      }}>Select Recipes</Text>
      <View>
        {recipeOption?.map((item,index)=>(
            <TouchableOpacity onPress={()=>onRecipeOptionSelect(item)} key={index} style={{
                padding:15,
                borderWidth:0.2,
                borderRadius:15,
                marginTop:15
            }}>
                <Text style={{fontSize:16,fontWeight:'bold'}}>{item?.recipeName}</Text>
                <Text style={{
                    color:Colors.GRAY
                }}>{item?.description}</Text>
            </TouchableOpacity>
        ))}
      </View>
      <LoadingDialog loading={loading}/>
    </View>

  )
}