import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useReadExperienceQuery,
  useUpdateExperienceMutation,
} from "../../redux/apis/admin.api";

import {
  EXPERIENCE_CREATE_REQUEST,
  EXPERIENCE_DELETE_REQUEST,
} from "@repo/types";

const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required"),
}) satisfies z.ZodType<EXPERIENCE_CREATE_REQUEST>;

const Experience = () => {
  const [selectedExperience, setSelectedExperience] =
    useState<number | null>(null);

  const [addExp, { isLoading }] =
    useAddExperienceMutation();

  const [updateExp] =
    useUpdateExperienceMutation();

  const [deleteExp] =
    useDeleteExperienceMutation();

  const { data, refetch } =
    useReadExperienceQuery();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EXPERIENCE_CREATE_REQUEST>({
    defaultValues: {
      company: "",
      role: "",
      duration: "",
      description: "",
    },
    resolver: zodResolver(experienceSchema),
  });

  const handleCreateExperience = async (
    formData: EXPERIENCE_CREATE_REQUEST
  ) => {
    try {
      if (selectedExperience !== null) {
        await updateExp({
          ...formData,
          id: selectedExperience,
        }).unwrap();

        Alert.alert(
          "Success",
          "Experience updated successfully"
        );

        setSelectedExperience(null);
      }

      else {
        await addExp(formData).unwrap();

        Alert.alert(
          "Success",
          "Experience added successfully"
        );
      }

      reset({
        company: "",
        role: "",
        duration: "",
        description: "",
      });

      refetch();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to save experience"
      );
    }
  };

  const handleDeleteExperience = async (
    formData: EXPERIENCE_DELETE_REQUEST
  ) => {
    try {
      await deleteExp(formData).unwrap();

      Alert.alert(
        "Success",
        "Experience deleted successfully"
      );

      refetch();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to delete experience"
      );
    }
  };

  const handleEdit = (item: any) => {
    reset({
      company: item.company,
      role: item.role,
      duration: item.duration,
      description: item.description,
    });

    setSelectedExperience(item._id);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>
          {selectedExperience !== null
            ? "Update Experience"
            : "Add Experience"}
        </Text>

        <Controller
          control={control}
          name="company"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Enter company"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.company &&
                  styles.errorInput,
                ]}
              />

              {errors.company && (
                <Text style={styles.errorText}>
                  {errors.company.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Enter role"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.role &&
                  styles.errorInput,
                ]}
              />

              {errors.role && (
                <Text style={styles.errorText}>
                  {errors.role.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="duration"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Enter duration"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.duration &&
                  styles.errorInput,
                ]}
              />

              {errors.duration && (
                <Text style={styles.errorText}>
                  {errors.duration.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Enter description"
                value={value}
                onChangeText={onChange}
                multiline
                style={[
                  styles.input,
                  styles.textArea,
                  errors.description &&
                  styles.errorInput,
                ]}
              />

              {errors.description && (
                <Text style={styles.errorText}>
                  {errors.description.message}
                </Text>
              )}
            </>
          )}
        />

        <TouchableOpacity
          style={[
            styles.button,
            selectedExperience !== null
              ? styles.updateButton
              : null,
          ]}
          disabled={isLoading}
          onPress={handleSubmit(
            handleCreateExperience
          )}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {selectedExperience !== null
                ? "Update Experience"
                : "Add Experience"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.expContainer}>
        <Text style={styles.expHeading}>
          Experience List
        </Text>

        {data?.result?.map((item: any, index: number) => (
          <View
            key={item._id?.toString() || index.toString()}
            style={styles.expCard}
          >
            <Text style={styles.company}>
              {item.company}
            </Text>

            <Text style={styles.role}>
              {item.role}
            </Text>

            <Text style={styles.duration}>
              {item.duration}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  handleEdit(item)
                }
              >
                <Text style={styles.actionText}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  handleDeleteExperience({
                    id: item._id,
                  })
                }
              >
                <Text style={styles.actionText}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Experience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 50,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    backgroundColor: "#fff",
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  errorInput: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },

  button: {
    backgroundColor: "#0d6efd",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },

  updateButton: {
    backgroundColor: "#f59e0b",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  expContainer: {
    marginBottom: 40,
  },

  expHeading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  expCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 3,
  },

  company: {
    fontSize: 18,
    fontWeight: "700",
  },

  role: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    color: "#0d6efd",
  },

  duration: {
    marginTop: 6,
    fontWeight: "600",
    color: "#f59e0b",
  },

  description: {
    marginTop: 8,
    color: "#555",
    lineHeight: 22,
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#f59e0b",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
});