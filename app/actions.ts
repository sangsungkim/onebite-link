"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchOpenGraph } from "@/lib/open-graph";
import { createClient } from "@/utils/supabase/server";

export async function createFolder(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const supabase = createClient(await cookies());
  const { error } = await supabase.from("folders").insert({ name });
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
}

export async function createLink(formData: FormData) {
  const url = String(formData.get("url") ?? "").trim();
  const folderId = String(formData.get("folderId") ?? "");
  if (!url || !/^\d+$/.test(folderId)) return;

  let og;
  try {
    og = await fetchOpenGraph(url);
  } catch {
    og = { title: url, description: "", thumbnail: "", url };
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.from("links").insert({
    url: og.url,
    title: og.title,
    description: og.description || null,
    thumbnail_url: og.thumbnail || null,
    folder_id: folderId,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect(`/folder/${folderId}`);
}

export async function updateLink(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const folderId = String(formData.get("folderId") ?? "");
  if (!title || !/^\d+$/.test(id) || !/^\d+$/.test(folderId)) return;

  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("links")
    .update({
      title,
      description: description || null,
      folder_id: folderId,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
}

export async function deleteLink(id: string) {
  if (!/^\d+$/.test(id)) return;

  const supabase = createClient(await cookies());
  const { error } = await supabase.from("links").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
}

export async function updateFolder(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("folders")
    .update({ name })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
}

export async function deleteFolder(id: string, redirectHome = false) {
  const supabase = createClient(await cookies());
  const { error } = await supabase.from("folders").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  if (redirectHome) redirect("/");
}
