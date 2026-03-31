import { IBuildOrder } from "./types";

export const defaultBuildOrders: { [id: string]: IBuildOrder } = {
  "2": {
    name: "23 pop Arcieri",
    attribution: "Cicero",
    id: "2",
    icon: "archer",
    steps: [
      { kind: "build", build: "house", buildAmount: 2, from: "nothing", number: 3, target: "sheep" },
      { kind: "create", number: 3, target: "sheep" },
      { kind: "create", target: "wood", number: 4 },
      { kind: "create", target: "boar" },
      { kind: "build", from: "villager", build: "house", buildAmount: 2, target: "berries" },
      { kind: "build", from: "villager", build: "mill", target: "berries" },
      { kind: "create", target: "berries" },
      { kind: "move", from: "boar", target: "boar", targetText: "2", duringPrevious: true },
      { kind: "create", target: "berries" },
      { kind: "create", target: "boar", number: 2 },
      { kind: "move", from: "boar", target: "farm", duringPrevious: true },
      { kind: "create", target: "wood", number: 5 },
      { kind: "loom" },
      { kind: "move", from: "sheep", target: "wood", number: 2 },
      { kind: "move", from: "sheep", target: "gold", number: 3 },
      { kind: "age2" },
      { kind: "build", build: "barracks", from: "wood", target: "builder", duringPrevious: true },
      { kind: "research", techs: ["doublebitaxe", "horsecollar"] },
      { kind: "create", target: "gold", number: 3 },
      { kind: "build", from: "berries", build: "range", buildAmount: 2, number: 2, target: "gold", duringPrevious: true },
      { kind: "build", from: "builder", build: "blacksmith", duringPrevious: true },
      { kind: "create", target: "farm", number: 10 },
      { kind: "move", from: "berries", target: "farm", number: 2, duringPrevious: true },
      { kind: "wheelbarrow" },
      { kind: "create", target: "farm", number: 2 },
      { kind: "age3" },
    ],
  }
};