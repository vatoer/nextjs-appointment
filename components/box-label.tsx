import { cn } from "@/lib/utils";

interface IBoxLabelProps {
  label: string;
  maxCharPerRow: number;
  row?: number;
}

const BoxLabel = ({ label, maxCharPerRow, row = 1 }: IBoxLabelProps) => {
  const result = label.padEnd(row*maxCharPerRow).split("");

  let rowsOfChars:string[][]= [];
  for (let i = 0; i < row; i++) {
    rowsOfChars.push(result.slice(i * maxCharPerRow, (i + 1) * maxCharPerRow));
  }

  const gridRowClass = "grid-rows-" + row;
  return (
    <div className={cn("grid grid-flow-row gap-1", gridRowClass)}>
      {Array(row)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="flex">
            {rowsOfChars[index].map((char, index) => (
              <div key={index} className="border w-5 flex flex-col">
                <p className="text-center">{char.toUpperCase()}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default BoxLabel;
