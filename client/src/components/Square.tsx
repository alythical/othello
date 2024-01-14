import cs from "classnames";
import Circle from "./Circle";
import { Piece } from "../types";
import { Show } from "solid-js";

interface SquareProps {
  onClick: () => void;
  piece?: Piece;
  row: number;
  col: number;
}

export default function Square(props: SquareProps) {
  const color = {
    [Piece.White]: "white",
    [Piece.Black]: "black",
  } as const;

  return (
    <div
      onClick={props.onClick}
      class={cs(
        "cursor-pointer bg-green-400 w-20 h-20 text-center border-slate-900 border-r-2 border-t-2",
        {
          "border-l-2": props.col === 0,
          "border-b-2": props.row === 7,
          "cursor-pointer": props.piece === undefined,
          "cursor-not-allowed": props.piece !== undefined,
        }
      )}
    >
      <Show when={props.piece !== undefined}>
        <Circle color={color[props.piece!!]} />
      </Show>
    </div>
  );
}
