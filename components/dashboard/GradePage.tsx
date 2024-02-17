function GradePage({
  page,
  generateRandomPastelColor,
}: {
  page: { quantity: number; name: string }[];
  generateRandomPastelColor: any;
}) {
  // Check if page data is null or empty
  if (!page || page.length === 0) {
    return <div className="w-full h-full items-center justify-center flex text-[20px] text-letters-color">No data available</div>; // or return a message like <div>No data available</div>
  }

  const pastelColors = [0, 1, 2, 3, 4].map(() => generateRandomPastelColor());
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {page.slice(0, 2).map((grade, index) => (
          <div
            className="rounded-xl flex flex-col h-[100px] p-2"
            key={index}
            style={{ backgroundColor: pastelColors[index] }}
          >
            <h1 className="text-[20px] font-bold text-letters-color">
              {grade.name}
            </h1>
            <h1 className="text-[30px] font-bold text-letters-color self-center">
              {grade.quantity + " kg"}
            </h1>
          </div>
        ))}
      </div>
      {page.length > 2 && (
        <div
          className={`grid grid-cols-2 gap-4 ${
            page.length === 3 && page.length % 2 === 1
              ? "justify-start"
              : "justify-evenly"
          } pt-[20px]`}
        >
          {page.slice(2, -1).map((grade: any, index: number) => (
            <div
              className="rounded-xl flex flex-col h-[100px] p-2"
              key={index + 2}
              style={{ backgroundColor: pastelColors[index + 2] }}
            >
              <h1 className="text-[20px] font-bold text-letters-color">
                {grade.name}
              </h1>
              <h1 className="text-[30px] font-bold text-letters-color self-center">
                {grade.quantity + " kg"}
              </h1>
            </div>
          ))}
          {/* Render the last grade item aligned with the first item */}
          {page.length > 3 && (
            <div
              className="rounded-xl flex flex-col h-[100px] p-2"
              style={{ backgroundColor: pastelColors[page.length - 1] }}
            >
              <h1 className="text-[20px] font-bold text-letters-color">
                {page[page.length - 1].name}
              </h1>
              <h1 className="text-[30px] font-bold text-letters-color self-center">
                {page[page.length - 1].quantity + " kg"}
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GradePage;
