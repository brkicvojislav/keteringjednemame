import Image from "next/image";
import type { MenuItem } from "@/lib/types";

interface MenuCardProps {
  item: MenuItem;
}

function formatPrice(item: MenuItem): string {
  const isWholeCake = item.minQuantity === 1 && item.pricePerPiece >= 1000;
  if (isWholeCake) {
    return `od ${item.pricePerPiece.toLocaleString("sr-RS")} RSD / kom`;
  }
  return `${item.pricePerPiece.toLocaleString("sr-RS")} RSD / kom`;
}

function formatMinQuantity(item: MenuItem): string {
  if (item.minQuantity === 1) {
    return "Min. 1 komad";
  }
  return `Min. ${item.minQuantity} kom`;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-charcoal">{item.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-charcoal/10 pt-4">
          <span className="text-xs font-semibold text-charcoal/50">
            {formatMinQuantity(item)}
          </span>
          <span className="text-sm font-bold text-wine">{formatPrice(item)}</span>
        </div>
      </div>
    </article>
  );
}
