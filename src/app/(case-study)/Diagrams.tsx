import s from "./caseStudy.module.css";

/**
 * Diagrams are laid out in CSS rather than drawn in a fixed-viewBox SVG.
 * A viewBox scales its own type down with its container, which turned a
 * 14px label into roughly 4px on a phone. These reflow instead, and their
 * labels stay real, selectable, readable text at every width.
 */

const LOOP = [
  "Autonomous work",
  "Mission Control",
  "Exception",
  "Human decision",
  "Activity trace",
  "Repeated pattern",
  "Agent Coach",
  "Reviewed guidance",
];

export function LoopDiagram() {
  return (
    <div className={s.diagram}>
      <ol className={s.loop}>
        {LOOP.map((label, i) => (
          <li
            key={label}
            className={i === LOOP.length - 1 ? s.loopCellLast : s.loopCell}
          >
            {label}
          </li>
        ))}
      </ol>
      <p className={s.loopNote}>
        Reviewed guidance returns to autonomous work — the agent improves
        without silently gaining authority.
      </p>
    </div>
  );
}

const REGISTERS: readonly (readonly [string, string])[] = [
  ["Fact", "What is true. The quote, the competitor number, the gap."],
  ["Policy", "The operator's own rule. Follow-up may discount 5%."],
  ["AI suggestion", "Counter at $23,200. Visible, labelled, not acted on."],
  ["Human decision", "The operator chooses and commits."],
];

export function RegisterDiagram() {
  return (
    <div className={s.diagram}>
      <ol className={s.registers}>
        {REGISTERS.map(([name, desc], i) => (
          <li
            key={name}
            className={i === REGISTERS.length - 1 ? s.registerLast : s.register}
          >
            <p className={s.registerName}>{name}</p>
            <p className={s.registerDesc}>{desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

const SCREENS = [
  {
    name: "Exceptions register",
    before: "Needs attention",
    after: "Resolved · 11:22 AM",
  },
  {
    name: "Activity trace",
    before: "Unresolved failure",
    after: "Resolved · 11:22 AM",
  },
] as const;

export function StateDiagram() {
  return (
    <div className={s.diagram}>
      <p className={s.stateKey}>
        One session key — <code>alivo:trace:marcus-webb</code>
      </p>
      <div className={s.stateScreens}>
        {SCREENS.map((screen) => (
          <div className={s.stateScreen} key={screen.name}>
            <p className={s.stateScreenName}>{screen.name}</p>
            <p className={s.stateWhen}>before</p>
            <p className={s.stateValue}>{screen.before}</p>
            <p className={s.stateWhen}>after the operator assigns Tomas</p>
            <p className={s.stateValue}>{screen.after}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
