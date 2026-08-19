export type Partner = {
  /** File name, used as the React key. */
  id: string;
  imageUrl: string;
};

/**
 * Partner logos come from public/images/partners/ — NOT the backend — so
 * that dropping a new logo file in that folder and redeploying is enough to
 * make it appear, no code change needed. manifest.json in that same folder
 * lists whatever is currently there; it's regenerated on every dev-server
 * start/build by vite-plugin-image-manifest.ts.
 */
export async function fetchPartners(): Promise<Partner[]> {
  const response = await fetch('/images/partners/manifest.json');
  if (!response.ok) return [];
  const files: string[] = await response.json();
  return files.map((file) => ({ id: file, imageUrl: `/images/partners/${file}` }));
}
