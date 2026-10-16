import { languages, type Language } from "./dictionaries";

const STORAGE_KEY = "portfolio-lang";
const DEFAULT_LANGUAGE: Language = "es";

let listeners: Array<() => void> = [];
let cached: Language | null = null;

function isLanguage(value: string | null): value is Language {
  return value !== null && (languages as readonly string[]).includes(value);
}

function getSnapshot(): Language {
  if (cached !== null) return cached;

  const stored =
    typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_KEY)
      : null;

  cached = isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  return cached;
}

function getServerSnapshot(): Language {
  return DEFAULT_LANGUAGE;
}

function subscribe(listener: () => void) {
  listeners.push(listener);

  // Sincroniza entre pestañas abiertas.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cached = isLanguage(event.newValue) ? event.newValue : DEFAULT_LANGUAGE;
    listener();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners = listeners.filter((item) => item !== listener);
    window.removeEventListener("storage", onStorage);
  };
}

function setLanguage(next: Language) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // localStorage puede no estar disponible (modo privado estricto).
  }
  listeners.forEach((listener) => listener());
}

export { getServerSnapshot, getSnapshot, setLanguage, subscribe };
