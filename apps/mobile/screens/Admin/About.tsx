import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useReadProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/apis/admin.api";
import { PROFILE_UPDATE_REQUEST } from "@repo/types";


const aboutSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  email: z.string().optional(),
  mobile: z.string().optional(),
  bio: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  location: z.string().optional(),
  resume: z.string().optional(),
}) satisfies z.ZodType<PROFILE_UPDATE_REQUEST>;

const AboutAdmin = () => {
  const [showForm, setShowForm] = useState(false);

  const [selectedAbout, setSelectedAbout] = useState<
    string | number | null
  >(null);

  const { data, refetch } = useReadProfileQuery();

  const [updateProfile, { isLoading }] =
    useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PROFILE_UPDATE_REQUEST>({
    defaultValues: {
      name: "",
      title: "",
      email: "",
      mobile: "",
      bio: "",
      github: "",
      linkedin: "",
      location: "",
      resume: "",
    },
    resolver: zodResolver(aboutSchema),
  });

  const handleUpdateProfile = async (
    formData: PROFILE_UPDATE_REQUEST
  ) => {
    try {
      if (selectedAbout !== null) {
        console.log("UPDATE ID:", selectedAbout);
        console.log("FORM DATA:", formData);

        await updateProfile({
          ...formData,
          id: selectedAbout as number,
        }).unwrap();

        Alert.alert(
          "Success",
          "Profile updated successfully"
        );

        refetch();

        reset({
          name: "",
          title: "",
          email: "",
          mobile: "",
          bio: "",
          github: "",
          linkedin: "",
          location: "",
          resume: "",
        });

        setSelectedAbout(null);
        setShowForm(false);
      }
    } catch (error) {
      console.log("UPDATE ERROR:", error);

      Alert.alert(
        "Error",
        "Unable to update profile"
      );
    }
  };

  const handleEdit = (item: any) => {
    reset({
      name: item.name || "",
      title: item.title || "",
      email: item.email || "",
      mobile: item.mobile || "",
      bio: item.bio || "",
      github: item.github || "",
      linkedin: item.linkedin || "",
      location: item.location || "",
      resume: item.resume || "",
    });

    setSelectedAbout(item._id || item.id);

    setShowForm(true);
  };

  return (
    <ScrollView style={styles.container}>
      {showForm && (
        <View style={styles.card}>
          <Text style={styles.heading}>
            Update About Information
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Enter Name"
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
            name="title"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Enter Title"
                  value={value}
                  onChangeText={onChange}
                  style={[
                    styles.input,
                    errors.title && styles.errorInput,
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
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Enter Email"
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
            name="mobile"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Enter Mobile"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  style={[
                    styles.input,
                    errors.mobile && styles.errorInput,
                  ]}
                />

                {errors.mobile && (
                  <Text style={styles.errorText}>
                    {errors.mobile.message}
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Enter Bio"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  style={[
                    styles.input,
                    styles.textArea,
                    errors.bio && styles.errorInput,
                  ]}
                />

                {errors.bio && (
                  <Text style={styles.errorText}>
                    {errors.bio.message}
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="github"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="GitHub URL"
                  value={value}
                  onChangeText={onChange}
                  style={[
                    styles.input,
                    errors.github &&
                      styles.errorInput,
                  ]}
                />

                {errors.github && (
                  <Text style={styles.errorText}>
                    {errors.github.message}
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="linkedin"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="LinkedIn URL"
                  value={value}
                  onChangeText={onChange}
                  style={[
                    styles.input,
                    errors.linkedin &&
                      styles.errorInput,
                  ]}
                />

                {errors.linkedin && (
                  <Text style={styles.errorText}>
                    {errors.linkedin.message}
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Location"
                  value={value}
                  onChangeText={onChange}
                  style={[
                    styles.input,
                    errors.location &&
                      styles.errorInput,
                  ]}
                />

                {errors.location && (
                  <Text style={styles.errorText}>
                    {errors.location.message}
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="resume"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Resume URL"
                  value={value}
                  onChangeText={onChange}
                  style={[
                    styles.input,
                    errors.resume &&
                      styles.errorInput,
                  ]}
                />

                {errors.resume && (
                  <Text style={styles.errorText}>
                    {errors.resume.message}
                  </Text>
                )}
              </>
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(
              handleUpdateProfile
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                Update About Info
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {data?.result && (
        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>
            Profile Details
          </Text>

          <Text style={styles.label}>
            Name: {data.result.name}
          </Text>

          <Text style={styles.label}>
            Title: {data.result.title}
          </Text>

          <Text style={styles.label}>
            Email: {data.result.email}
          </Text>

          <Text style={styles.label}>
            Mobile: {data.result.mobile}
          </Text>

          <Text style={styles.label}>
            Bio: {data.result.bio}
          </Text>

          <Text style={styles.label}>
            GitHub: {data.result.github}
          </Text>

          <Text style={styles.label}>
            LinkedIn: {data.result.linkedin}
          </Text>

          <Text style={styles.label}>
            Location: {data.result.location}
          </Text>

          <Text style={styles.label}>
            Resume: {data.result.resume}
          </Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(data.result)}
          >
            <Text style={styles.editButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default AboutAdmin;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },

  heading: {
    fontSize: 20,
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
    height: 100,
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
    backgroundColor: "#f59e0b",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 18,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    marginBottom: 40,
  },

  profileTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
  },

  label: {
    fontSize: 15,
    marginBottom: 10,
    color: "#333",
  },

  editButton: {
    backgroundColor: "#facc15",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },

  editButtonText: {
    fontWeight: "700",
    color: "#000",
  },
});