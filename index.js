import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";

const program = new Command();
const filePath = "./course.json";

program
  .name("CLI-PROJECT")
  .description("CLI to some JavaScript string utilities")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .description("add course")
  .action((params, options) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "what is your course title?",
        },
        {
          type: "number",
          name: "price",
          message: "what is price of course?",
        },
      ])
      .then((answers) => {
        // console.log(answers);
        if (fs.existsSync(filePath)) {
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              console.log(err);
              process.exit();
            }
            console.log("file content", data);
            const fileContentAsJson = JSON.parse(data);
            fileContentAsJson.push(answers);
            fs.writeFile(
              filePath,
              JSON.stringify(fileContentAsJson),
              "utf8",
              () => {
                console.log("course add sucssesfully");
              }
            );
          });
        } else {
          fs.writeFile(filePath, JSON.stringify([answers]), "utf8", () => {
            console.log("course add sucssesfully");
          });
        }
      });
  });

program
  .command("list")
  .alias("l")
  .description("show all courses")
  .action(() => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        process.exit();
      } else {
        console.table(JSON.parse(data));
      }
    });
  });

program.parse(process.argv);

//______________________________________________________________________________________________________________
// console.log(process.argv);
// if (process.argv[2] === "add") {
//   console.log("you are going to add course name", process.argv[3]);
// }
// program
//   .name("CLI-PROJECT")
//   .description("CLI to some JavaScript string utilities")
//   .version("1.0.0");

// program
//   .command("add")
//   .alias("a")
//   .description("add course")
//   .argument("<title>", "this is title")
//   .option("--price <price>", "display just the first substring")
//   .action((params, options) => {
//     console.log("params", "option", params, options);
//   });

// program
//   .command("list")
//   .alias("l")
//   .description("show all courses")
//   .action(() => {
//     console.log("Courses");
//   });

// program.parse(process.argv);
