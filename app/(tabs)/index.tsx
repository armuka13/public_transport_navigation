import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';

export default function HomeScreen() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const { width } = useWindowDimensions();

  // Responsive: limit max width on tablets/web
  const isWide = width > 600;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleSwap = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const recentSearches = [
    { id: '1', from: 'TEG', to: 'Sheshi Skenderbej' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-6"
        showsVerticalScrollIndicator={false}
      >
        <View
          className={`w-full ${isWide ? 'max-w-lg self-center' : ''} px-5 pt-4 mt-12`}
        >
          {/* Header */}
          <View className="items-center mb-4 mt-2">
            <Text className="text-2xl font-bold text-gray-900 tracking-wide">
              Kerko Udhetimin
            </Text>
            <View className="h-1 w-40 bg-red-500 mt-1  rounded-full" />
          </View>

          {/* Date & Time */}
          <View className="flex-row items-center justify-center gap-4 mb-5">
            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
              <MaterialIcons name="calendar-today" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-2 font-medium">
                {dateStr}
              </Text>
            </View>
            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
              <MaterialIcons name="access-time" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-2 font-medium">
                {timeStr}
              </Text>
            </View>
          </View>

          {/* Search Fields */}
          <View className="relative mb-4">
            {/* From Field */}
            <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 mb-2 bg-white">
              <MaterialIcons name="trip-origin" size={18} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-800"
                placeholder="Nga ku?"
                placeholderTextColor="#9CA3AF"
                value={fromLocation}
                onChangeText={setFromLocation}
              />
            </View>

            {/* Swap Button */}
            <TouchableOpacity
              onPress={handleSwap}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-red-600 items-center justify-center shadow-lg"
              style={{
                elevation: 4,
                shadowColor: '#DC2626',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
            >
              <MaterialIcons name="swap-vert" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            {/* To Field */}
            <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-white">
              <MaterialIcons name="location-on" size={18} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-800"
                placeholder="Per ku?"
                placeholderTextColor="#9CA3AF"
                value={toLocation}
                onChangeText={setToLocation}
              />
            </View>
          </View>

          {/* Search Button */}
          <TouchableOpacity
            className="items-center justify-center bg-gray-900 rounded-full py-3.5 mb-6"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-base tracking-widest">
              KERKO
            </Text>
          </TouchableOpacity>

          {/* Info Banner */}
          <TouchableOpacity
            className="flex-row w-full items-center bg-gray-500 px-5 py-3.5 mb-6"
            activeOpacity={0.8}
          >
            <View className="w-7 h-7 rounded-full bg-yellow-400 items-center justify-center mr-3">
              <MaterialIcons name="warning" size={16} color="#1F2937" />
            </View>
            <Text className="flex-1 text-white text-sm font-medium">
              Tashme ke bilete apo abonim?
            </Text>
            <MaterialIcons name="add-circle-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <Text>
            {"\n"}
          </Text>

          {/* Recent Searches */}
          <View className="mb-4">
            <View className="items-center mb-4">
              <Text className="text-lg font-bold text-gray-900 tracking-wide">
                Kerkimet e fundit
              </Text>
              <View className="h-1 w-32 bg-red-500 mt-1 rounded-full" />
            </View>

            {recentSearches.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-4 py-4 mb-3 shadow-sm"
                activeOpacity={0.7}
                style={{
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                }}
              >
                <View className="w-11 h-11 rounded-full bg-gray-900 items-center justify-center mr-4">
                  <MaterialIcons name="directions-bus" size={22} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-900">
                    {item.from}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-0.5">
                    {item.to}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
