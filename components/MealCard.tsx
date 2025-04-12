import React from "react";
import {Pressable, Text, View} from "react-native";
import Animated, {FadeInDown} from "react-native-reanimated";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {AntDesign} from "@expo/vector-icons";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealCardProps {
  category: string;
  item: Meal;
  index: number;
  navigation: NativeStackNavigationProp<any>;
}

const getRandomRating = (): string => {
  const min = 2.5;
  const max = 5.0;
  const step = 0.5;
  const steps = Math.floor((max - min) / step + 1);
  const rating = min + Math.floor(Math.random() * steps) * step;
  return rating.toFixed(1);
};

const MealCard: React.FC<MealCardProps> = ({category, item, index, navigation}) => {
  const rating = getRandomRating();
  const isEven = index % 2 === 0;

  return (
      <Animated.View
          entering={FadeInDown.delay(index * 100).duration(600).springify().damping(20)}
      >
        <Pressable
            style={{
              width: "100%",
              paddingLeft: isEven ? 0 : 8,
              paddingRight: isEven ? 8 : 0,
            }}
            onPress={() => navigation.navigate("RecipeDetail", {...item})}
            className="flex justify-center mb-4"
        >
          <View className="relative shadow-md shadow-black/20">
            <Animated.Image
                source={{uri: item.strMealThumb}}
                style={{
                  width: "100%",
                  height: index % 3 === 0 ? hp(25) : hp(35),
                  borderRadius: 16,
                }}
                className="bg-black/5"
                sharedTransitionTag={item.strMeal}
            />

            {/* Favorite Icon */}
            <View className="absolute top-2 right-2 bg-white-100 rounded-full p-2 shadow shadow-black/10">
              <AntDesign name="hearto" size={18} color="#EB5757"/>
            </View>

            {/* Meal Name Overlay */}
            <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 10,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
            >
              <Text
                  style={{
                    fontSize: hp(2.0),
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                  }}
              >
                {item.strMeal.length > 20
                    ? item.strMeal.slice(0, 20) + "..."
                    : item.strMeal}
              </Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
  );
};

export default MealCard;
