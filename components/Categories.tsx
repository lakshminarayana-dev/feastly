import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Animated, {FadeInDown} from "react-native-reanimated";

interface CategoriesProps {
  categories: Category[];
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
                                                 categories,
                                                 activeCategory,
                                                 handleChangeCategory,
                                               }) => {
  return (
      <Animated.View entering={FadeInDown.duration(500).springify()}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}

            // contentContainerStyle={{paddingHorizontal: 15}}
        >
          {categories.map((cat, index) => {
            const isActive = cat.strCategory === activeCategory;
            const buttonClass = isActive
                ? "bg-primary-100"
                : "bg-gray-500";

            const textClass = isActive
                ? "text-white-100"
                : "text-black-200";

            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleChangeCategory(cat.strCategory)}
                    className={`${buttonClass} py-2 rounded-full self-start pl-3 pr-5  mr-4`}
                >
                  <View className="flex-row items-center align-middle">
                    <View className="rounded-full bg-white-100 p-2">
                      <Image
                          source={{uri: cat.strCategoryThumb}}
                          className="w-[18px] h-[18px] rounded-full"
                          resizeMode="cover"
                      />
                    </View>
                    <Text className={`${textClass} font-medium text-center text-base ml-3`}>
                      {cat.strCategory}
                    </Text>
                  </View>
                </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
  );
};

export default Categories;
