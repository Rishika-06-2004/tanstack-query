"use client";
import { useQuery, useMutation } from "@tanstack/react-query";

export const fetchStudents = async () => {
  const response = await fetch("/api/students");
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
};

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });
};

const addStudent = async (student: { name: string; email: string }) => {
  const response = await fetch("/api/students", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to add student");
  }

  return response.json();
};

export const useAddStudent = () => {
  return useMutation({
    mutationFn: addStudent,
  });
};
