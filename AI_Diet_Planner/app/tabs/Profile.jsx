import { View, Text, FlatList, TouchableOpacity ,Image} from 'react-native'
import React, { useContext } from 'react'
import { AnalyticsUpIcon,CookBookIcon,Login03Icon,ServingFoodIcon, WalletAdd02Icon } from '@hugeicons/core-free-icons'
import { UserContext } from '../../context/UserContext'
import Colors from '../../shared/Colors'
import { HugeiconsIcon } from '@hugeicons/react-native'
import {auth} from './../../Services/fireBaseConfig'
import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth';

const MenuOptions=[
  {
    title:'My Progress',
    icon:AnalyticsUpIcon,
    path:'/tabs/Progress'
  },
  {
    title:'Explore Recipes',
    icon:CookBookIcon,
    path:'/tabs/Meals'
  },
  {
    title:'Ai Recipes',
    icon:ServingFoodIcon,
    path:'/generate-ai-recipe'
  },
  {
    title:'Logout',
    icon:Login03Icon,
    path:'logout'
  }
]
export default function Profile() {
  const {user,setUser}=useContext(UserContext)
  const router=useRouter();
  const onMenuOptionClick=(menu)=>{
    if(menu.path=='logout'){
      signOut(auth).then(()=>{
        console.log('SignOut');
        setUser(null);
        router.replace('/')
      })
      return ;
    }
    router.push(menu?.path)
  }
  return (
    <View style={{
      padding:20,
      paddingTop:25
    }}>
      <Text style={{
        fontSize:25,
        fontWeight:'bold'
      }}>Profile</Text>
      <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:15
      }}>
      <Image source={require('./../../assets/images/users.png')} style={{
        width:100,
        height:100,
        borderRadius:99
      }}/>
       <Text style={{
        fontSize:20,
        fontWeight:'bold',
        marginTop:5
       }}>{user?.name}</Text>
       <Text style={{
        fontSize:16,
        color:Colors.GRAY,
        marginTop:5
       }}>{user?.email}</Text>

      </View>
      <FlatList
        data={MenuOptions}
        style={{
          marginTop:20
        }}
        renderItem={({item,index})=>(
          <TouchableOpacity 
          onPress={()=>onMenuOptionClick(item)}
          style={{
            display:'flex',
            flexDirection:'row',
            gap:6,
            alignItems:'center',
            padding:15,
            borderWidth:0.2,
            borderRadius:15,
            marginTop:5,
            backgroundColor:Colors.WHITE,
            elevation:1
          }}>
            <HugeiconsIcon icon={item.icon} size={40} color={Colors.PRIMARY}/>
            <Text style={{
              fontSize:25,
              fontWeight:'300'
            }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}