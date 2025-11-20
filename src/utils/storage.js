export function getArrayFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addToArrayInStorage(key, item) {
  const current = getArrayFromStorage(key);
  const updated = [...current, item];
  localStorage.setItem(key, JSON.stringify(updated));
}

export function updateItemInArrayInStorage(key, id, updater) {
  const current = getArrayFromStorage(key);
  const updated = current.map((item) =>
    item.id === id ? updater(item) : item
  );
  localStorage.setItem(key, JSON.stringify(updated));
}
