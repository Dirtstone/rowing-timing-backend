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
export function hasError(boat: Boat): string{
  if (!boat.startTime && !boat.didNotAttend){
    return "No start time given and DNS not set"
  }
  if (boat.startTime && boat.didNotAttend){
    return "Start time given and DNS set"
  }
  if (!boat.endTime && !boat.didNotFinish){
    return "No end time given and DNF not set"
  }
  if (boat.endTime && boat.didNotFinish){
    return "End time given and DNF set"
  }
  if (boat.endTime && !boat.startTime){
    return "End time given but no start time"
  }
  if (new Date(boat.startTime) > new Date(boat.endTime)){
    return "Start time greater than end time"
  }
  if (boat.didNotAttend && boat.didNotFinish){
    return "DNS and DNF is set"
  }
  return "";
}

export function hasWarning(boat: Boat): string{
  if (boat.startTime && !boat.endTime){
    return "Start time given but no end time"
  }
  if ((boat.didNotFinish || boat.didNotAttend) && !boat.reason){
    return "DNS or DNF set but no reason given"
  }
  return "";
}
