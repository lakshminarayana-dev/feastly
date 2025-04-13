import React from "react";
import {Text, View} from "react-native";

interface InfoCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const InfoCard = ({icon, value, label}: InfoCardProps) => {
  return (
      <View className="bg-primary-800 rounded-lg p-4 w-[45%] mb-4">
        <View className="flex-row items-center justify-center mb-1 mx-2">
          {icon}
          <Text className="font-poppins-medium text-primary-900 ml-2">
            {value}
          </Text>
        </View>
        <Text className="font-poppins text-black-300 text-center text-sm">{label}</Text>
      </View>
  );
};

export default InfoCard;
