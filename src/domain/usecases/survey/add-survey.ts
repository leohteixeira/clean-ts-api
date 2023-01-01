export interface AddSurvey {
  add: (survey: AddSurvey.Params) => Promise<AddSurvey.Result>
}

export namespace AddSurvey {
  export type Params = {
    question: string
    answers: SurveyAnswer[]
  }

  export type SurveyAnswer = {
    image: string
    answer: string
  }

  export type Result = void
}
