import localforage from "localforage";
import { fontNames, selectedFont } from "./store";

export default function FontPicker() {
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
