import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import icons from "@/constants/icons";

const textStyle = 'font-poppins-semibold text-[26px] text-black-100 leading-tight';

const Banner = () => {
  return (
      <View className="flex-row items-center bg-primary-700 w-full rounded-xl mt-4">
        {/* Left Side: Text & Button */}
        <View className="flex-1 ml-6">
          <Text className={`${textStyle}`}>
            The Fastest In
          </Text>
          <Text className={`${textStyle}`}>
            Delivery <Text className="text-primary-100">Food</Text>
          </Text>
          <TouchableOpacity className="bg-primary-100 py-3 px-8 rounded-full mt-2 self-start">
            <Text className="text-white-100 font-medium text-center text-xl">Order Now</Text>
          </TouchableOpacity>
        </View>

        {/* Right Side: Image */}
        <Image
            source={icons.takeAway} // Update with actual image path
            className="w-[180px] h-[160px] mr-4"
            resizeMode="cover"
        />
      </View>
  )
}
export default Banner
const styles = StyleSheet.create({})
