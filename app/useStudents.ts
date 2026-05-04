"use client";
import { useQuery, useMutation } from "@tanstack/react-query";

type Student = {
  id: number;
  name: string;
  email: string;
};

export const fetchStudents = async () => {
  const response = await fetch("/api/students");
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
};

export const useStudents = () => {
  return useQuery<Student[]>({
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

const createTable = async () => {
  const response = await fetch("/api/students", { method: "PUT" });

  if (!response.ok) {
    throw new Error("Failed to create table");
  }
  return response.json();
};

export const useCreateTable = () => {
  return useMutation({
    mutationFn: createTable,
  });
};
