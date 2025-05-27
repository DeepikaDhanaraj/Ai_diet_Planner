import { mutation, query } from "./_generated/server";
import {v} from "convex/values";
export const CreateRecipe=mutation({
    args:{
        jsonData:v.any(),
        uid:v.id('users'),
        recipeName:v.any(),
        imageUrl:v.string()
    },
    handler: async (ctx, args) => {
        try {
          const result = await ctx.db.insert('recipes', {
            jsonData: args.jsonData,
            uid: args.uid,
            recipeName: args.recipeName,
            imageUrl: args.imageUrl
          });
          return result;
        } catch (err) {
          console.error("CreateRecipe Error:", err);
          throw new Error("Failed to save recipe.");
        }
      }
})

export const GetRecipeById=query({
    args:{
        id:v.id('recipes')
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.get(args.id)
        return result;
    }
})

export const GetAllRecipe=query({
  handler:async(ctx,args)=>{
    const result=await ctx.db.query('recipes').collect();
    return result;
  }
})