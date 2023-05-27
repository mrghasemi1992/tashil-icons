import * as Icons from "./index.js"

// this will create a list at runtime with the types based on the export: "Foo" | "Bar"
export type IconTypes = keyof typeof Icons;