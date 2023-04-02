const Code = ({ className, label }) => (
  <div className={`font-mono inline-block ${className ? className : ""}`}>
    <span className="bg-slate-200 px-2">*</span>
    <span className="bg-cyan-200 px-2">{label}</span>
  </div>
);
