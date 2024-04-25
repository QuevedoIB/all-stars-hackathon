import { ProgressBar, Step } from "react-step-progress-bar";

const achievements = [
  {
    id: "achievement-1",
    title: "Achievement 1",
    prize: "5% voucher",
    isObtained: true,
    value: 1000,
  },
  {
    id: "achievement-2",
    title: "Achievement 2",
    prize: "10% voucher",
    isObtained: false,
    value: 2500,
  },
  {
    id: "achievement-3",
    title: "Achievement 3",
    prize: "15% voucher",
    isObtained: false,
    value: 5000,
  },
  {
    id: "achievement-4",
    title: "Achievement 4",
    prize: "20% voucher",
    isObtained: false,
    value: 7500,
  },
  {
    id: "achievement-5",
    title: "Achievement 5",
    prize: "Monthly custom bracelet",
    isObtained: false,
    value: 10000,
  },
];

console.log(
  achievements.map(({ value }) => (value / achievements.at(-1)?.value) * 100)
);

const AchievementsList = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full p-6">
      <h1 class="mb-20 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-900 from-blue-600">
          Rewards
        </span>
      </h1>
      <ul>
        <ProgressBar
          percent={40}
          filledBackground="linear-gradient(to right, #f9a8d4, #93c5fd)"
          className="w-40 h-10"
          stepPositions={achievements.map(
            ({ value }) => (value / achievements.at(-1)?.value) * 100
          )}
          hasStepZero
          width="50rem"
          height="1rem"
        >
          {achievements.map((achievement) => {
            return (
              <Step key={achievement.id} transition="scale">
                {({ accomplished }: { accomplished: boolean }) => (
                  <div id={achievement.id} className="mr-4">
                    {achievement.isObtained ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#16a34a"
                        className="w-10 h-10 z-50"
                      >
                        <path
                          id="circ"
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <div className="relative inline-flex  group">
                        <div className="rounded-full animate-ping absolute -inset-px bg-gradient-to-r from-pink-600 to-blue-600 blur opacity-55 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={accomplished ? "#172554" : "#4b5563"}
                          className="w-10 h-10 z-50 animate-bounce"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
              </Step>
            );
          })}
        </ProgressBar>
        {/* {achievements.map(
        (achievement, i) =>
          i !== achievements.length - 1 && (
            <Xarrow start={achievement.id} end={achievements[i + 1]?.id} />
          )
      )} */}
      </ul>
    </div>
  );
};

export default AchievementsList;
