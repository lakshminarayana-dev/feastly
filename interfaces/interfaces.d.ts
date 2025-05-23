import {NativeStackNavigationProp} from "@react-navigation/native-stack";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
}

interface MealProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealCardProps {
  category: string;
  item: MealProps;
  index: number;
  navigation: NativeStackNavigationProp<any>;
}

interface MealDetailsProps {
  dateModified: string | null;
  idMeal: string;
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string | null;
  strImageSource: string | null;
  strIngredient1: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient2: string;
  strIngredient20: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strInstructions: string;
  strMeal: string;
  strMealAlternate: string | null;
  strMealThumb: string;
  strMeasure1: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure2: string;
  strMeasure20: string;
  strSource: string;
  strTags: string;
  strYoutube: string;
}
