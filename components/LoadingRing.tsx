const LoadingRing = ({
  width,
  height,
  title,
  borderWidth,
}: {
  width: number;
  height: number;
  title?: string;
  borderWidth?: number;
}) => {
  if (!borderWidth) {
    borderWidth = 8;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="lds-ring" style={{ width: width, height: height }}>
        <div
          style={{
            width: width - 16,
            height: height - 16,
            borderWidth: `${borderWidth}px`,
          }}
        ></div>
        <div
          style={{
            width: width - 16,
            height: height - 16,
            borderWidth: `${borderWidth}px`,
          }}
        ></div>
        <div
          style={{
            width: width - 16,
            height: height - 16,
            borderWidth: `${borderWidth}px`,
          }}
        ></div>
      </div>
      <h2 className="font-bold">{` ${title ? title : ""}`}</h2>
    </div>
  );
};

export default LoadingRing;
