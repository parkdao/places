import { me } from "../store/near";

export async function fetchMedia(id, url) {
  if (!id || !url) return;
  try {
    const r = await fetch(url);
    const blob = await r.blob();
    const data = await blobToBase64(blob);
    me.update((m) => ({
      ...m,
      nfts: m.nfts.map((n) => {
        if (n.token_id === id) return { ...n, data };
        return n;
      }),
    }));
  } catch (E) {
    console.error(E);
  }
}

export function blobToBase64(blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
