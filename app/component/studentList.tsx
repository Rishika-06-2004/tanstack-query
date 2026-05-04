"use client";
import { useState } from "react";
import { useStudents, useAddStudent } from "../useStudents";

type Student = {
  id: number;
  name: string;
  email: string;
};

export const StudentList = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data, isLoading, error, refetch } = useStudents();
  const mutation = useAddStudent();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    await mutation.mutateAsync({ name, email });

    refetch();
    setName("");
    setEmail("");
  };

  return (
    <div>
      <h1 className="flex justify-center">Students Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student: Student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      <div>
        <form onSubmit={handleSubmit}>
          <label>Name : </label>
          <input
            type="string"
            placeholder="Enter your name "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />

          <label>Email : </label>
          <input
            type="string"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
