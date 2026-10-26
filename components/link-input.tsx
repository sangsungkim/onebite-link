export default function LinkInput() {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      링크
      <input
        type="url"
        name="url"
        placeholder="https://example.com"
        required
        className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 font-normal outline-none focus:border-foreground dark:border-zinc-700"
      />
    </label>
  );
}
