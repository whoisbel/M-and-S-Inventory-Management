"use client"
import { useState } from "react";

function GradePage({ page, generateRandomPastelColor }: { page: any[], generateRandomPastelColor: any }) {
  const [pastelColors, setPastelColors] = useState(() => {
    const colors = page.map(() => generateRandomPastelColor());
    return colors;
  });

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {page.slice(0, 2).map((grade, index) => (
          <div className="rounded-xl flex flex-col h-[100px] p-2" key={index} style={{ backgroundColor: pastelColors[index] }}>
            <h1 className="text-[20px] font-bold text-letters-color">{grade.name}</h1>
            <h1 className="text-[30px] font-bold text-letters-color self-center">{grade.weight}</h1>
          </div>
        ))}
      </div>
      {page.length > 2 && (
        <div className={`grid grid-cols-2 gap-4 ${page.length === 3 && page.length % 2 === 1 ? 'justify-start' : 'justify-evenly'} pt-[20px]`}>
          {page.slice(2, -1).map((grade: any, index: number) => (
            <div className="rounded-xl flex flex-col h-[100px] p-2" key={index + 2} style={{ backgroundColor: pastelColors[index + 2] }}>
              <h1 className="text-[20px] font-bold text-letters-color">{grade.name}</h1>
              <h1 className="text-[30px] font-bold text-letters-color self-center">{grade.weight}</h1>
            </div>
          ))}
          {/* Render the last grade item aligned with the first item */}
          {page.length > 3 && (
            <div className="rounded-xl flex flex-col h-[100px] p-2" style={{ backgroundColor: pastelColors[page.length - 1] }}>
              <h1 className="text-[20px] font-bold text-letters-color">{page[page.length - 1].name}</h1>
              <h1 className="text-[30px] font-bold text-letters-color self-center">{page[page.length - 1].weight}</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GradePage;
