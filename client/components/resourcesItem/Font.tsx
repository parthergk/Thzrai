import React, { useEffect, useState, ChangeEvent } from "react";
import Field from "./Field";

interface FontItem {
  text: string;
  family: string;
  size: string;
  weight: string;
  color: string;
}

interface FontProps {
  data: FontItem[];
}

const Font: React.FC<FontProps> = ({ data }) => {
  const [selectedText, setSelectedText] = useState<string>("");

  useEffect(() => {
    if (data.length > 0) {
      setSelectedText(data[0].text);
    }
  }, [data]);

  const selectedFont = data.find(item => item.text === selectedText);

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedText(e.target.value);
  };

  if (!selectedFont) {
   return <div>No font data</div>
  }
  return (
    <div className="w-full flex flex-col gap-3 my-1 p-1">
      <select
        className="text-center border py-2 rounded-md outline-none text-neutral-800 dark:text-white shadow-lg"
        onChange={handleSelection}
        value={selectedText}
      >
        {data.map(item => (
          <option  key={item.text} value={item.text} >
            {item.text}
          </option>
        ))}
      </select>

      <Field label="Font Family" value={selectedFont.family} copy />
      <Field label="Font Size" value={selectedFont.size} />
      <Field label="Font Weight" value={selectedFont.weight} />
      <Field label="Font Color" value={selectedFont.color} copy />
    </div>
  );
};



export default React.memo(Font);
