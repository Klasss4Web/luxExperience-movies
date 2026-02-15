type MetaItemProps = {
  label: string;
  value: string | number;
};

export const MetaItem = ({ label, value }: MetaItemProps) => {
  return (
    <div className="meta-item">
      <span className="meta-label">{label}</span>
      <span className="meta-value">{value}</span>
    </div>
  );
};
