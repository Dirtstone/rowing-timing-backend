<template>
  <q-page style="padding: 10px">
    <div class="row">
      <q-btn @click="openPdf">Download PDF Result</q-btn>
      <q-btn @click="downloadCSV">Download Certificates CSV</q-btn>
      <q-toggle label="Show errors" v-model="showErrors"/>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <div v-if="regatta == undefined">
        <!-- ToDo Loading Screen -->
        Loading
      </div>
      <q-list v-else bordered class="rounded-borders">
        <q-expansion-item
          v-for="(race, raceIndex) of regatta.data.races"
          v-bind="race.number"
          switch-toggle-side
          :icon="getIconRace(regattaErrors.raceErrors[raceIndex])"
          expand-separator
          :label="'Rennen: ' + String(race.number) + ' ' + race.name"
        >
          <q-card>
            <q-card-section>
              <q-list bordered class="rounded-borders">
                <q-expansion-item
                  v-for="divisionNumber in getNumberOfDivisions(raceIndex)"
                  v-bind="divisionNumber"
                  switch-toggle-side
                  expand-separator
                  :label="'Abteilung: ' + String(divisionNumber)"
                >
                  <q-card>
                    <q-card-section>
                      <q-list>
                        <span v-for="(boat, boatIndex) of race.boats">
                          <q-item v-if="boat.division == divisionNumber"
                                  class="q-list--padding" draggable="true">
                            <q-card class="my-card">
                              <q-card-section class="bg-primary text-white">
                                <div class="text-h6">{{ boat.name }}</div>
                                <div class="text-subtitle2 row">
                                  <div style="padding-right: 50px ">
                                    Startnummer: {{ boat.number }}
                                  </div>
                                  <div>
                                    Athleten: {{ boat.athletes.join(", ") }}
                                  </div>
                                </div>
                              </q-card-section>

                              <q-separator/>

                              <q-card-actions>
                                <div class="row">
                                  <q-input filled v-model="boatTimes[raceIndex][boatIndex].startTime">
                                    <template v-slot:append>
                                      <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                          <q-time
                                            v-model="boatTimes[raceIndex][boatIndex].startTime"
                                            with-seconds
                                            format24h
                                          >
                                            <div class="row items-center justify-end">
                                              <q-btn v-close-popup label="Close" color="primary" flat/>
                                            </div>
                                          </q-time>
                                        </q-popup-proxy>
                                      </q-icon>
                                    </template>
                                  </q-input>

                                  <q-input filled v-model="boatTimes[raceIndex][boatIndex].endTime">
                                    <template v-slot:append>
                                      <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                          <q-time
                                            v-model="boatTimes[raceIndex][boatIndex].endTime"
                                            with-seconds
                                            format24h
                                          >
                                            <div class="row items-center justify-end">
                                              <q-btn v-close-popup label="Close" color="primary" flat/>
                                            </div>
                                          </q-time>
                                        </q-popup-proxy>
                                      </q-icon>
                                    </template>
                                  </q-input>
                                </div>
                                <div class="row">
                                  <q-toggle v-model="boat.didNotAttend" disabled label="DNS"/>
                                  <q-toggle v-model="boat.didNotFinish" disabled label="DNF"/>
                                  <q-input type="text" v-if="boat.didNotAttend || boat.didNotFinish"
                                           v-model="boat.reason"
                                           label="Grund für nicht Erscheinen"/>
                                </div>
                                <q-btn style="margin-left: 10px" @click="startSwitchDivisionDialog(raceIndex, boatIndex)">Switch Division</q-btn>
                              </q-card-actions>

                              <q-card-section v-if="showErrors">
                                <q-expansion-item
                                  v-if="regattaErrors.raceErrors[raceIndex].boatErrors[boatIndex].errors.length > 0"
                                  label="Errors"
                                  icon="error"
                                  class="text-red"
                                >
                                  <q-list>
                                    <q-item v-for="error in regattaErrors.raceErrors[raceIndex].boatErrors[boatIndex].errors">
                                      {{error}}
                                    </q-item>
                                  </q-list>
                                </q-expansion-item>
                                <q-expansion-item
                                  v-if="regattaErrors.raceErrors[raceIndex].boatErrors[boatIndex].warnings.length > 0"
                                  label="Warnings"
                                  icon="warning"
                                  class="text-orange"
                                >
                                  <q-list>
                                    <q-item v-for="warning in regattaErrors.raceErrors[raceIndex].boatErrors[boatIndex].warnings">
                                      {{warning}}
                                    </q-item>
                                  </q-list>
                                </q-expansion-item>
                              </q-card-section>

                            </q-card>
                          </q-item>
                        </span>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <q-btn @click="save">Save</q-btn>



    <q-dialog v-model="switchDivisionDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="newDivisionNumber" type="number" autofocus @keyup.enter="switchDivisionDialog = false; switchDivision()" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn @click="switchDivision" flat label="Add address" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, ComputedRef, onMounted, Ref, ref, WritableComputedRef} from "vue";
import {Regatta} from "components/Interface";
import {api} from "boot/axios";
import {hasError, hasWarning} from "components/TimingErrors";
import {exportFile, openURL, useQuasar} from 'quasar'

const $q = useQuasar()

// Init empty value
const regatta: Ref<Regatta | undefined> = ref(undefined);
const route = useRoute();

async function save(){
  const response = await api.post(`/regatta/${route.params.id}`, {regatta: regatta.value});
  console.log(response)
}

const switchDivisionDialog: Ref<boolean> = ref(false);
const newDivisionNumber: Ref<number> = ref(0);
const newDivisionBoatIndex: Ref<number> = ref(-1);
const newDivisionRaceIndex: Ref<number> = ref(-1);
function startSwitchDivisionDialog(raceIndex: number, boatIndex: number){
  switchDivisionDialog.value = true;
  newDivisionRaceIndex.value = raceIndex;
  newDivisionBoatIndex.value = boatIndex;
}

function switchDivision(){
  if (!("data" in regatta.value)) {
    return;
  }
  regatta.value.data.races[newDivisionRaceIndex.value].boats[newDivisionBoatIndex.value].division = Number(newDivisionNumber.value);
}

function openPdf(){
  /*if (regattaErrors.value.error){
    $q.notify({
      message: 'The Regatta has still some Errors. We cant generate a PDF with errors',
      caption: 'Error',
      color: 'red'
    })
  }else {*/
    //@ts-ignore
    openURL(`${process.env.API}result/list/${route.params.id}`)
  //}
}

function downloadCSV(){
  /*if (regattaErrors.value.error){
    $q.notify({
      message: 'The Regatta has still some Errors. We cant generate a CSV with errors',
      caption: 'Error',
      color: 'red'
    })
  }else {*/
    //@ts-ignore
  openURL(`${process.env.API}result/certificates/${route.params.id}`)
  //}
}

const showErrors: Ref<boolean> = ref(false)

const boatTimes: Ref<Array<Array<{
  startTime: WritableComputedRef<String>,
  endTime: WritableComputedRef<String>
}>>> = ref([]);


const regattaErrors: ComputedRef<{
  error: boolean,
  warning: boolean,
  raceErrors: { error: boolean, warning: boolean, boatErrors: { errors: string[], warnings: string[] }[] }[]
}> = computed(() => {
  if (!("data" in regatta.value)) {
    return {error: false, warning: false, raceErrors: []};
  }
  let raceErrors: Array<{
    error: boolean,
    warning: boolean,
    boatErrors: Array<{ error: boolean, errors: string[], warning: boolean, warnings: string[] }>
  }> = []
  for (const race of regatta.value.data.races) {
    let boatErrors: Array<{ error: boolean, errors: string[], warning: boolean, warnings: string[] }> = [];
    for (const boat of race.boats) {
      const foundErrors = hasError(boat);
      const foundWarnings = hasWarning(boat)
      boatErrors.push({
        error: foundErrors.length > 0,
        errors: foundErrors,
        warning: foundWarnings.length > 0,
        warnings: foundWarnings
      });
    }
    raceErrors.push({
      error: boatErrors.some((el) => el.error),
      warning: boatErrors.some((el) => el.warning),
      boatErrors: boatErrors
    })
  }
  return {
    error: raceErrors.some((el) => el.error),
    warning: raceErrors.some((el) => el.warning),
    raceErrors: raceErrors
  };
});

function getIconRace(obj: {error: boolean, warning: boolean}): (undefined|string){
  if (!showErrors.value){
    return undefined;
  }

  if (obj.error){
    return "error"
  }else if (obj.warning){
    return "warning"
  }else{
    return undefined
  }
}

function getIconBoat(obj: {errors: string[], warnings: string[]}): (undefined|string){
  console.log(obj)
  if (obj.errors.length > 0){
    return "error"
  }else if (obj.warnings.length > 0){
    return "warning"
  }else{
    return undefined
  }
}


onMounted(async () => {
  const response = await api.get(`/regatta/${route.params.id}`);
  console.log(response)
  if (response.status == 200 && response.data.success) {
    regatta.value = response.data.data;

    if (!("data" in regatta.value)) {
      return
    }

    for (let race of regatta.value.data.races) {
      let raceTimes: Array<{ startTime: WritableComputedRef<String>, endTime: WritableComputedRef<String> }> = []
      for (let boat of race.boats) {
        raceTimes.push({
          startTime: computed({
            get(): string {
              return boat.startTime ? new Date(boat.startTime).toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                fractionalSecondDigits: '2'
              }) : "";
            },
            set(newValue: string): void {
              if (newValue == "") {
                boat.startTime = ""
              } else {
                const newDateNumber = Date.parse(((new Date().toISOString().split("T")[0]) + "T" + newValue).replace(",", "."))
                if (!isNaN(newDateNumber)) {
                  const newDate = new Date(newDateNumber);
                  boat.startTime = newDate.toISOString();
                } else {
                  //ToDo Show error message
                  //  Actually maybe not. Could work without
                }
              }
            }
          }), endTime: computed({
            get(): string {
              return boat.endTime ? new Date(boat.endTime).toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                fractionalSecondDigits: '2'
              }) : "";
            },
            set(newValue: string): void {
              if (newValue == "") {
                boat.endTime = ""
              } else {
                const newDateNumber = Date.parse(((new Date().toISOString().split("T")[0]) + "T" + newValue).replace(",", "."))
                if (!isNaN(newDateNumber)) {
                  const newDate = new Date(newDateNumber);
                  boat.endTime = newDate.toISOString();
                } else {
                  //ToDo Show error message
                  //  Actually maybe not. Could work without
                }
              }
            }
          })
        });
      }
      boatTimes.value.push(raceTimes);
    }
  } else {
    console.log("Error happened")
    //ToDo Handle Error
  }
})

function getNumberOfDivisions(raceIndex: number): number {
  let maxDivisions = 1;

  if (!("data" in regatta.value)) {
    return 0;
  }

  for (const boat of regatta.value.data.races[raceIndex].boats) {
    if (maxDivisions < boat.division) {
      maxDivisions = boat.division;
    }
  }
  return maxDivisions
}

</script>

<style scoped>

</style>
