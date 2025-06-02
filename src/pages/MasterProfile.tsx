import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

// Расширенный интерфейс мастера
export interface MasterProfile {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specializations: string[];
  district: string;
  pricePerHour: number;
  experience: number;
  isOnline: boolean;
  status: "available" | "busy" | "offline";
  phone: string;
  description: string;
  completedJobs: number;
  joinDate: string;
  workingHours: string;
  portfolio: string[];
  reviews: Array<{
    id: number;
    author: string;
    rating: number;
    text: string;
    date: string;
  }>;
}

const MasterProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Тестовые данные профиля (в реальном приложении загружались бы с сервера)
  const masterProfile: MasterProfile = {
    id: 1,
    name: "Александр Петров",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    reviewCount: 47,
    specializations: [
      "Сборка мебели",
      "Электрика",
      "Монтаж полок",
      "Установка светильников",
    ],
    district: "Центральный",
    pricePerHour: 800,
    experience: 5,
    isOnline: true,
    status: "available",
    phone: "+7 (999) 123-45-67",
    description:
      "Профессиональный мастер с 5-летним опытом работы. Выполняю работы качественно и в срок. Имею все необходимые инструменты.",
    completedJobs: 156,
    joinDate: "2019",
    workingHours: "ПН-ПТ: 9:00-18:00, СБ: 10:00-16:00",
    portfolio: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    ],
    reviews: [
      {
        id: 1,
        author: "Мария К.",
        rating: 5,
        text: "Отличная работа! Собрал шкаф быстро и аккуратно. Рекомендую!",
        date: "15.05.2024",
      },
      {
        id: 2,
        author: "Дмитрий А.",
        rating: 5,
        text: "Профессионал своего дела. Установил все светильники, работает чисто.",
        date: "12.05.2024",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-red-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Свободен";
      case "busy":
        return "Занят";
      case "offline":
        return "Не в сети";
      default:
        return "Неизвестно";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-amber-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  const handleBooking = () => {
    alert(`Заявка на бронирование мастера ${masterProfile.name} отправлена!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header с кнопкой назад */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-2"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад к поиску
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Основная информация */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={masterProfile.avatar}
                    alt={masterProfile.name}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-xl">
                    {masterProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(masterProfile.status)} border-2 border-white rounded-full`}
                ></div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {masterProfile.name}
                    </h1>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center">
                        {renderStars(masterProfile.rating)}
                        <span className="ml-2 text-lg font-semibold">
                          {masterProfile.rating} ({masterProfile.reviewCount}{" "}
                          отзывов)
                        </span>
                      </div>
                      <Badge
                        variant={
                          masterProfile.status === "available"
                            ? "default"
                            : "secondary"
                        }
                        className={`${
                          masterProfile.status === "available"
                            ? "bg-green-600"
                            : masterProfile.status === "busy"
                              ? "bg-red-600"
                              : "bg-gray-600"
                        }`}
                      >
                        {getStatusText(masterProfile.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <span>📍 {masterProfile.district}</span>
                      <span>⚡ Опыт: {masterProfile.experience} лет</span>
                      <span>
                        ✅ Выполнено: {masterProfile.completedJobs} работ
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600 mb-1">
                      {masterProfile.pricePerHour}₽
                    </p>
                    <p className="text-gray-500">за час</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Описание и специализации */}
              <div>
                <h3 className="font-semibold text-lg mb-3">О мастере</h3>
                <p className="text-gray-700 mb-4">
                  {masterProfile.description}
                </p>

                <h4 className="font-medium mb-2">Специализации:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {masterProfile.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Контакты и график */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Контакты</h3>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center gap-2">
                    <Icon name="Phone" size={16} />
                    {masterProfile.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} />
                    {masterProfile.district} район
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    {masterProfile.workingHours}
                  </p>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={masterProfile.status !== "available"}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                  size="lg"
                >
                  {masterProfile.status === "available"
                    ? "Заказать услугу"
                    : "Мастер недоступен"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Портфолио */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-xl font-semibold">Примеры работ</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {masterProfile.portfolio.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Работа ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Отзывы */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Отзывы клиентов</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {masterProfile.reviews.map((review, index) => (
                <div key={review.id}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.author}</span>
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  </div>
                  {index < masterProfile.reviews.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasterProfile;
