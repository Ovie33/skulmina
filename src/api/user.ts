import httpClient from "@/lib/httpClient";

export async function createUser(data: Record<string, any>) {
  return (await httpClient.post("/users", data)).data;
}

export async function getUsers(id?: string | number) {
  const examId = id ? `/${id}` : ``;
  return (await httpClient.get("/users" + examId)).data;
}

export async function updateUser(
  id: string | number,
  data: Record<string, any>
) {
  const examId = id ? `/${id}` : ``;
  return (await httpClient.put("/users" + examId, data)).data;
}

export async function deleteUser(id: string | number) {
  const examId = id ? `/${id}` : ``;
  return (await httpClient.delete("/users" + examId)).data;
}
