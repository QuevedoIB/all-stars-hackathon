import { IAchievement } from "@/components/lists/AchievementsList";
import QRCode from "react-qr-code";

interface IAchievementPrize {
  position: "top" | "bottom";
  achievement: IAchievement;
}

const AchievementPrize = ({ position, achievement }: IAchievementPrize) => {
  return (
    <div className="absolute w-max mt-2" style={{ left: "-2rem" }}>
      <div />
      <div className="flex flex-col items-center">
        <h6 className="text-l font-bold text-gray-800 mb-2">
          {achievement.title}
        </h6>
        <QRCode
          style={{ height: "auto", maxWidth: "4rem", width: "100%" }}
          value={achievement.prize}
        />
      </div>
    </div>
  );
};

export default AchievementPrize;
