import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {useEffect, useState} from "react";
import icons from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import Categories from "@/components/Categories";
import Meals from "@/components/Meals";
import {StatusBar} from "expo-status-bar";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {useNavigation} from "@react-navigation/native";
import MealCard from "@/components/MealCard";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Beef");
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState<string>("");

  const getCategories = async () => {
    try {
      const response = await axios.get(
          "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response?.data?.categories) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("Get Categories Error", error.message);
    }
  };

  const getMeals = async (category: string) => {
    try {
      const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response?.data?.meals) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("Get Meals Error", error.message);
    }
  };

  const getMealsByInput = async (query: string) => {
    try {
      const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (response?.data?.meals) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("Get Meals Error", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCategories();
      await getMeals("Beef");
    };
    fetchData();
  }, []);

  const handleChangeCategory = (category: string) => {
    setMeals([]);
    getMeals(category);
    setActiveCategory(category);
  };

  const Header = () => (
      <View className="px-8 pt-16 pb-4 bg-white-100">
        <View className="flex-row justify-between items-start mb-1 mt-2">
          <View className="flex-1 mr-4">
            <Text style={{fontSize: hp(1.7)}} className="font-poppins text-black-300">
              Hello Chef!
            </Text>
            <Text
                style={{fontSize: hp(3.2)}}
                className="font-poppins-semibold text-black-300 leading-tight mt-1"
            >
              What would you like to Cook{" "}
              <Text className="text-primary-100">Today?</Text>
            </Text>
          </View>

          <View style={{width: 64, height: 64, borderRadius: 64, backgroundColor: '#FF4B3E', overflow: 'hidden'}}>
            <Image source={icons.manWink} style={{width: 64, height: 64}} resizeMode="cover"/>
          </View>
        </View>

        <View className="mt-2">
          <SearchBar/>
        </View>
      </View>
  );

  const StickyCategories = () => (
      <View className="bg-white-100 px-8 pt-4 pb-2">
        <Text style={{fontSize: hp(2.6)}} className="font-poppins-semibold text-black-100 mb-2">
          Popular Categories
        </Text>
        <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
        />
      </View>
  );

  return (
      <SafeAreaView className="flex-1 bg-white-100">
        <StatusBar style="dark"/>
        <FlatList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: 28,
            }}
            ListHeaderComponent={
              <>
                {Header()}
                {StickyCategories()}
              </>
            }
            stickyHeaderIndices={[1]} // Sticky only the Categories view
            renderItem={({item, index}) => (
                <MealCard category={activeCategory} item={item} index={index} navigation={useNavigation()}/>
            )}
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
  );
};
export default Home;


import React from "react";
import {Pressable, Text, View, Image} from "react-native";
import Animated, {FadeInDown} from "react-native-reanimated";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {AntDesign} from "@expo/vector-icons";

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

  return (
      <Animated.View
          entering={FadeInDown.delay(index * 100).duration(600).springify().damping(20)}
          className="bg-white-100 rounded-xl overflow-hidden mb-4"
      >
        <Pressable onPress={() => navigation.navigate("RecipeDetail", {...item})}>
          <View className="relative">
            <Image
                source={{uri: item.strMealThumb}}
                className="w-full aspect-[3/2] rounded-t-xl"
                resizeMode="cover"
            />
            <View className="absolute top-2 right-2 bg-white-100 rounded-full p-2 shadow-sm shadow-black/10">
              <AntDesign name="hearto" size={18} color="#EB5757"/>
            </View>
          </View>

          <View className="px-2 pt-2 pb-3">
            <Text
                numberOfLines={2}
                className="text-black-300 font-poppins-semibold text-base"
            >
              {item.strMeal}
            </Text>

            <View className="flex-row items-center mt-2">
              <AntDesign name="star" size={16} color="#EB5757"/>
              <Text className="ml-1 text-black-300 text-sm font-medium">{rating}</Text>
              <Text className="ml-2 text-black-300 text-sm font-medium">{category}</Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
  );
};

export default MealCard;
