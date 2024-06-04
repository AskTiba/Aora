import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (username, email, password) => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.username, form.email, form.password);

      //set it to global state ... using context
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
    createUser();
  };

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
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            // keyboardType="email-address"
          />
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
            title="Sign Up"
            handlePress={submit}
            containerStyle="mt-10"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-sm text-secondary font-pregular"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
