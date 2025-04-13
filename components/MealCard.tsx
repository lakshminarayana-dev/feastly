import React, {useCallback, useMemo} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import Animated, {FadeInDown} from "react-native-reanimated";
import {AntDesign} from "@expo/vector-icons";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MealCardProps} from "@/interfaces/interfaces";
import {useDispatch, useSelector} from "react-redux";
import {addFavorite, removeFavorite} from "@/redux/favoritesSlice";
import {RootState} from "@/redux/store";
import {Link} from "expo-router";

const MealCard: React.FC<MealCardProps> = ({category, item, index}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.meals);

  const isFavorite = useMemo(
      () => favorites.some((m) => m.idMeal === item.idMeal),
      [favorites, item.idMeal]
  );

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavorite(item.idMeal));
    } else {
      dispatch(
          addFavorite({
            idMeal: item.idMeal,
            strMeal: item.strMeal,
            strMealThumb: item.strMealThumb,
          })
      );
    }
  }, [dispatch, isFavorite, item]);

  const isEven = index % 2 === 0;

  return (
      <View
          style={{
            width: "100%",
            paddingLeft: isEven ? 0 : 8,
            paddingRight: isEven ? 8 : 0,
          }}
      >
        <Animated.View
            entering={FadeInDown.delay(index * 100)
                .duration(600)
                .springify()
                .damping(20)}
            className="relative shadow-md shadow-black-100 mb-4"
        >
          {/* Navigate on card tap */}
          <Link href={`/meal/${item.idMeal}`} asChild>
            <TouchableOpacity activeOpacity={0.8}>
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
            </TouchableOpacity>
          </Link>

          {/* Favorite Icon */}
          <TouchableOpacity
              onPress={handleToggleFavorite}
              style={{position: "absolute", top: 8, right: 8, zIndex: 10}}
              className="bg-white-100 rounded-full p-2 shadow shadow-black/10"
          >
            <AntDesign
                name={isFavorite ? "heart" : "hearto"}
                size={18}
                color="#EB5757"
            />
          </TouchableOpacity>

          {/* Meal Name */}
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
        </Animated.View>
      </View>
  );
};

// 🚀 Prevent unnecessary re-renders if props don’t change
export default React.memo(MealCard);
