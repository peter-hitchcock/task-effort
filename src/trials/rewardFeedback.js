import { eventCodes } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { removeCursor } from '../lib/utils'
import { jsPsych } from 'jspsych-react'

const rewardFeedback = (duration) => {

  const startCode = eventCodes.rewardFeedbackStart
  const endCode = eventCodes.rewardFeedbackEnd

  return {
    type: 'call_function',
    async: true,
    func: (done) => {
      // send trigger events
      let rewards = jsPsych.data.get().select('value').values
      let last = rewards[rewards.length - 1]
      let stimulus
      if (last)
      {
        stimulus = `<div class="effort-container"><h1>+${(last.reward).toFixed(2)}</h1>` + photodiodeGhostBox() + `</div>`
      }
      else
      {
        stimulus = `<div class="effort-container"><h1>+${0}</h1>` + photodiodeGhostBox() + `</div>`
      }
      document.getElementById('jspsych-content').innerHTML = stimulus
      setTimeout(() => {
        done()
      }, duration);
    },
    on_load: () => {
      removeCursor('experiment')
      pdSpotEncode(startCode)
    },
    on_finish: (data) => {
      pdSpotEncode(endCode)
      data.code = [startCode, endCode]
    }
  }
}

export default rewardFeedback
