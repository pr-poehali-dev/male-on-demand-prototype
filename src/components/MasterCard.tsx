import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface Master {
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
}

interface MasterCardProps {
  master: Master;
  onSelect: (master: Master) => void;
}

const MasterCard = ({ master, onSelect }: MasterCardProps) => {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < rating ? "text-amber-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={master.avatar} alt={master.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                {master.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {master.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {master.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              {renderStars(master.rating)}
              <span className="text-sm text-gray-600 ml-1">
                {master.rating} ({master.reviewCount} отзывов)
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              📍 {master.district} • Опыт: {master.experience} лет
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {master.specializations.slice(0, 3).map((spec, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {spec}
            </Badge>
          ))}
          {master.specializations.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{master.specializations.length - 3}
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              {master.pricePerHour}₽
            </p>
            <p className="text-sm text-gray-500">за час</p>
          </div>
          <Button
            onClick={() => navigate(`/master/${master.id}`)}
            className="bg-blue-600 hover:bg-blue-700 px-6"
          >
            Выбрать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MasterCard;
