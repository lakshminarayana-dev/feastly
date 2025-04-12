import React, {useState, useEffect, useRef} from "react";
import {View, Text, Animated, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";

const FOOD_ITEMS = [
  "Beef",
  "Chicken",
  "Dessert",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
  "Breakfast"
];

const SearchBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current; // Keep animation value stable

  useEffect(() => {
    const animate = () => {
      Animated.timing(slideAnim, {
        toValue: -20, // Slide text up
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % FOOD_ITEMS.length); // Update text
          slideAnim.setValue(20); // Reset below
          Animated.timing(slideAnim, {
            toValue: 0, // Move to center smoothly
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 50); // Small delay ensures new text renders before animation restarts
      });
    };

    const interval = setInterval(animate, 2000); // Change every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
      // Main container row
      <View className="flex-row items-center w-full space-x-3">
        {/* Search Bar */}
        <View
            className="flex-row items-center bg-white-100 border border-gray-500 rounded-xl px-4 py-3 flex-1 shadow-sm">
          <Feather name="search" size={20} color="#9CA3AF"/>
          <View className="ml-3 flex-1 flex-row items-center h-6 overflow-hidden">
            <Text className="text-gray-600 text-base">{"Search for  "}</Text>
            <Animated.Text
                style={{
                  transform: [{translateY: slideAnim}],
                  fontSize: 14,
                  color: "#666",
                }}
            >
              '{FOOD_ITEMS[currentIndex]}'
            </Animated.Text>
          </View>
        </View>

        {/*/!* Filter Icon (Three horizontal lines) *!/*/}
        {/*<TouchableOpacity className="bg-primary-300 p-3 rounded-xl ml-2">*/}
        {/*  <Feather name="filter" size={20} color="white"/>*/}
        {/*</TouchableOpacity>*/}
      </View>
  );
};

export default SearchBar;
