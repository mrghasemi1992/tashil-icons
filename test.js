import { readdirSync, readFileSync } from "fs";
import { load } from "cheerio";

const directories = ["outline"];
let errors = 0;

directories.forEach((dir) =>
  readdirSync(dir).forEach((file) => {
    const viewBox = load(readFileSync(`${dir}/${file}`))("svg").attr("viewBox");
    if (viewBox !== "0 0 24 24") {
      console.error(
        `Error: \`${dir}/${file}\` has a viewBox of \x1b[31m\`${viewBox}\`\x1b[0m`
      );
      errors++;
    }
  })
);

if (errors > 0) {
  process.exit(1);
} else {
  console.log("Tests passed!");
}
