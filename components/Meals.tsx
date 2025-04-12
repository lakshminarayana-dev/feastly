import React from "react";
import {View, Text, FlatList} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import Loading from "@/components/Loading";
import MealCard from "@/components/MealCard";
import MasonryList from "@react-native-seoul/masonry-list";

// Interfaces
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface MealsProps {
  category: string;
  meals: Meal[];
  categories: Category[];
}

const Meals: React.FC<MealsProps> = ({category, meals, categories}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
      <View>
        {categories.length === 0 || meals.length === 0 ? (
            <Loading size="large" className="mt-20"/>
        ) : (
            // <FlatList
            //     data={meals}
            //     keyExtractor={(item) => item.idMeal}
            //     numColumns={2}
            //     columnWrapperStyle={{
            //       justifyContent: 'space-between',
            //       paddingHorizontal: 28,
            //     }}
            //     renderItem={({item, index}) => (
            //         <MealCard category={category} item={item} index={index} navigation={navigation}/>
            //     )}
            //     showsVerticalScrollIndicator={false}
            //     contentContainerStyle={{
            //       paddingBottom: 100, // Add this to prevent clipping
            //     }}
            //     // ListFooterComponent={<View className="h-[48px]"/>} // Extra buffer just in case
            // />
            <MasonryList
                data={meals}
                keyExtractor={(item): string => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <MealCard category={category} item={item} index={index} navigation={navigation}/>
                )}
                // refreshing={isLoadingNext}
                // onRefresh={() => refetch({ first: ITEM_CNT })}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadNext(ITEM_CNT)}
            />
        )}
      </View>
  );
};

export default Meals;
