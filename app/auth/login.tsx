import { supabase } from "@/lib/supabase";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password,
        });

        if (error) {
            Alert.alert('Gabim', error.message);
        } else {
            router.replace('/(tabs)/profile');
        }
        setLoading(false);
    }

    async function signUpWithEmail() {
        if (isSignUp && !fullName.trim()) {
            Alert.alert('Gabim', 'Ju lutem plotësoni emrin tuaj të plotë.');
            return;
        }

        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email.trim(),
            password: password,
            options: {
                data: {
                    full_name: fullName.trim(),
                    birthday: birthday.toISOString().split('T')[0],
                    address: address.trim(),
                }
            }
        });

        if (error) {
            Alert.alert('Gabim', error.message);
        } else if (!session) {
            Alert.alert('Sukses', "Ju lutem kontrolloni email-in tuaj për verifikim.");
        } else {
            router.replace('/(tabs)/profile');
        }
        setLoading(false);
    }

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthday(selectedDate);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="px-6 py-12 pb-32"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Back Button for Signup */}
                    {isSignUp && (
                        <TouchableOpacity
                            onPress={() => setIsSignUp(false)}
                            className="absolute top-4 left-4 z-10 p-2"
                        >
                            <MaterialCommunityIcons name="arrow-left" size={28} color="#1F2937" />
                        </TouchableOpacity>
                    )}

                    <View className="items-center mb-10 mt-4">
                        <View className="w-20 h-20 bg-red-600 rounded-3xl items-center justify-center mb-4 shadow-lg shadow-red-200">
                            <MaterialCommunityIcons name="bus" size={40} color="white" />
                        </View>
                        <Text className="text-3xl font-bold text-gray-900">
                            {isSignUp ? 'Krijoni Llogarinë' : 'Mirëseerdhët'}
                        </Text>
                        <Text className="text-gray-500 mt-2 text-center px-8">
                            {isSignUp
                                ? 'Plotësoni të dhënat tuaja për të filluar përdorimin e platformës.'
                                : 'Hyni për të parë rrugët e ruajtura dhe profilin tuaj.'}
                        </Text>
                    </View>

                    <View className="space-y-4">
                        {isSignUp && (
                            <View>
                                <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Emri i Plotë</Text>
                                <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                                    <MaterialCommunityIcons name="account-outline" size={20} color="#6B7280" />
                                    <TextInput
                                        className="flex-1 ml-3 text-gray-900"
                                        placeholder="Filan Fisteku"
                                        value={fullName}
                                        onChangeText={setFullName}
                                    />
                                </View>
                            </View>
                        )}

                        <View className="mt-4">
                            <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Adresa e Email</Text>
                            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                                <MaterialCommunityIcons name="email-outline" size={20} color="#6B7280" />
                                <TextInput
                                    className="flex-1 ml-3 text-gray-900"
                                    placeholder="email@example.com"
                                    value={email}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>

                        <View className="mt-4">
                            <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Fjalëkalimi</Text>
                            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                                <MaterialCommunityIcons name="lock-outline" size={20} color="#6B7280" />
                                <TextInput
                                    className="flex-1 ml-3 text-gray-900"
                                    placeholder="••••••••"
                                    value={password}
                                    secureTextEntry
                                    onChangeText={setPassword}
                                />
                            </View>
                        </View>

                        {isSignUp && (
                            <>
                                <View className="mt-4">
                                    <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Datëlindja</Text>
                                    <TouchableOpacity
                                        onPress={() => setShowDatePicker(true)}
                                        className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4"
                                    >
                                        <MaterialCommunityIcons name="calendar-outline" size={20} color="#6B7280" />
                                        <Text className="flex-1 ml-3 text-gray-900">
                                            {birthday.toLocaleDateString()}
                                        </Text>
                                    </TouchableOpacity>
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={birthday}
                                            mode="date"
                                            display="default"
                                            onChange={onDateChange}
                                            maximumDate={new Date()}
                                        />
                                    )}
                                </View>

                                <View className="mt-4">
                                    <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">Adresa</Text>
                                    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                                        <MaterialCommunityIcons name="home-outline" size={20} color="#6B7280" />
                                        <TextInput
                                            className="flex-1 ml-3 text-gray-900"
                                            placeholder="Rruga, Qyteti"
                                            value={address}
                                            onChangeText={setAddress}
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                    </View>

                    <TouchableOpacity
                        className={`mt-10 py-4 rounded-2xl items-center shadow-md ${loading ? 'bg-gray-400' : 'bg-gray-900'}`}
                        onPress={isSignUp ? signUpWithEmail : signInWithEmail}
                        disabled={loading}
                    >
                        <Text className="text-white font-bold text-lg">
                            {loading ? 'Duke u procesuar...' : (isSignUp ? 'Regjistrohuni' : 'Hyni')}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-center mt-8">
                        <Text className="text-gray-600">
                            {isSignUp ? 'Keni një llogari? ' : "Nuk keni llogari? "}
                        </Text>
                        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                            <Text className="text-red-500 font-bold">
                                {isSignUp ? 'Hyni' : 'Regjistrohuni'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
