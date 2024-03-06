const Textfield = ({
  value,
  onChange,
  type,
}: {
  value?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <input
        type={type ? type : "text"}
        name="field"
        className="h-[40px] px-4 pt-2 text-[20px] bg-main-background border-2 border-accent-gray rounded-lg hover:border-add-minus w-[500px]"
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e);
        }}
      />
    </div>
  );
};

export default Textfield;
