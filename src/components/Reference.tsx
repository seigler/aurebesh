import DualText from "./DualText";
import { ligatures, lowercase } from "./store";

export default function Reference() {
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
