import { hydrate, prerender as ssr } from "preact-iso";

import "./style.css";
import Main from "./components/Main";

export function App() {
  return <Main />;
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
