import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useAddStatsMutation,
  useReadStatsQuery,
} from "../../redux/apis/admin.api";

import { STATS_CREATE_REQUEST } from "@repo/types";

const statSchema = z.object({
  experience: z.string().min(1, "Experience is required"),
  projects: z.string().min(1, "Projects is required"),
  technologies: z.string().min(1, "Technologies is required"),
  clients: z.string().min(1, "Clients is required"),
}) satisfies z.ZodType<STATS_CREATE_REQUEST>;

const Statistics = () => {
  const [addStat, { isLoading }] =
    useAddStatsMutation();

  const { data } = useReadStatsQuery();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<STATS_CREATE_REQUEST>({
    defaultValues: {
      experience: "",
      projects: "",
      technologies: "",
      clients: "",
    },
    resolver: zodResolver(statSchema),
  });

  const handleCreateStat = async (
    formData: STATS_CREATE_REQUEST
  ) => {
    try {
      await addStat(formData).unwrap();

      Alert.alert(
        "Success",
        "Statistics created successfully"
      );

      reset();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to create statistics"
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>
          Create Statistics
        </Text>

        <Controller
          control={control}
          name="experience"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Enter Experience"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.experience &&
                    styles.errorInput,
                ]}
              />

              {errors.experience && (
                <Text style={styles.errorText}>
                  {errors.experience.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="projects"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Enter Projects"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.projects &&
                    styles.errorInput,
                ]}
              />

              {errors.projects && (
                <Text style={styles.errorText}>
                  {errors.projects.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="technologies"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Enter Technologies"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.technologies &&
                    styles.errorInput,
                ]}
              />

              {errors.technologies && (
                <Text style={styles.errorText}>
                  {errors.technologies.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="clients"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Enter Clients"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.clients &&
                    styles.errorInput,
                ]}
              />

              {errors.clients && (
                <Text style={styles.errorText}>
                  {errors.clients.message}
                </Text>
              )}
            </>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleCreateStat)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Add Statistics
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {data?.result && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsHeading}>
            Statistics
          </Text>

          <View style={styles.statsCard}>
            <View style={styles.row}>
              <Text style={styles.label}>
                Experience:
              </Text>

              <Text style={styles.value}>
                {data.result.experience}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Projects:
              </Text>

              <Text style={styles.value}>
                {data.result.projects}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Technologies:
              </Text>

              <Text style={styles.value}>
                {data.result.technologies}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Clients:
              </Text>

              <Text style={styles.value}>
                {data.result.clients}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
    paddingTop: 50,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    elevation: 4,
    marginBottom: 24,
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
    color: "#000",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    backgroundColor: "#fff",
    fontSize: 15,
  },

  errorInput: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  button: {
    backgroundColor: "#0d6efd",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  statsContainer: {
    marginBottom: 40,
  },

  statsHeading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000",
  },

  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },

  value: {
    fontSize: 16,
    color: "#555",
  },
});