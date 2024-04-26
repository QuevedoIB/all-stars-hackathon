import { IAchievement } from "@/components/lists/AchievementsList";
import QRCode from "react-qr-code";

interface IAchievementPrize {
  position: "top" | "bottom";
  achievement: IAchievement;
}

const AchievementPrize = ({ position, achievement }: IAchievementPrize) => {
  return (
    <div className="flex absolute">
      <div />
      <div>
        <p>{achievement.title}</p>
        <QRCode
          style={{ height: "auto", maxWidth: "4rem", width: "100%" }}
          value={achievement.prize}
        />
      </div>
    </div>
  );
};

export default AchievementPrize;
