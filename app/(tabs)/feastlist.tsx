import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {StatusBar} from "expo-status-bar";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import MealCard from "@/components/MealCard";
import MasonryList from "@react-native-seoul/masonry-list";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";

const Feastlist = () => {
  const favorites = useSelector((state: RootState) => state.favorites.meals);
  return (
      <SafeAreaView className="flex-1 bg-white-100 mt-safe">
        <StatusBar style="dark"/>
        <ScrollView showsVerticalScrollIndicator={false} style={{
          marginHorizontal: hp(2),
        }}
        >

          <Text style={{fontSize: hp(2.6)}} className="font-poppins-semibold text-black-100 mb-1 mt-2">
            Your Favorite Meals ❤️
          </Text>
          <MasonryList
              data={favorites}
              keyExtractor={(item): string => item.idMeal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, i}) => (
                  <MealCard category={""} item={item} index={i}/>
              )}
              onEndReachedThreshold={0.1}
              ListFooterComponent={<View style={{height: hp(10)}}/>} // Add safe space
          />
        </ScrollView></SafeAreaView>
  )
}
export default Feastlist
const styles = StyleSheet.create({})
