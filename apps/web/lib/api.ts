export type User = { id: string; name: string; email: string; verified: boolean };
export class ApiError extends Error {
  constructor(message: string, public status: number, public fields: Record<string, string[]> = {}, public retryAfter?: number) { super(message); }
}
export async function api<T>(path: string, body?: unknown): Promise<T> {
  let response: Response;
  try { response = await fetch(`/api${path}`, { method: body === undefined ? 'GET' : 'POST', headers: { 'Content-Type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }), credentials: 'same-origin', cache: 'no-store' }); }
  catch { throw new ApiError('No pudimos conectar. Revisa tu conexión e inténtalo otra vez.', 0); }
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(typeof result.message === 'string' ? result.message : 'No pudimos completar la solicitud. Inténtalo otra vez.', response.status, result.fields || {}, result.retryAfter);
  return result as T;
}
