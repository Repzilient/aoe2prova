import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faLongArrowAltDown,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";
import { StepRenderer, IBuildOrderStep, StepStringRenderer } from "./types";
import BuildOrderIcon from "./StepIcon";
import { speedBonuses } from "./Settings";

const kindMapping: { [id: string]: StepRenderer } = {
  create: (step) => {
    const target = step.target ? (
      <BuildOrderIcon icon={step.target} text={step.targetText} />
    ) : null;
    const number = step.number ? (
      <span className="number">x {step.number}</span>
    ) : null;
    return (
      <>
        <BuildOrderIcon icon={step.femaleVillager ? "villagerf" : "villager"} />
        {number}
        <FontAwesomeIcon icon={faCaretRight} />
        {target}
      </>
    );
  },
  move: (step) => {
    const number = step.number ? (
      <span className="number">x {step.number}</span>
    ) : null;
    const fromIcon =
      step.from === "villager" && step.femaleVillager ? "villagerf" : step.from;
    const from =
      step.from && step.from !== "nothing" ? (
        <BuildOrderIcon icon={fromIcon} />
      ) : null;
    return (
      <>
        {from}
        {number}
        <FontAwesomeIcon icon={faCaretRight} />
        <BuildOrderIcon icon={step.target || "sheep"} text={step.targetText} />
      </>
    );
  },
  build: (step) => {
    let target =
      step.target && step.target !== "nothing" ? (
        <BuildOrderIcon icon={step.target} text={step.targetText} />
      ) : null;
    const createAmount =
      step.number && step.number > 1 ? (
        <span className="number">{` x ${step.number}`}</span>
      ) : null;
    const fromIcon =
      step.from === "villager" && step.femaleVillager ? "villagerf" : step.from;
    const from =
      step.from && step.from !== "nothing" ? (
        <>
          <BuildOrderIcon icon={fromIcon} />
          {createAmount}
          <FontAwesomeIcon icon={faCaretRight} />
        </>
      ) : null;
    if ((!step.from || step.from === "nothing") && step.target && step.number) {
      target = (
        <>
          {target}
          {createAmount}
        </>
      );
    }
    return (
      <>
        {from}
        <BuildOrderIcon icon={step.build || "house"} text={step.buildAmount} />
        {target && <FontAwesomeIcon icon={faCaretRight} />}
        {target}
      </>
    );
  },
  research: (step) => {
    const techs = (step.techs || []).map((tech) => {
      return <BuildOrderIcon key={tech} icon={tech} />;
    });
    return <>{techs}</>;
  },
  note: (step) => {
    return <div className="note">{step.note}</div>;
  },
  default: (step) => {
    return (
      <>
        <BuildOrderIcon icon={step.kind} />
      </>
    );
  },
};

function randomFromArray<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

const specialSpeechTexts: { [id: string]: string } = {
  villager: "abitante del villaggio",
  villagerf: "abitante del villaggio",
  age2: "età feudale",
  mango: "mangano",
  unique: "unità unica",
  manatarmsupgrade: "fanteria leggera",
  pikemanupgrade: "picchiere",
  crossbowupgrade: "balestriere",
  "elite skirmisherupgrade": "tiratore d'elite",
  "eagel warriorupgrade": "guerriero aquila",
  age4: "età imperiale",
  doublebitaxe: "scure a doppio taglio",
  manatarms: "fanteria leggera",
  eaglescout: "aquila esploratrice",
  age3: "età dei castelli",
  horsecollar: "collare",
  miningcamp: "campo minerario",
  siegeworkshop: "laboratorio d'assedio",
  tc: "centro città",
  lumbercamp: "falegnameria",
  demo: "nave da demolizione",
  ca: "arciere a cavallo",
  sheep: "pecora",
  berries: "bacche",
  farm: "fattoria",
  boar: "cinghiale",
  secondboar: "secondo cinghiale",
  food: "cibo",
  mill: "mulino",
  deer: "cervo",
  fish: "pesce",
  wood: "legna",
  tree: "albero",
  gold: "oro",
  stone: "pietra",
  house: "casa",
  barracks: "alloggiamento",
  stable: "scuderia",
  range: "campo di tiro con l'arco",
  market: "mercato",
  blacksmith: "fabbro",
  dock: "porto",
  monastery: "monastero",
  castle: "castello",
  university: "università",
  krepost: "krepost",
  tower: "torre di guardia",
  militia: "milizia",
  knight: "cavaliere",
  skirmisher: "schermagliatore",
  archer: "arciere",
  scout: "scout",
  "light cav": "cavalleria leggera",
  elephant: "elefante",
  galley: "galea",
  lancer: "lanciere",
  fishingship: "nave da pesca",
  ram: "ariete",
  camel: "cammello",
  fireship: "nave incendiaria",
  scorpion: "scorpione",
  monk: "monaco",
  spear: "lanciere",
  ballistics: "balistica",
  builder: "costruttore",
  chemistry: "chimica",
  fletching: "impennatura",
  forging: "forgiatura",
  bodkin: "freccia a punteruolo",
  "scale barding": "bardatura a scaglie",
  "scale mail": "cotta a scaglie",
  "padded armor": "armatura imbottita",
  "silver crown": "corona d'argento",
  "gold crown": "corona d'oro",
  nothing: "niente",
};

export const foodIcons = [
  "sheep",
  "berries",
  "farm",
  "boar",
  "secondboar",
  "food",
  "mill",
  "deer",
  "fish",
];
export const woodIcons = ["wood", "tree", "lumbercamp"];

function getIconText(icon: string): string {
  const special = specialSpeechTexts[icon];
  if (special) {
    return special;
  }
  return icon;
}

function replaceVariablesInText(text: string, variables: any): string {
  let result = text;
  Object.keys(variables).forEach((key) => {
    const valueText = getIconText(variables[key]);
    result = result.split(`$${key}`).join(valueText);
  });
  result = result.split("spostalo su costruttore").join("fallo costruttore");
  result = result.split("spostali su costruttore").join("falli costruttori");
  result = result
    .split("Sposta un abitante del villaggio da cinghiale a cinghiale")
    .join("attira il secondo cinghiale");
  return result;
}

const kindMessageMapping: { [id: string]: StepStringRenderer } = {
  create: (step) => {
    let message;
    if (step.number && step.number > 1) {
      const taskNtoResource = randomFromArray([
        "I prossimi $number abitanti del villaggio dovrebbero andare su $target",
        "Manda i prossimi $number abitanti del villaggio su $target",
      ]);
      message = replaceVariablesInText(taskNtoResource, {
        target: step.target,
        number: step.number,
      });
    } else {
      const task1toResource = randomFromArray([
        "Il prossimo abitante del villaggio dovrebbe andare su $target",
        "Manda il prossimo abitante del villaggio su $target",
      ]);
      message = replaceVariablesInText(task1toResource, {
        target: step.target,
      });
    }
    return message;
  },
  move: (step) => {
    let message;
    if (step.number && step.number > 1) {
      const taskNtoResource = randomFromArray([
        "Sposta $number abitanti del villaggio da $from a $target",
      ]);
      message = replaceVariablesInText(taskNtoResource, {
        target: step.target,
        from: step.from,
        number: step.number,
      });
    } else {
      const task1toResource = randomFromArray([
        "Sposta un abitante del villaggio da $from a $target",
      ]);
      message = replaceVariablesInText(task1toResource, {
        from: step.from,
        target: step.target,
      });
    }
    return message;
  },
  build: (step) => {
    let message;
    if (step.from && ["villager", "villagerf"].indexOf(step.from) >= 0) {
      message = "il prossimo abitante del villaggio dovrebbe costruire";
    } else if (step.from && ["nothing", "builder"].indexOf(step.from) < 0) {
      if (step.number && step.number > 1) {
        message = "ordina a $number abitanti del villaggio da $from di costruire";
      } else {
        message = "ordina a un abitante del villaggio da $from di costruire";
      }
    } else if (step.number && step.number > 1) {
      message = "$number abitanti del villaggio dovrebbero costruire";
    } else {
      message = "costruisci";
    }
    if (step.buildAmount && step.buildAmount > 1) {
      message = `${message} ${step.buildAmount}`;
    } else {
      message = `${message} $anOrA`;
    }
    if (step.buildAmount && step.buildAmount > 1) {
      message = `${message} $builds`;
    } else {
      message = `${message} $build`;
    }
    if (step.target && step.target !== "nothing") {
      message = `${message}. Poi sposta su $target`;
    }
    return replaceVariablesInText(message, {
      from: step.from,
      target: step.target,
      number: step.number,
      anOrA: "aoeiuy".indexOf(step.build?.charAt(0) || "z") > 0 ? "un" : "un", // Simplified "an" or "a" in italian to "un", this works mostly.
      build: step.build || "house",
    });
  },
  research: (step) => {
    return `ricerca ${(step.techs || []).map(getIconText).join(",")}`;
  },
  wheelbarrow: (step) => {
    return `ricerca carriola`;
  },
  age2: (step) => {
    return `passa all'età feudale`;
  },
  age3: (step) => {
    return `passa all'età dei castelli`;
  },
  age4: (step) => {
    return `passa all'età imperiale`;
  },
  loom: (step) => {
    return `ricerca telaio`;
  },
  note: (step) => {
    return step.note || "nota mancante";
  },
  default: (step) => {
    return "prossimo passaggio";
  },
};

export function getMessageForStep(step: IBuildOrderStep): string {
  let renderer = kindMessageMapping[step.kind];
  if (!renderer) {
    renderer = kindMessageMapping["default"];
  }
  let message = renderer(step);
  if (step.subSteps && step.subSteps.length > 0) {
    message += "\n. Nel frattempo, ";
    step.subSteps.forEach((substep) => {
      message += getMessageForStep(substep) + ",\n";
    });
  }
  return message;
}

export interface IBuildOrderStepProps {
  step: IBuildOrderStep;
  setGameTime?: (time: number) => void;
}

const resourceChanges = function (step: IBuildOrderStep) {
  const resourceChanges = step.resourceChanges;
  if (!resourceChanges || resourceChanges.length === 0) {
    return null;
  }
  const changes = resourceChanges.map((change, index) => {
    const icon =
      change.direction === "up" ? faLongArrowAltUp : faLongArrowAltDown;
    return (
      <div className="change" key={index}>
        <FontAwesomeIcon icon={icon} />
        <span className="number">{change.target}</span>
        <BuildOrderIcon scale={20} icon={change.resource} />
      </div>
    );
  });
  return <label className="resource-changes">{changes}</label>;
};

const computeStepMarks = function (step: IBuildOrderStep) {
  if (!stepCanProduceVils(step)) {
    return;
  }
  if (
    step.kind === "build" &&
    ["villager", "villagerf"].indexOf(step.from || "") < 0
  ) {
    return;
  }
  const marks = [];
  const vilCount = step.number || 1;
  while (marks.length <= vilCount) {
    marks.push(<div className="step-marker" key={marks.length}></div>);
  }
  return <div className="step-marks">{marks}</div>;
};

const BuildOrderStep: React.FC<IBuildOrderStepProps> = ({
  step,
  setGameTime,
}) => {
  const stepInfo = (kindMapping[step.kind] || kindMapping["default"])(step);
  const endTime = step.endTime || 0;
  let endTimeMinutes = "" + Math.floor(endTime / 60);
  endTimeMinutes =
    endTimeMinutes.length > 1 ? endTimeMinutes : `0${endTimeMinutes}`;
  let endTimeSeconds = "" + Math.floor(endTime % 60);
  endTimeSeconds =
    endTimeSeconds.length > 1 ? endTimeSeconds : `0${endTimeSeconds}`;
  const className = `buildorderstep ${step.kind}`;
  let subSteps = null;
  const handleClick = () => {
    if (setGameTime) {
      setGameTime(step.endTime || 0);
    }
  };
  if (step.subSteps) {
    subSteps = step.subSteps.map((subStep, index) => {
      return <BuildOrderStep key={index} step={subStep} />;
    });
    subSteps = <div className="sub-steps">{subSteps}</div>;
  }

  const stepMarks = computeStepMarks(step);

  return (
    <div className={className} onClick={handleClick}>
      <div className="step-info">{stepInfo}</div>
      {subSteps}
      <label className="end-time">
        [{endTimeMinutes}:{endTimeSeconds}]
      </label>
      {resourceChanges(step)}
      {stepMarks}
    </div>
  );
};

export default BuildOrderStep;

export const getStepDuration = (step: IBuildOrderStep) => {
  let bonus = 1;
  if (speedBonuses.persianBonus) {
    const age = step.age;
    if (age === "age2") {
      bonus = 1.1;
    } else if (age === "age3") {
      bonus = 1.15;
    } else if (age === "age4") {
      bonus = 1.2;
    }
  }
  return getStepDurationWithoutPersianBonus(step) / bonus;
};

const getStepDurationWithoutPersianBonus = (step: IBuildOrderStep) => {
  if (step.kind === "move") {
    return 0;
  }
  if (step.kind === "create") {
    return 25 * (step.number || 1);
  }
  if (step.kind === "build") {
    return ["villager", "villagerf"].indexOf(step.from || "") >= 0 ? 25 : 0;
  }
  if (step.kind === "loom") {
    return 25 / (speedBonuses.portugueseTechs ? 1.3 : 1);
  }
  if (step.kind === "age2") {
    return 130 * (speedBonuses.malayBonus ? 3 / 5 : 1);
  }
  if (step.kind === "age3") {
    return 160 * (speedBonuses.malayBonus ? 3 / 5 : 1);
  }
  if (step.kind === "age4") {
    return 190 * (speedBonuses.malayBonus ? 3 / 5 : 1);
  }
  if (step.kind === "wheelbarrow") {
    return 75 / (speedBonuses.portugueseTechs ? 1.3 : 1);
  }
  if (step.kind === "research") {
    let sum = 0;
    (step.techs || []).forEach((tech) => {
      if (tech === "age2") {
        sum += 130 * (speedBonuses.malayBonus ? 3 / 5 : 1);
      } else if (tech === "age3") {
        sum += 160 * (speedBonuses.malayBonus ? 3 / 5 : 1);
      } else if (tech === "age4") {
        sum += 190 * (speedBonuses.malayBonus ? 3 / 5 : 1);
      } else if (tech === "wheelbarrow") {
        sum += 75 / (speedBonuses.portugueseTechs ? 1.3 : 1);
      } else if (tech === "loom") {
        sum += 25 / (speedBonuses.portugueseTechs ? 1.3 : 1);
      }
    });
    return sum;
  }
  return 0;
};

export const stepCanProduce = (step: IBuildOrderStep) => {
  return ["create", "move", "build"].indexOf(step.kind) >= 0;
};

export const stepCanProduceVils = (step: IBuildOrderStep) => {
  return ["create", "build"].indexOf(step.kind) >= 0;
};
