import { useSignal } from "@preact/signals";
import localforage from "localforage";
import { useEffect } from "preact/hooks";
import DualText from "./DualText";

export default function ReadingBox() {
  const isEditing = useSignal(false);
  const contents =
    useSignal(`It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.

During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.

Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy...`);
  useEffect(() => {
    localforage
      .getItem("aurebesh-text")
      .then((value) => {
        if (value != null) {
          contents.value = `${value}`;
        }
      })
      .catch((error) => {
        console.warn("Couldn't fetch stored text: ", error);
      });
  }, []);
  return (
    <div class="readingbox">
      <span>
        <label>
          Edit{" "}
          <input
            type="checkbox"
            id="edit-toggle"
            selected={isEditing}
            onChange={(event) => {
              isEditing.value = event.currentTarget.checked;
            }}
          />
        </label>
      </span>
      {isEditing.value && (
        <textarea
          class="readingbox-textarea"
          id="reading-material"
          value={contents}
          onChange={(event) => {
            const newValue = event.currentTarget.value;
            contents.value = newValue;
            localforage.setItem("aurebesh-text", newValue);
          }}
          spellCheck={false}
        />
      )}
      <div class="readingbox-text aurebesh">
        <DualText text={contents.value} hover />
      </div>
    </div>
  );
}
