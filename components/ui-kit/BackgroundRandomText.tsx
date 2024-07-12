interface BackgroundRandomTextureInterface {
  text: string | number;
  color: string;
}

export default function BackgroundRandomText(
  props: BackgroundRandomTextureInterface
) {
  const { color, text } = props;
  return (
    <div
      style={{ background: color }}
      className={`"text-xs px-2.5 py-0.5 rounded-[20px] text-white`}
    >
      {String(text).split(",").shift()?.split(".").shift()?.replace("%", "")}{" "}
      {text !== "-" ? "%" : null}
    </div>
  );
}
