import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useAddProjectMutation,
  useDeleteProjectMutation,
  useReadProjectsQuery,
  useUpdateProjectMutation,
} from "../../redux/apis/admin.api";

import {
  PROJECT_CREATE_REQUEST,
  PROJECT_DELETE_REQUEST,
} from "@repo/types";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(
    1,
    "Description is required"
  ),
  sk: z.string(),
  githublink: z
    .string()
    .min(1, "Github link required"),
  livelink: z
    .string()
    .min(1, "Live link required"),
  image: z.string().min(1, "Image URL required"),
}) satisfies z.ZodType<PROJECT_CREATE_REQUEST>;

const Projects = () => {
  const [selectedProject, setSelectedProject] =
    useState<number | null>(null);

  const [addProject, { isLoading }] =
    useAddProjectMutation();

  const [updateProject] =
    useUpdateProjectMutation();

  const [deleteProject] =
    useDeleteProjectMutation();

  const { data, refetch } =
    useReadProjectsQuery();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PROJECT_CREATE_REQUEST>({
    defaultValues: {
      title: "",
      description: "",
      sk: "",
      githublink: "",
      livelink: "",
      image: "",
    },
    resolver: zodResolver(projectSchema),
  });

  const handleCreateProject = async (
    formData: PROJECT_CREATE_REQUEST
  ) => {
    try {
      if (selectedProject !== null) {
        await updateProject({
          ...formData,
          id: selectedProject,
          skills: formData.sk
            .split(",")
            .map((s) => s.trim()),
        }).unwrap();

        Alert.alert(
          "Success",
          "Project updated successfully"
        );

        setSelectedProject(null);
      } else {
        await addProject({
          ...formData,
          skills: formData.sk
            .split(",")
            .map((s) => s.trim()),
        }).unwrap();

        Alert.alert(
          "Success",
          "Project created successfully"
        );
      }

      reset({
        title: "",
        description: "",
        sk: "",
        githublink: "",
        livelink: "",
        image: "",
      });

      refetch();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to create/update project"
      );
    }
  };

  const handleDeleteProject = async (
    formData: PROJECT_DELETE_REQUEST
  ) => {
    try {
      await deleteProject(formData).unwrap();

      Alert.alert(
        "Success",
        "Project deleted successfully"
      );

      refetch();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to delete project"
      );
    }
  };

  const handleEdit = (item: any) => {
    reset({
      title: item.title,
      description: item.description,
      sk: item.skills.join(","),
      githublink: item.githublink,
      livelink: item.livelink,
      image: item.image,
    });

    setSelectedProject(item._id);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>
          {selectedProject !== null
            ? "Update Project"
            : "Create Project"}
        </Text>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Project Title"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.title &&
                  styles.errorInput,
                ]}
              />

              {errors.title && (
                <Text style={styles.errorText}>
                  {errors.title.message}
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
                placeholder="Project Description"
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

        <Controller
          control={control}
          name="sk"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="React, Node, MongoDB"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.sk &&
                  styles.errorInput,
                ]}
              />

              {errors.sk && (
                <Text style={styles.errorText}>
                  {errors.sk.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="githublink"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Github Link"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.githublink &&
                  styles.errorInput,
                ]}
              />

              {errors.githublink && (
                <Text style={styles.errorText}>
                  {errors.githublink.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="livelink"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Live Link"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.livelink &&
                  styles.errorInput,
                ]}
              />

              {errors.livelink && (
                <Text style={styles.errorText}>
                  {errors.livelink.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Image URL"
                value={value}
                onChangeText={onChange}
                style={[
                  styles.input,
                  errors.image &&
                  styles.errorInput,
                ]}
              />

              {errors.image && (
                <Text style={styles.errorText}>
                  {errors.image.message}
                </Text>
              )}
            </>
          )}
        />

        <TouchableOpacity
          style={[
            styles.button,
            selectedProject !== null
              ? styles.updateButton
              : null,
          ]}
          disabled={isLoading}
          onPress={handleSubmit(
            handleCreateProject
          )}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {selectedProject !== null
                ? "Update Project"
                : "Create Project"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.projectContainer}>
        <Text style={styles.projectHeading}>
          Projects
        </Text>

        {data?.result?.map((item: any, index: number) => (
          <View
            key={item._id?.toString() || index.toString()}
            style={styles.projectCard}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.projectImage}
            />

            <Text style={styles.projectTitle}>
              {item.title}
            </Text>

            <Text style={styles.projectDesc}>
              {item.description}
            </Text>

            <Text style={styles.projectSkills}>
              Skills:{" "}
              {item.skills.join(", ")}
            </Text>

            <View style={styles.linkContainer}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    item.githublink
                  )
                }
              >
                <Text style={styles.linkText}>
                  Github Link
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    item.livelink
                  )
                }
              >
                <Text style={styles.linkText}>
                  Live Link
                </Text>
              </TouchableOpacity>
            </View>

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
                  handleDeleteProject({
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

export default Projects;

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

  projectContainer: {
    marginBottom: 40,
  },

  projectHeading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  projectCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 3,
  },

  projectImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },

  projectTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  projectDesc: {
    marginTop: 6,
    color: "#555",
  },

  projectSkills: {
    marginTop: 8,
    fontWeight: "600",
    color: "#0d6efd",
  },

  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  linkText: {
    color: "#0d6efd",
    fontWeight: "700",
    textDecorationLine: "underline",
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