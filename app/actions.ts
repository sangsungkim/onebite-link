"use server";

import { revalidatePath } from "next/cache";
import { folders } from "@/lib/mock-data";

export async function createFolder(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  folders.push({ id: crypto.randomUUID(), name, count: 0 });
  revalidatePath("/", "layout");
}
