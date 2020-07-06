import { lang, ONLINE, MTURK, PROLIFIC } from "../config/main";
import { getUserId, getTurkUniqueId, getProlificId } from "../lib/utils";
import { baseStimulus } from "../lib/markup/stimuli";

const userId = () => {
  if (ONLINE) {
    if (MTURK) {
      return {
        type: "html_keyboard_response",
        stimulus: baseStimulus(`<h1>${lang.userid.set}</h1>`, true),
        response_ends_trial: false,
        trial_duration: 800,
        on_finish: (data) => {
          const uniqueId = getTurkUniqueId();
          console.log(uniqueId);
        },
      };
    } else if (PROLIFIC) {
      return {
        type: "html_keyboard_response",
        stimulus: baseStimulus(`<h1>${lang.userid.set}</h1>`, true),
        response_ends_trial: false,
        trial_duration: 800,
        on_finish: (data) => {
          const uniqueId = getProlificId();
          console.log(uniqueId);
        },

        // type: "survey_text",
        // questions: [
        //   {
        //     prompt: baseStimulus(`<h1>${lang.userid.set_prolific}</h1>`, true),
        //   },
        // ],
        // on_finish: (data) => {
        //   getUserId(data);
        // },
      };
    } // end prolific else if
  } else {
    return {
      type: "survey_text",
      questions: [
        { prompt: baseStimulus(`<h1>${lang.userid.set}</h1>`, true) },
      ],
      on_finish: (data) => {
        getUserId(data);
      },
    };
  }
};

// const checkRedo = () => {

// }

// const userIdPrompt = () => {
//   return {
//     timeline: [userId(), checkRedo()],
//     type: "html_keyboard_response",
//   };
// };

export default userId;
