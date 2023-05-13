
export type RegattaData = {
    name: string,
    races: {
        number: number,
        name: string,
        boats: {
            number: number,
            name: string,
            athletes: string[],
            startTime: Date | undefined,
            endTime: Date | undefined,
            didNotAttend: boolean,
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

export interface DatabaseReturn<Return>{
    data: Return | undefined;
    success: boolean,
    errors: string;
}