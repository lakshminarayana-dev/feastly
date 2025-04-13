import React, {useEffect, useState} from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {useLocalSearchParams} from "expo-router";
import Animated, {FadeIn, FadeInDown} from "react-native-reanimated";
import {MealDetailsProps, MealProps} from "@/interfaces/interfaces";
import Loading from "@/components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import {FontAwesome5, MaterialIcons, EvilIcons} from "@expo/vector-icons";
import InfoCard from "@/components/InfoCard";
import {useDispatch, useSelector} from "react-redux";
import {addFavorite, removeFavorite} from "@/redux/favoritesSlice";
import {RootState} from "@/redux/store";


const MealDetails = () => {
  const {id} = useLocalSearchParams();
  const navigation = useNavigation();
  const [meal, setMeal] = useState<MealDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.meals);
  const isFavorite = favorites.some((item: MealProps) => item.idMeal === id);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(meal.idMeal));
    } else {
      dispatch(addFavorite({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
      }));
    }
  };

  const getMealData = async (mealId: string) => {
    try {
      const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      if (response?.data?.meals?.length > 0) {
        setMeal(response.data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching meal data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const ingredientsIndexes = (mealData: MealDetailsProps) => {
    const indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (mealData[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match?.[1] ?? null;
  };

  useEffect(() => {
    if (id) getMealData(id as string);
  }, [id]);

  if (loading) return <Loading/>;

  return (
      <ScrollView
          className="bg-white-100 flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 24}}
      >
        <StatusBar style="light"/>
        <View className="relative">
          <Animated.Image
              sharedTransitionTag={meal.strMeal}
              source={{uri: meal.strMealThumb}}
              style={{width: wp(100), height: hp(50), marginTop: 4}}
          />
          <View
              className="absolute top-0 left-0"
              style={{
                width: wp(100),
                height: hp(50),
                backgroundColor: "rgba(0,0,0,0.3)",
              }}
          />
        </View>

        <Animated.View
            entering={FadeIn.delay(200).duration(1000)}
            className="w-full absolute flex-row justify-between pt-14"
            style={{paddingHorizontal: 8}}
        >
          <TouchableOpacity className="p-2 ml-1" onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" color="white" size={24}/>
          </TouchableOpacity>
          <TouchableOpacity
              className="p-3 rounded-full mr-3 bg-white-100"
              onPress={() => handleFavorite()}
          >
            <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color="red"/>
          </TouchableOpacity>
        </Animated.View>

        <View className="px-4 space-y-4">
          {/* Title */}
          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={{
            marginBottom: 8,
            marginTop: 6,
          }}>
            <Text style={{fontSize: hp(3)}} className="text-black-300 font-poppins-semibold">
              {meal?.strMeal}
            </Text>
          </Animated.View>

          {/* Info Cards */}
          <Animated.View
              entering={FadeInDown.delay(100).duration(700).springify().damping(12)}
              className="flex-row flex-wrap justify-between"
          >
            <InfoCard
                icon={<FontAwesome5 name="clock" size={14} color="#d65b54"/>}
                value="35 mins"
                label="Cook Time"
            />
            <InfoCard
                icon={<FontAwesome5 name="user" size={14} color="#d65b54"/>}
                value="2 serves"
                label="Serving"
            />
            {/*<InfoCard*/}
            {/*    icon={<MaterialIcons name="local-fire-department" size={18} color="#d65b54"/>}*/}
            {/*    value="100 Cal"*/}
            {/*    label="Calories"*/}
            {/*/>*/}
            <InfoCard
                icon={<EvilIcons name="location" size={20} color="#d65b54"/>}
                value={meal?.strArea || "N/A"}
                label="Origin"
            />
          </Animated.View>

          {/* Ingredients */}
          {ingredientsIndexes(meal).length > 0 && (
              <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)}>
                <Text style={{fontSize: hp(2.5)}} className="text-black-300 font-poppins-semibold mt-2 mb-2">
                  Ingredients
                </Text>
                {ingredientsIndexes(meal).map((i) => (
                    <View key={i} className="flex-row items-center my-2">
                      <View className="bg-primary-800 rounded-full px-4 py-2 flex-row items-center justify-center mr-4">
                        <Text className="text-primary-900 font-poppins-medium text-base">{i}</Text>
                      </View>
                      <View className="flex-row space-x-2">
                        <Text style={{fontSize: hp(1.7)}} className="font-extrabold text-neutral-700">
                          {meal["strMeasure" + i]}
                        </Text>
                        <Text style={{fontSize: hp(1.7)}} className="font-medium text-neutral-600">
                          {meal["strIngredient" + i]}
                        </Text>
                      </View>
                    </View>
                ))}
              </Animated.View>
          )}

          {/* Instructions */}
          {meal?.strInstructions?.length > 0 && (
              <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)}>
                <Text style={{fontSize: hp(2.5)}} className="text-black-300 font-poppins-semibold mt-4 mb-2">
                  Instructions
                </Text>
                <Text style={{fontSize: hp(1.8)}} className="text-black-300">
                  {meal.strInstructions}
                </Text>
              </Animated.View>
          )}

          {/* Video */}
          {meal.strYoutube && (
              <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)}>
                <Text style={{fontSize: hp(2.5)}} className="text-black-300 font-poppins-semibold mt-4 mb-2">
                  Recipe Video Reference
                </Text>
                <YoutubeIframe videoId={getYoutubeVideoId(meal.strYoutube)} height={hp(30)}/>
              </Animated.View>
          )}
        </View>
      </ScrollView>
  );
};

export default MealDetails;
