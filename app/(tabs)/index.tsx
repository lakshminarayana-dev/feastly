import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View,} from "react-native";
import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {heightPercentageToDP as hp,} from "react-native-responsive-screen";
import axios from "axios";
import Categories from "@/components/Categories";
import icons from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";
import MasonryList from "@react-native-seoul/masonry-list";
import MealCard from "@/components/MealCard";
import {useNavigation} from "@react-navigation/native";
import {MealProps} from "@/interfaces/interfaces";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {addFavorite, removeFavorite} from "@/redux/favoritesSlice";

const Index = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState<MealProps[]>([]);
  const [search, setSearch] = useState("");

  const getCategories = async () => {
    try {
      await axios
          .get("https://themealdb.com/api/json/v1/1/categories.php")
          .then((response) => {
            if (response && response.data) {
              setCategories(response.data.categories);
            }
          });
    } catch (error) {
      console.log("Get Categories Error", error.message);
    }
  };

  const getRecipes = async (category) => {
    try {
      await axios
          .get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
          .then((response) => {
            if (response && response.data) {
              setMeals(response.data.meals);
            }
          });
    } catch (error) {
      console.log("Get Meals Error", error.message);
    }
  };

  const getRecipesByInput = async (query) => {
    try {
      const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("Get Meals Error", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCategories();
      await getRecipes("Beef");
    };

    fetchData();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const HeaderSection = () => (
      <View className="flex-row items-start justify-between mt-4">
        {/* Left Side Texts */}
        <View className="flex-1 pr-4">
          <Text className="font-poppins text-black-300 text-base">Welcome Back!</Text>
          <Text
              style={{fontSize: hp(3.4)}}
              className="font-poppins-semibold text-neutral-600 leading-snug mt-1"
          >
            Simple <Text className="text-primary-300">Recipes</Text> from Kitchen to{" "}
            <Text className="text-primary-300">Heart</Text> ❤️
          </Text>
        </View>

        {/* Right Side Image */}
        <View
            className=" overflow-hidden"
            style={{width: 64, height: 64}}
        >
          <Image
              source={icons.manWink}
              style={{width: 64, height: 64}}
              resizeMode="cover"
          />
        </View>
      </View>
  );

  return (
      <SafeAreaView className="flex-1 bg-white-100 mt-safe">
        <StatusBar style="dark"/>
        <ScrollView showsVerticalScrollIndicator={false}
        >
          <View className="mx-4">
            <HeaderSection/>
            <View className="mt-4">
              <SearchBar/>
            </View>
            <View className="mt-4">
              <Text style={{fontSize: hp(2.6)}} className="font-poppins-semibold text-black-100 mb-1">
                Categories
              </Text>
              <Categories
                  categories={categories}
                  activeCategory={activeCategory}
                  handleChangeCategory={handleChangeCategory}
              />
              <View className="mt-4">
                {categories.length == 0 || meals.length == 0 ? (
                    <Loading size="large" className="mt-20" color="red"/>
                ) : (
                    <MasonryList
                        data={meals}
                        keyExtractor={(item): string => item.idMeal}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, i}) => (
                            <MealCard category={activeCategory} item={item} index={i} navigation={navigation}/>
                        )}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={<View style={{height: hp(10)}}/>} // Add safe space
                    />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
