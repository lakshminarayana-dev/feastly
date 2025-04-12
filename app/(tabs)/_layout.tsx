import {Tabs} from "expo-router";
import {Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

type TabIconProps = {
  focused: boolean;
  icon: keyof typeof AntDesign.glyphMap;
  title: string;
};

const TabIcon = ({focused, icon, title}: TabIconProps) => (
    <View className="flex-1 mt-2 flex flex-col items-center">
      <AntDesign
          name={icon}
          size={22}
          color={focused ? "#EB5757" : "#666876"}
      />
      <Text
          className={`${
              focused ? "text-primary-100 font-poppins-medium" : "text-black-200 font-poppins"
          } text-sm w-full text-center mt-2`}
      >
        {title}
      </Text>
    </View>
);

const TabsLayout = () => {
  return (
      <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "white",
              position: "absolute",
              borderTopColor: "#EB5757",
              borderTopWidth: 1,
              minHeight: 70,
            },
          }}
      >
        <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({focused}) => (
                  <TabIcon focused={focused} icon="home" title="Home"/>
              ),
            }}
        />
        <Tabs.Screen
            name="feastlist"
            options={{
              title: "Feast list",
              headerShown: false,
              tabBarIcon: ({focused}) => (
                  <TabIcon focused={focused} icon="hearto" title="Feast list"/>
              ),
            }}
        />

      </Tabs>
  );
};

export default TabsLayout;
