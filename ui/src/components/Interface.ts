export type RegattaData = {
  name: string,
  races: {
    number: number,
    name: string,
    boats: {
      number: number,
      name: string,
      athletes: string[],
      startTime: string,
      endTime: string,
      didNotAttend: boolean,
      didNotFinish: boolean,
      reason: string,
      division: number,
    }[]
  }[]
}

export type RegattaInfo = {
  startClientId: string,
  finishClientId: string
}

export interface Regatta {
  info: RegattaInfo,
  data: RegattaData
}
