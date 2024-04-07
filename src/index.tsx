import { hydrate, prerender as ssr } from "preact-iso";

import "./style.css";
import { computed, effect, signal, useSignal } from "@preact/signals";

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
  document.documentElement.style.setProperty(
    "--font-aurebesh",
    selectedFont.value
  );
});
const ligatures = computed(() => {
  return fonts[selectedFont.value].ligatures;
});
const lowercase = computed(() => {
  return fonts[selectedFont.value].lowercase;
});

export function App() {
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

function ReadingBox() {
  const isEditing = useSignal(false);
  const contents =
    useSignal(`It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.

During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.

Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy...`);
  return (
    <div class="readingbox">
      <span>
        <label htmlFor="edit-toggle">Edit</label>
        <input
          type="checkbox"
          id="edit-toggle"
          selected={isEditing}
          onChange={(event) => {
            isEditing.value = event.currentTarget.checked;
          }}
        />
      </span>
      {isEditing.value ? (
        <textarea
          class="readingbox-textarea"
          id="reading-material"
          value={contents}
          onChange={(event) => {
            contents.value = event.currentTarget.value;
          }}
          spellCheck={false}
        />
      ) : (
        <div class="readingbox-text aurebesh">
          <DualText>{contents.value}</DualText>
        </div>
      )}
    </div>
  );
}

function FontPicker() {
  return (
    <select
      onChange={(event) => {
        selectedFont.value = event.currentTarget.value;
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

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
