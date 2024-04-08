import DualText from "./DualText";
import { ligatures, lowercase } from "./store";

export default function Reference() {
  return (
    <aside class="reference">
      <DualText
        text={
          lowercase.value
            ? "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz"
            : "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
        }
      />
      <DualText text="0 1 2 3 4 5 6 7 8 9" />
      {ligatures.value.length > 0 && (
        <DualText text={ligatures.value.join(" ")} />
      )}
      <DualText text={`, . ? ! : ; ' " ( )`} />
    </aside>
  );
}
