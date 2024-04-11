import { ligatures } from "./store";

export default function DualText({
  text,
  hover = false,
}: {
  text: string;
  hover?: boolean;
}) {
  const words: string[] = [];
  text.split(/\n/).forEach((line, index, lines) => {
    line.split(/\b(?=\w)/).forEach((word) => {
      words.push(word);
    });
    if (index < lines.length - 1) {
      words.push("\n");
    }
  });
  const currentLigatures = ligatures.value;

  return (
    <span>
      {words.map((word) => {
        if (word === "\n") {
          return <br />;
        }
        const letters: string[] = [];
        for (let i = 0; i < word.length; i += 1) {
          const nextTwoCharacters = word.slice(i, i + 2);
          if (currentLigatures.includes(nextTwoCharacters.toLowerCase())) {
            letters.push(nextTwoCharacters);
            i += 1;
          } else {
            letters.push(nextTwoCharacters[0]);
          }
        }
        return (
          <span class="dualtext-word aurebesh">
            {word}
            <div class="dualtext-help" data-hover={hover}>
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
