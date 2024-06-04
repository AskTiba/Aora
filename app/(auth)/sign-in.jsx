import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="">
        <View className="w-full justify-center min-h-[90vh] px-4 my-6">
          <Image
            className="w-[115px] h-[85px]"
            source={images.logo}
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold mt-2 font-psemibold">
            Log into Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            // keyboardType="password"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyle="mt-10"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-gray-100 font-pregular">
              Don't you have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-sm text-secondary font-pregular"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default SignIn;
