import { useState, useMemo } from "react";
import MasterCard, { Master } from "@/components/MasterCard";
import FilterPanel, { FilterState } from "@/components/FilterPanel";
import SearchBar from "@/components/SearchBar";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filters, setFilters] = useState<FilterState>({
    services: [],
    districts: [],
    priceRange: [0, 10000],
    minRating: 0,
  });

  // Тестовые данные мастеров
  const masters: Master[] = [
    {
      id: 1,
      name: "Александр Петров",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      reviewCount: 47,
      specializations: ["Сборка мебели", "Электрика", "Монтаж полок"],
      district: "Центральный",
      pricePerHour: 800,
      experience: 5,
      isOnline: true,
    },
    {
      id: 2,
      name: "Дмитрий Соколов",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      reviewCount: 23,
      specializations: ["Сантехника", "Ремонт техники", "Мелкий ремонт"],
      district: "Северный",
      pricePerHour: 600,
      experience: 3,
      isOnline: false,
    },
    {
      id: 3,
      name: "Михаил Иванов",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      reviewCount: 89,
      specializations: ["Покраска", "Установка светильников", "Электрика"],
      district: "Южный",
      pricePerHour: 1200,
      experience: 7,
      isOnline: true,
    },
    {
      id: 4,
      name: "Сергей Морозов",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      reviewCount: 15,
      specializations: ["Сборка мебели", "Монтаж полок"],
      district: "Восточный",
      pricePerHour: 500,
      experience: 2,
      isOnline: true,
    },
    {
      id: 5,
      name: "Андрей Волков",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      reviewCount: 67,
      specializations: [
        "Электрика",
        "Сантехника",
        "Ремонт техники",
        "Установка светильников",
      ],
      district: "Западный",
      pricePerHour: 950,
      experience: 6,
      isOnline: true,
    },
    {
      id: 6,
      name: "Олег Кузнецов",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      rating: 3,
      reviewCount: 12,
      specializations: ["Мелкий ремонт", "Покраска"],
      district: "Советский",
      pricePerHour: 400,
      experience: 1,
      isOnline: false,
    },
  ];

  const filteredMasters = useMemo(() => {
    let result = masters.filter((master) => {
      // Поиск по имени или специализации
      const matchesSearch =
        !searchQuery ||
        master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        master.specializations.some((spec) =>
          spec.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Фильтр по услугам
      const matchesServices =
        filters.services.length === 0 ||
        filters.services.some((service) =>
          master.specializations.includes(service),
        );

      // Фильтр по районам
      const matchesDistricts =
        filters.districts.length === 0 ||
        filters.districts.includes(master.district);

      // Фильтр по цене
      const matchesPrice =
        master.pricePerHour >= filters.priceRange[0] &&
        master.pricePerHour <= filters.priceRange[1];

      // Фильтр по рейтингу
      const matchesRating = master.rating >= filters.minRating;

      return (
        matchesSearch &&
        matchesServices &&
        matchesDistricts &&
        matchesPrice &&
        matchesRating
      );
    });

    // Сортировка
    switch (sortBy) {
      case "rating":
        result.sort(
          (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
        );
        break;
      case "price-asc":
        result.sort((a, b) => a.pricePerHour - b.pricePerHour);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerHour - a.pricePerHour);
        break;
      case "experience":
        result.sort((a, b) => b.experience - a.experience);
        break;
    }

    return result;
  }, [searchQuery, sortBy, filters]);

  const handleMasterSelect = (master: Master) => {
    alert(
      `Вы выбрали мастера: ${master.name}\nСпециализации: ${master.specializations.join(", ")}\nЦена: ${master.pricePerHour}₽/час`,
    );
  };

  const clearFilters = () => {
    setFilters({
      services: [],
      districts: [],
      priceRange: [0, 10000],
      minRating: 0,
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🔨 Муж на час
            </h1>
            <p className="text-xl text-gray-600">
              Найдите надежного мастера для решения бытовых задач
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultsCount={filteredMasters.length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Фильтры */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Список мастеров */}
          <div className="lg:col-span-3">
            {filteredMasters.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Мастеры не найдены
                </h3>
                <p className="text-gray-600 mb-4">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMasters.map((master) => (
                  <MasterCard
                    key={master.id}
                    master={master}
                    onSelect={handleMasterSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
