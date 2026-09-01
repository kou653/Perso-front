import { MUG_MOCKUP } from "@/lib/mugMockup";

function zoneStyle(zone) {
  const anchor = zone.anchor ?? "center";
  const base = {
    position: "absolute",
    top: zone.top,
    left: zone.left,
    width: zone.width,
    height: zone.height ?? "auto",
    ...(zone.transform ? { transform: zone.transform } : {}),
  };

  if (anchor === "center") {
    base.transform = [base.transform, "translate(-50%, 0)"].filter(Boolean).join(" ");
    base.left = zone.left ?? "50%";
  }

  return base;
}

function TextLayer({ field, value }) {
  if (!value) return null;

  const style = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: field.style?.textAlign === "left" ? "flex-start" : "center",
    textAlign: field.style?.textAlign ?? "center",
    fontSize: field.style?.fontSize ?? "0.65rem",
    fontWeight: field.style?.fontWeight ?? "normal",
    fontStyle: field.style?.fontStyle ?? "normal",
    color: field.style?.color ?? "#1e293b",
    fontFamily: field.style?.fontFamily ?? "inherit",
    letterSpacing: field.style?.letterSpacing,
    textTransform: field.style?.textTransform,
    lineHeight: field.style?.lineHeight ?? 1.2,
    wordBreak: "break-word",
    overflow: "hidden",
    ...field.style,
  };

  return (
    <div style={zoneStyle(field.zone)}>
      <p style={style}>{value}</p>
    </div>
  );
}

function ImageLayer({ field, value }) {
  if (!value) return null;

  return (
    <div style={zoneStyle(field.zone)}>
      <img
        src={value}
        alt={field.label}
        className="h-full w-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

function ColorLayer({ field, value, allValues, fields }) {
  // Les champs couleur modifient le rendu d'autres champs via accentKey
  return null;
}

function resolveAccentColor(fields, values) {
  const colorField = fields.find((f) => f.type === "color");
  return colorField ? values[colorField.key] || colorField.defaultValue : null;
}

function applyAccent(fields, values) {
  const accent = resolveAccentColor(fields, values);
  if (!accent) return fields;

  return fields.map((field) => {
    if (field.type === "text" && field.usesAccent) {
      return {
        ...field,
        style: { ...field.style, color: accent },
      };
    }
    return field;
  });
}

export function MugPreview({
  mockup = MUG_MOCKUP,
  fields = [],
  values = {},
  className = "",
  showPrintAreaDebug = false,
}) {
  const resolvedValues = Object.fromEntries(
    fields.map((f) => [f.key, values[f.key] ?? f.defaultValue ?? ""])
  );

  const renderFields = applyAccent(fields, resolvedValues).filter(
    (f) => f.type !== "color"
  );

  const printTransform = `perspective(${mockup.perspective ?? "500px"}) rotateY(${mockup.rotateY ?? "-16deg"})`;

  return (
    <div className={`relative aspect-square overflow-hidden rounded-lg bg-muted ${className}`}>
      <img
        src={mockup.image}
        alt="Mockup mug"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute overflow-hidden"
        style={{
          top: mockup.printArea.top,
          left: mockup.printArea.left,
          width: mockup.printArea.width,
          height: mockup.printArea.height,
          transform: printTransform,
          transformOrigin: "center center",
          ...(showPrintAreaDebug
            ? { outline: "2px dashed rgba(255,0,0,0.5)", background: "rgba(255,255,255,0.05)" }
            : {}),
        }}
      >
        {renderFields.map((field) => {
          const value = resolvedValues[field.key];

          if (field.type === "image") {
            return <ImageLayer key={field.key} field={field} value={value} />;
          }

          if (field.type === "text") {
            return <TextLayer key={field.key} field={field} value={value} />;
          }

          return null;
        })}
      </div>
    </div>
  );
}
