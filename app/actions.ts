"use server";

import { revalidatePath } from "next/cache";
import { folders, links } from "@/lib/mock-data";

export async function createFolder(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  folders.push({ id: crypto.randomUUID(), name, count: 0 });
  revalidatePath("/", "layout");
}

export async function deleteFolder(id: string) {
  const index = folders.findIndex((folder) => folder.id === id);
  if (index === -1) return;

  folders.splice(index, 1);
  for (let i = links.length - 1; i >= 0; i--) {
    if (links[i].folderId === id) links.splice(i, 1);
  }
  revalidatePath("/", "layout");
}
