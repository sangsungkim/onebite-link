"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { folders, links } from "@/lib/mock-data";
import { fetchOpenGraph } from "@/lib/open-graph";

export async function createFolder(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  folders.push({ id: crypto.randomUUID(), name, count: 0 });
  revalidatePath("/", "layout");
}

export async function createLink(formData: FormData) {
  const url = String(formData.get("url") ?? "").trim();
  const folderId = String(formData.get("folderId") ?? "");
  const folder = folders.find((folder) => folder.id === folderId);
  if (!url || !folder) return;

  let og;
  try {
    og = await fetchOpenGraph(url);
  } catch {
    og = { title: url, description: "", thumbnail: "", url };
  }

  links.push({
    id: crypto.randomUUID(),
    title: og.title,
    description: og.description,
    url: og.url,
    thumbnail: og.thumbnail,
    folderId,
  });
  folder.count += 1;
  revalidatePath("/", "layout");
  redirect(`/folder/${folderId}`);
}

export async function deleteLink(id: string) {
  const index = links.findIndex((link) => link.id === id);
  if (index === -1) return;

  const [link] = links.splice(index, 1);
  const folder = folders.find((folder) => folder.id === link.folderId);
  if (folder) folder.count = Math.max(0, folder.count - 1);
  revalidatePath("/", "layout");
}

export async function updateFolder(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const folder = folders.find((folder) => folder.id === id);
  if (!folder) return;

  folder.name = name;
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
