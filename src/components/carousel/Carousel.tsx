import { useEffect, useRef, useState } from "react";
import "./Carousel.css";

type CarouselProps<T> = {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

export default function Carousel<T>({
  title,
  items,
  renderItem,
}: CarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateControls = () => {
    const el = trackRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;

    const amount = trackRef.current.clientWidth * 0.8;

    trackRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateControls();
  }, [items]);

  return (
    <section className="carousel">
      <header className="carousel__header">
        <h2 className="carousel__title">{title}</h2>

        <div className="carousel__controls">
          <button
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            ◀
          </button>
          <button
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            ▶
          </button>
        </div>
      </header>

      <div
        className="carousel__track"
        ref={trackRef}
        tabIndex={0}
        onScroll={updateControls}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scroll("right");
          if (e.key === "ArrowLeft") scroll("left");
        }}
        role="region"
        aria-roledescription="carousel"
      >
        {items.map((item, index) => (
          <div className="carousel__item" key={index}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </section>
  );
}
