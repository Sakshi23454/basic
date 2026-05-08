import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useAddSkillMutation,
  useDeleteSkillMutation,
  useReadSkillQuery,
} from "../../redux/apis/admin.api";

import {
  SKILL_CREATE_REQUEST,
  SKILL_DELETE_REQUEST,
} from "@repo/types";

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().min(1, "Icon URL is required"),
}) satisfies z.ZodType<SKILL_CREATE_REQUEST>;

const AddSkill = () => {
  const [addSkill, { isLoading }] =
    useAddSkillMutation();

  const { data, refetch } = useReadSkillQuery();

  const [deleteSkill] = useDeleteSkillMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SKILL_CREATE_REQUEST>({
    defaultValues: {
      name: "",
      category: "",
      icon: "",
    },
    resolver: zodResolver(skillSchema),
  });

  const handleAddSkill = async (
    formData: SKILL_CREATE_REQUEST
  ) => {
    try {
      await addSkill(formData).unwrap();

      Alert.alert(
        "Success",
        "Skill added successfully"
      );

      reset();

      refetch();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to add skill"
      );
    }
  };

  const handleDeleteSkill = async (
    formData: SKILL_DELETE_REQUEST
  ) => {
    try {
      await deleteSkill(formData).unwrap();

      Alert.alert(
        "Success",
        "Skill deleted successfully"
      );

      refetch();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to delete skill"
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>
          Add Skill
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Skill Name"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.name && styles.errorInput,
                ]}
              />

              {errors.name && (
                <Text style={styles.errorText}>
                  {errors.name.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Frontend / Backend"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.category &&
                    styles.errorInput,
                ]}
              />

              {errors.category && (
                <Text style={styles.errorText}>
                  {errors.category.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="icon"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Enter Icon URL"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.icon && styles.errorInput,
                ]}
              />

              {errors.icon && (
                <Text style={styles.errorText}>
                  {errors.icon.message}
                </Text>
              )}
            </>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleAddSkill)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Add Skill
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.skillContainer}>
        <Text style={styles.skillHeading}>
          Skills
        </Text>

        {data?.result?.map(
          (item: any, index: number) => (
            <View
              key={
                item._id?.toString() ||
                index.toString()
              }
              style={styles.skillCard}
            >
              <Image
                source={{ uri: item.icon }}
                style={styles.skillImage}
              />

              <View style={styles.skillInfo}>
                <Text style={styles.skillName}>
                  {item.name}
                </Text>

                <Text style={styles.skillCategory}>
                  {item.category}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  handleDeleteSkill({
                    id: item._id,
                  })
                }
              >
                <Text style={styles.deleteText}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
};

export default AddSkill;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 20,
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

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  skillContainer: {
    marginBottom: 40,
  },

  skillHeading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  skillCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  skillImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },

  skillInfo: {
    flex: 1,
  },

  skillName: {
    fontSize: 16,
    fontWeight: "700",
  },

  skillCategory: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
});