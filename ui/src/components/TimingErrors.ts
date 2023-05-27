interface Boat {
  number: number,
  name: string,
  athletes: string[],
  startTime: string,
  endTime: string,
  didNotAttend: boolean,
  didNotFinish: boolean,
  reason: string,
  division: number,
}
export function hasError(boat: Boat): string[]{
  let result : string[] = []

  if (!boat.startTime && !boat.didNotAttend){
    result.push("No start time given and DNS not set")
  }
  if (boat.startTime && boat.didNotAttend){
    result.push("Start time given and DNS set")
  }
  if (!boat.endTime && !boat.didNotFinish){
    result.push("No end time given and DNF not set")
  }
  if (boat.endTime && boat.didNotFinish){
    result.push("End time given and DNF set")
  }
  if (boat.endTime && !boat.startTime){
    result.push("End time given but no start time")
  }
  if (new Date(boat.startTime) > new Date(boat.endTime)){
    result.push("Start time greater than end time")
  }
  if (boat.didNotAttend && boat.didNotFinish){
    result.push("DNS and DNF is set")
  }
  return result
}

export function hasWarning(boat: Boat): string[]{
  let result : string[] = []

  if (boat.startTime && !boat.endTime && !boat.didNotFinish){
    result.push("Start time given but no end time")
  }
  if ((boat.didNotFinish || boat.didNotAttend) && !boat.reason){
    result.push("DNS or DNF set but no reason given")
  }

  const duration = new Date(boat.endTime).getTime() - new Date(boat.startTime).getTime();
  if (duration < 120000){
    result.push("Duration is smaller than 2 minutes")
  }
  if (duration > 30 * 60000){
    result.push("Duration is greater than 30 minutes")
  }

  return result;
}
