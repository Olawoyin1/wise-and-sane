// import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card-container max-w-[500px] max-h-[590px] md:max-h-[590px]">
      {/* Image */}
      <div className="skeleton-box shimmer h-85 w-full rounded-2xl" />

      {/* Header */}
      <div className="skeleton-box shimmer h-5 w-3/4 rounded" />

      {/* Paragraph lines */}
      <div className="skeleton-box shimmer h-3 w-full rounded" />
      <div className="skeleton-box shimmer h-3 w-11/12 rounded" />
      <div className="skeleton-box shimmer h-3 w-5/6 rounded" />

      {/* Button row */}
      <div className="skeleton-button-row">
        <div className="skeleton-box shimmer h-8 w-24 rounded-full" />
        <div className="skeleton-box shimmer h-8 w-24 rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonCard;
