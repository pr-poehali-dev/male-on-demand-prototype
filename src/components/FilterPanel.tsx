import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FilterState {
  services: string[];
  districts: string[];
  priceRange: [number, number];
  minRating: number;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const FilterPanel = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterPanelProps) => {
  const availableServices = [
    "Сборка мебели",
    "Электрика",
    "Сантехника",
    "Ремонт техники",
    "Монтаж полок",
    "Покраска",
    "Установка светильников",
    "Мелкий ремонт",
  ];

  const availableDistricts = [
    "Центральный",
    "Северный",
    "Южный",
    "Восточный",
    "Западный",
    "Советский",
    "Ленинский",
    "Октябрьский",
  ];

  const priceRanges = [
    { label: "До 500₽", value: [0, 500] as [number, number] },
    { label: "500-1000₽", value: [500, 1000] as [number, number] },
    { label: "1000-2000₽", value: [1000, 2000] as [number, number] },
    { label: "2000₽+", value: [2000, 10000] as [number, number] },
  ];

  const toggleService = (service: string) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter((s) => s !== service)
      : [...filters.services, service];
    onFiltersChange({ ...filters, services: newServices });
  };

  const toggleDistrict = (district: string) => {
    const newDistricts = filters.districts.includes(district)
      ? filters.districts.filter((d) => d !== district)
      : [...filters.districts, district];
    onFiltersChange({ ...filters, districts: newDistricts });
  };

  const setPriceRange = (range: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: range });
  };

  const setMinRating = (rating: number) => {
    onFiltersChange({ ...filters, minRating: rating });
  };

  return (
    <Card className="h-fit sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Фильтры</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Очистить
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Услуги */}
        <div>
          <h4 className="font-medium mb-3 text-gray-900">Услуги</h4>
          <div className="flex flex-wrap gap-2">
            {availableServices.map((service) => (
              <Badge
                key={service}
                variant={
                  filters.services.includes(service) ? "default" : "outline"
                }
                className="cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => toggleService(service)}
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Районы */}
        <div>
          <h4 className="font-medium mb-3 text-gray-900">Районы</h4>
          <div className="flex flex-wrap gap-2">
            {availableDistricts.map((district) => (
              <Badge
                key={district}
                variant={
                  filters.districts.includes(district) ? "default" : "outline"
                }
                className="cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => toggleDistrict(district)}
              >
                {district}
              </Badge>
            ))}
          </div>
        </div>

        {/* Цена */}
        <div>
          <h4 className="font-medium mb-3 text-gray-900">Цена за час</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div
                key={range.label}
                className={`p-2 rounded-md cursor-pointer transition-colors ${
                  filters.priceRange[0] === range.value[0] &&
                  filters.priceRange[1] === range.value[1]
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setPriceRange(range.value)}
              >
                {range.label}
              </div>
            ))}
          </div>
        </div>

        {/* Рейтинг */}
        <div>
          <h4 className="font-medium mb-3 text-gray-900">
            Минимальный рейтинг
          </h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className={`p-2 rounded-md cursor-pointer transition-colors flex items-center gap-2 ${
                  filters.minRating === rating
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setMinRating(rating)}
              >
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < rating ? "text-amber-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm">и выше</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
