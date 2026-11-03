import { createUserClient } from "@/utils/supabase/server";
import type { Link } from "./mock-data";

export type FolderOption = { id: string; name: string };

export async function getFolders(): Promise<FolderOption[]> {
  const { supabase, userId } = await createUserClient();
  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });
  if (error) throw new Error(error.message);

  return data.map((folder) => ({ id: String(folder.id), name: folder.name }));
}

export async function getLinks(folderId?: string): Promise<Link[]> {
  const { supabase, userId } = await createUserClient();
  let query = supabase
    .from("links")
    .select("id, url, title, description, thumbnail_url, folder_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });
  if (folderId !== undefined) query = query.eq("folder_id", folderId);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return data.map((row) => ({
    id: String(row.id),
    title: row.title ?? row.url,
    description: row.description ?? "",
    url: row.url,
    folderId: row.folder_id === null ? "" : String(row.folder_id),
    thumbnail: row.thumbnail_url ?? undefined,
  }));
}
