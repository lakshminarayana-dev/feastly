import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import Animated, {FadeInDown} from "react-native-reanimated";
import {AntDesign} from "@expo/vector-icons";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MealCardProps} from "@/interfaces/interfaces";
import {Link} from "expo-router";

const MealCard: React.FC<MealCardProps> = ({category, item, index, navigation}) => {
  const isEven = index % 2 === 0;
  return (
      <Link href={`/meal/${item.idMeal}`} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          <Animated.View
              entering={FadeInDown.delay(index * 100).duration(600).springify().damping(20)}
              style={{
                width: "100%",
                paddingLeft: isEven ? 0 : 8,
                paddingRight: isEven ? 8 : 0,
              }}
          >
            <View className="relative shadow-md shadow-black-100 mb-4">
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
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
          </Animated.View>
        </TouchableOpacity>
      </Link>
  );
};

export default MealCard;
