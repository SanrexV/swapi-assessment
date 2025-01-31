import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@swapi-app/components/button/button";

type PaginatorProps = {
  totalPages: number;
  currentPage: number;
  prevUrl: string | null;
  nextUrl: string | null;
  handlePagination: (pageUrl: string | null) => Promise<void>;
};

export default function Paginator({
  totalPages,
  currentPage,
  prevUrl,
  nextUrl,
  handlePagination,
}: PaginatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <Button
        label="Previous"
        disabled={!prevUrl}
        icon={ChevronLeft}
        iconPosition="left"
        onClick={() => handlePagination(prevUrl)}
      />
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        label="Next"
        disabled={!nextUrl}
        icon={ChevronRight}
        iconPosition="right"
        onClick={() => handlePagination(nextUrl)}
      />
    </div>
  );
}
