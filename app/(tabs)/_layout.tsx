import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function TabLayout() {
  const { width } = useWindowDimensions();

  // Custom Tab Bar Component
  const MyTabBar = ({ state, descriptors, navigation }: any) => {
    const MARGIN = 20;
    const TAB_BAR_WIDTH = width - MARGIN * 2;
    const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

    // The Sliding Animation Logic
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: withSpring(state.index * TAB_WIDTH) }],
      };
    });

    return (
      <View style={[styles.tabContainer, { width: TAB_BAR_WIDTH, left: MARGIN }]}>
        {/* The Sliding Red Pill */}
        <Animated.View style={[styles.slider, { width: TAB_WIDTH }, animatedStyle]} />

        {/* The Actual Buttons */}
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const color = isFocused ? 'white' : 'black';

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem}>
              {options.tabBarIcon && options.tabBarIcon({ color, size: 24, focused: isFocused })}
              <Text style={[styles.label, { color }]}>{options.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Tabs 
      tabBar={(props) => <MyTabBar {...props} />} 
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'LINJAT',
          tabBarIcon: ({ color }) => <MaterialIcons name="directions-bus" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'BILETAT',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="ticket-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILI',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-outline" size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  slider: {
    position: 'absolute',
    height: '100%', // Pill slightly smaller than bar
    backgroundColor: '#E30606',
    borderRadius: 40,
    marginHorizontal: 0, // Centered via translateX
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
});