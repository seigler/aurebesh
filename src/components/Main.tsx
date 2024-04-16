import localforage from "localforage";
import { useEffect } from "preact/hooks";
import { selectedFont } from "./store";
import ReadingBox from "./ReadingBox";
import Reference from "./Reference";
import FontPicker from "./FontPicker";
import DualText from "./DualText";
import Drawer from "./Drawer";

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
          <DualText text="Learn Aurebesh" />
        </h1>
      </header>
      <main>
        <div class="content">
          <ReadingBox />
        </div>
      </main>
      <footer>
        <Drawer>
          <Reference />
          <FontPicker />
        </Drawer>
      </footer>
    </>
  );
}
