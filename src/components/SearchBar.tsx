import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  resultsCount: number;
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  resultsCount,
}: SearchBarProps) => {
  const sortOptions = [
    { value: "rating", label: "По рейтингу" },
    { value: "price-asc", label: "Цена: по возрастанию" },
    { value: "price-desc", label: "Цена: по убыванию" },
    { value: "experience", label: "По опыту" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Поиск по имени мастера или услуге..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Button variant="outline" className="whitespace-nowrap">
            📍 Рядом со мной
          </Button>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        Найдено мастеров:{" "}
        <span className="font-semibold text-blue-600">{resultsCount}</span>
      </div>
    </div>
  );
};

export default SearchBar;
