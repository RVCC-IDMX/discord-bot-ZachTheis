import { say } from 'cowsay';

export default function () {
  let output: string = say({
    text: 'Good luck on your midterms!',
    r: true,
  });
  output = `
        \`\`\`${output}
      \`\`\`
      `;
  if (output.length > 2000) {
    output = 'The cows are too big for the barn.';
  }
  return output;
}
