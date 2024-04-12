import { computed, effect, signal } from "@preact/signals";

export const fonts: Record<
  string,
  { ligatures: string[]; lowercase: boolean }
> = {
  "AB-Equinox": {
    ligatures: ["ch", "sh", "th", "ae", "eo", "kh", "ng", "oo"],
    lowercase: false,
  },
  "FT Aurebesh": {
    ligatures: [],
    lowercase: false,
  },
  "FT Aurebesh ligatures": {
    ligatures: ["ch", "sh", "th", "ae", "eo", "kh", "ng", "oo"],
    lowercase: false,
  },
  Aurebesh_Rodian: {
    ligatures: [],
    lowercase: false,
  },
  "AurebeshTypewriter-Regular": {
    ligatures: [],
    lowercase: true,
  },
  Droidobesh: {
    ligatures: [],
    lowercase: false,
  },
  LaptiNekAF: {
    ligatures: [],
    lowercase: false,
  },
  Maulobesh: {
    ligatures: [],
    lowercase: false,
  },
  Nirvanabesh: {
    ligatures: [],
    lowercase: false,
  },
  Skyhook: {
    ligatures: [],
    lowercase: false,
  },
};

export const fontNames = Object.keys(fonts);

export const selectedFont = signal("FT Aurebesh");
effect(() => {
  if (typeof window !== "undefined") {
    document.documentElement.style.setProperty(
      "--font-aurebesh",
      selectedFont.value
    );
  }
});
export const ligatures = computed(() => {
  return fonts[selectedFont.value].ligatures;
});
export const lowercase = computed(() => {
  return fonts[selectedFont.value].lowercase;
});
