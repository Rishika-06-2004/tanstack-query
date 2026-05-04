const students = [
  {
    id: 1,
    name: "Riya Sharma",
    email: "riya@gmail.com",
  },

  {
    id: 2,
    name: "Arjun Das",
    email: "arjun@gmail.com",
  },

  {
    id: 3,
    name: "Sneha Roy",
    email: "sneha@gmail.com",
  },

  {
    id: 4,
    name: "Rahul Sen",
    email: "rahul@gmail.com",
  },

  {
    id: 5,
    name: "Priya Mondal",
    email: "priya@gmail.com",
  },
];

export async function GET() {
  return Response.json(students);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newStudent = {
    id: students.length + 1,
    name: body.name,
    email: body.email,
  };
  students.push(newStudent);
  return Response.json(newStudent);
}
