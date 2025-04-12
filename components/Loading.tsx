import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import React from "react";

const Loading = (props: any) => {
  return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator {...props} />
      </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
