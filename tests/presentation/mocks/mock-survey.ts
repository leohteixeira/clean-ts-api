import { AddSurvey } from '@/domain/usecases'

export class AddSurveySpy implements AddSurvey {
  params: AddSurvey.Params

  async add (params: AddSurvey.Params): Promise<AddSurvey.Result> {
    this.params = params
  }
}
