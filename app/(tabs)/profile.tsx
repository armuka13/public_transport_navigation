import { useAuth } from '@/context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Auth from '../auth/login';

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const isWide = width > 600;
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <SafeAreaView className='flex-1 bg-white items-center justify-center'>
        <Text>Duke u ngarkuar...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const fullName = user.user_metadata?.full_name || "Nuk është dhënë";
  const birthday = user.user_metadata?.birthday || "Nuk është dhënë";
  const address = user.user_metadata?.address || "Nuk është dhënë";

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className="flex-1"
        contentContainerClassName="pb-6"
        showsVerticalScrollIndicator={false}>
        <View className={`w-full ${isWide ? 'max-w-lg self-center' : ''} px-5 pt-6 mt-12`}>
          {/* Header */}
          <View className="items-center mb-8 mt-2">
            <Text className="text-2xl font-bold text-gray-900 tracking-wide">
              Profili
            </Text>
            <View className="h-1 w-40 bg-red-500 mt-1 rounded-full" />
          </View>

          {/* User Info Card */}
          <View className="items-center mb-8 px-4 py-8 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
            <View className="w-24 h-24 rounded-full bg-gray-900 items-center justify-center mb-4 shadow-md">
              <MaterialCommunityIcons name="account" size={48} color="#FFFFFF" />
            </View>
            <Text className="text-xl font-bold text-gray-900">{fullName}</Text>
            <Text className="text-sm text-gray-500 mt-1">{user.email}</Text>
          </View>

          {/* Personal Details Section */}
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-4 ml-2">Të dhënat personave</Text>

            <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-2xl bg-blue-50 items-center justify-center mr-4">
                  <MaterialCommunityIcons name="calendar" size={20} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 uppercase font-bold tracking-wider">Datëlindja</Text>
                  <Text className="text-base text-gray-900 font-medium">{birthday}</Text>
                </View>
              </View>

              <View className="h-[1px] bg-gray-50 w-full" />

              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-2xl bg-green-50 items-center justify-center mr-4">
                  <MaterialCommunityIcons name="map-marker" size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 uppercase font-bold tracking-wider">Adresa</Text>
                  <Text className="text-base text-gray-900 font-medium">{address}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View className="space-y-3">
            <TouchableOpacity
              onPress={signOut}
              className="flex-row items-center bg-white border border-red-50 rounded-2xl px-4 py-4 mb-3 shadow-sm"
              activeOpacity={0.7}
            >
              <View className="w-11 h-11 rounded-full bg-red-50 items-center justify-center mr-4">
                <MaterialCommunityIcons name="logout" size={22} color="#EF4444" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-red-600">Sign Out</Text>
                <Text className="text-sm text-red-400 mt-0.5">Mbyll seancën tuaj</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color="#FCA5A5" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
