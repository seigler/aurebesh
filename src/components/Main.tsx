import { computed, effect, signal } from "@preact/signals";
import localforage from "localforage";
import { useEffect } from "preact/hooks";
import ReadingBox from "./ReadingBox";

const fonts: Record<string, { ligatures: string[]; lowercase: boolean }> = {
  "AB-Equinox": {
    ligatures: ["ch", "sh", "th", "ae", "eo", "kh", "ng", "oo"],
    lowercase: false,
  },
  "AurebeshAF-Canon": {
    ligatures: [],
    lowercase: false,
  },
  "AurebeshAF-CanonTech": {
    ligatures: [],
    lowercase: false,
  },
  "AurebeshAF-Legends": {
    ligatures: ["ch", "sh", "th", "ae", "eo", "kh", "ng", "oo"],
    lowercase: false,
  },
  "AurebeshAF-LegendsTech": {
    ligatures: ["ch", "sh", "th", "ae", "eo", "kh", "ng", "oo"],
    lowercase: false,
  },
  "Aurebesh_Rodian-Oblique": {
    ligatures: [],
    lowercase: false,
  },
  "Aurebesh_Rodian-OblqOutline": {
    ligatures: [],
    lowercase: false,
  },
  Aurebesh_Rodian: {
    ligatures: [],
    lowercase: false,
  },
  "Aurebesh_Rodian-Outline": {
    ligatures: [],
    lowercase: false,
  },
  "AurebeshTypewriter-Light": {
    ligatures: [],
    lowercase: true,
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

const fontNames = Object.keys(fonts);

const selectedFont = signal("AurebeshAF-Legends");
effect(() => {
  if (typeof window !== "undefined") {
    document.documentElement.style.setProperty(
      "--font-aurebesh",
      selectedFont.value
    );
  }
});
const ligatures = computed(() => {
  return fonts[selectedFont.value].ligatures;
});
const lowercase = computed(() => {
  return fonts[selectedFont.value].lowercase;
});

export default function Main() {
  useEffect(() => {
    localforage
      .getItem("aurebesh-font")
      .then((value) => {
        if (value != null) {
          selectedFont.value = `${value}`;
        }
      })
      .catch((error) => {
        console.warn("Couldn't fetch font preference: ", error);
      });
  }, []);
  return (
    <>
      <header>
        <h1>
          <DualText>Learn Aurebesh</DualText>
        </h1>
      </header>
      <main>
        <div class="content">
          <FontPicker />
          <ReadingBox />
        </div>
        <Reference />
      </main>
    </>
  );
}

function FontPicker() {
  return (
    <select
      onChange={(event) => {
        const newValue = event.currentTarget.value;
        selectedFont.value = newValue;
        localforage.setItem("aurebesh-font", newValue);
      }}
    >
      {fontNames.map((font) => {
        return (
          <option value={font} selected={font === selectedFont.value}>
            {font}
          </option>
        );
      })}
    </select>
  );
}

function DualText({ children }: { children: string }) {
  const words: string[] = [];
  children.split(/\n/).forEach((line, index, lines) => {
    line.split(/\b(?=\w)/).forEach((word) => {
      words.push(word);
    });
    if (index < lines.length - 1) {
      words.push("\n");
    }
  });
  return (
    <span>
      {words.map((word) => {
        if (word === "\n") {
          return <br />;
        }
        const letters: string[] = [];
        for (let i = 0; i < word.length; i += 1) {
          const nextTwoCharacters = word.slice(i, i + 2);
          if (ligatures.value.includes(nextTwoCharacters.toLowerCase())) {
            letters.push(nextTwoCharacters);
            i += 1;
          } else {
            letters.push(nextTwoCharacters[0]);
          }
        }
        return (
          <span class="dualtext-word">
            <span class="aurebesh">{word}</span>
            <div className="dualtext-help">
              {letters.map((character) => {
                return <span data-character={character} />;
              })}
            </div>
          </span>
        );
      })}
    </span>
  );
}

function Reference() {
  return (
    <aside class="reference">
      <DualText>
        {lowercase.value ? "Aa Bb Cc Dd Ee Ff Gg Hh Ii" : "A B C D E F G H I"}
      </DualText>
      <DualText>
        {lowercase.value ? "Jj Kk Ll Mm Nn Oo Pp Qq Rr" : "J K L M N O P Q R"}
      </DualText>
      <DualText>
        {lowercase.value ? "Ss Tt Uu Vv Ww Xx Yy Zz" : "S T U V W X Y Z"}
      </DualText>
      <DualText>0 1 2 3 4 5 6 7 8 9</DualText>
      {ligatures.value.length > 0 && (
        <DualText>{ligatures.value.join(" ")}</DualText>
      )}
      <DualText>{`, . ? ! : ; ' " ( )`}</DualText>
    </aside>
  );
}
