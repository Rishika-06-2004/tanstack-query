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
      <h1 className="flex justify-center font-bold underline text-5xl">
        Students Data
      </h1>
      <br />
      <div className="flex justify-center">
        <table className="border-2">
          <thead>
            <tr>
              <th className="border-2">ID</th>
              <th className="border-2">Name</th>
              <th className="border-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student: Student) => (
              <tr key={student.id}>
                <td className="border-2">{student.id}</td>
                <td className="border-2">{student.name}</td>
                <td className="border-2">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <h1 className="flex justify-center font-bold text-xl">ADD STUDENT</h1>
      <div className="flex justify-center py-10">
        <form onSubmit={handleSubmit} className="border-2 px-3 py-3">
          <label>Name : </label>
          <input
            type="string"
            placeholder="Enter your name "
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2"
          />
          <br />
          <br />

          <label>Email : </label>
          <input
            type="string"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2"
          />
          <br />
          <button type="submit" className="border-2 rounded px-5 mt-3 mx-20">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
