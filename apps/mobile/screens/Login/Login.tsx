import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigation } from "@react-navigation/native";
import { useSigninMutation } from "../../redux/apis/auth.api";
import { AppNavigation } from "../../types/navigation";


type SIGNIN_REQUEST = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
}) satisfies z.ZodType<SIGNIN_REQUEST>;

const Login = () => {
  const [signin, { isLoading }] = useSigninMutation();

  const navigation = useNavigation<AppNavigation>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SIGNIN_REQUEST>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: SIGNIN_REQUEST) => {
    try {
      const res = await signin(data).unwrap();

      if (res?.result?.role !== "admin") {
        Alert.alert("Error", "Only admin can login");
        return;
      }

      Alert.alert("Success", "Login Successful");

      reset();

      navigation.navigate("dashboard");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to login");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="email@example.com"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[
                  styles.input,
                  errors.email && styles.errorInput,
                ]}
              />

              {errors.email && (
                <Text style={styles.errorText}>
                  {errors.email.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="********"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.password && styles.errorInput,
                ]}
              />

              {errors.password && (
                <Text style={styles.errorText}>
                  {errors.password.message}
                </Text>
              )}
            </>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleLogin)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f8f9fa",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },

  errorInput: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 4,
  },

  button: {
    backgroundColor: "#0d6efd",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});