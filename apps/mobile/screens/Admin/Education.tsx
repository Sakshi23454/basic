import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  EDUCATION_CREATE_REQUEST,
  EDUCATION_DELETE_REQUEST,
} from "@repo/types";

import {
  useAddEducationMutation,
  useDeleteEducationMutation,
  useReadEducationQuery,
  useUpdateEducationMutation,
} from "../../redux/apis/admin.api";

const educationSchema = z.object({
  _id: z.string().optional(),
  college: z.string().min(1, "College is required"),
  degree: z.string().min(1, "Degree is required"),
  year: z.string().min(1, "Year is required"),
});

const Education = () => {
  const scrollRef = useRef<ScrollView>(null);

  const [selectedEducation, setSelectedEducation] = useState<number | null>(
    null
  );

  const { data } = useReadEducationQuery();

  const [addEdu, { isLoading }] = useAddEducationMutation();
  const [updateEdu] = useUpdateEducationMutation();
  const [deleteEdu] = useDeleteEducationMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EDUCATION_CREATE_REQUEST>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      college: "",
      degree: "",
      year: "",
    },
  });

  const handleCreateEducation = async (
    formData: EDUCATION_CREATE_REQUEST
  ) => {
    try {
      if (selectedEducation) {
        await updateEdu({
          ...formData,
          id: selectedEducation,
        }).unwrap();

        alert("Education updated successfully");

        setSelectedEducation(null);

        reset({
          college: "",
          degree: "",
          year: "",
        });
      } else {
        await addEdu(formData).unwrap();

        alert("Education added successfully");

        reset({
          college: "",
          degree: "",
          year: "",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Unable to save education");
    }
  };

  const handleDeleteEducation = async (
    data: EDUCATION_DELETE_REQUEST
  ) => {
    try {
      await deleteEdu(data).unwrap();

      alert("Education deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Unable to delete education");
    }
  };

  const handleEdit = (item: any) => {
    reset({
      college: item.college,
      degree: item.degree,
      year: item.year,
    });

    setSelectedEducation(item._id);

    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>
        {selectedEducation ? "Update Education" : "Add Education"}
      </Text>

      <Controller
        control={control}
        name="college"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Enter College"
            placeholderTextColor="#999"
            style={[
              styles.input,
              errors.college && styles.inputError,
            ]}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.college && (
        <Text style={styles.errorText}>
          {errors.college.message}
        </Text>
      )}

      <Controller
        control={control}
        name="degree"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Enter Degree"
            placeholderTextColor="#999"
            style={[
              styles.input,
              errors.degree && styles.inputError,
            ]}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.degree && (
        <Text style={styles.errorText}>
          {errors.degree.message}
        </Text>
      )}

      <Controller
        control={control}
        name="year"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Enter Year"
            placeholderTextColor="#999"
            style={[
              styles.input,
              errors.year && styles.inputError,
            ]}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.year && (
        <Text style={styles.errorText}>
          {errors.year.message}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          selectedEducation
            ? styles.updateButton
            : styles.addButton,
        ]}
        onPress={handleSubmit(handleCreateEducation)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {selectedEducation
              ? "Update Education"
              : "Add Education"}
          </Text>
        )}
      </TouchableOpacity>

      {selectedEducation && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            setSelectedEducation(null);

            reset({
              college: "",
              degree: "",
              year: "",
            });
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      )}

      <View style={styles.listContainer}>
        {data?.result?.map((item: any, index: number) => (
          <View
            key={item._id?.toString() || index.toString()}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>
              {item.college}
            </Text>

            <Text style={styles.cardText}>
              Degree: {item.degree}
            </Text>

            <Text style={styles.cardText}>
              Year: {item.year}
            </Text>

            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  handleDeleteEducation({
                    id: item._id as number,
                  })
                }
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Education;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 4,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  addButton: {
    backgroundColor: "#007bff",
  },

  updateButton: {
    backgroundColor: "#f39c12",
  },

  cancelButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  listContainer: {
    marginTop: 30,
  },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#000",
  },

  cardText: {
    fontSize: 15,
    marginBottom: 4,
    color: "#333",
  },

  actionContainer: {
    flexDirection: "row",
    marginTop: 15,
  },

  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginRight: 10,
  },

  editButton: {
    backgroundColor: "#f39c12",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});