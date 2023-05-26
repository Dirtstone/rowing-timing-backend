<template>
  <q-page>
    <div class="row">
      <q-btn>Download PDF Result</q-btn>
      <q-btn>Download Certificates</q-btn>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <div v-if="regatta == undefined">
        <!-- ToDo Loading Screen -->
      </div>
      <q-list v-else bordered class="rounded-borders">
        <q-expansion-item
          v-for="(race, raceIndex) of regatta.data.races"
          v-bind="race.number"
          switch-toggle-side
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
                                              <q-btn v-close-popup label="Close" color="primary" flat />
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
                                              <q-btn v-close-popup label="Close" color="primary" flat />
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
                                  <q-input type="text" v-if="boat.didNotAttend || boat.didNotFinish" v-model="boat.reason"
                                           label="Grund für nicht Erscheinen"/>
                                </div>
                              </q-card-actions>
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
  </q-page>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted, Ref, ref, watch, WritableComputedRef} from "vue";
import {Regatta} from "components/Interface";
import {api} from "boot/axios";

// Init empty value
const regatta: Ref<Regatta | undefined>  = ref(undefined);
const route = useRoute();

const boatTimes: Ref<Array<Array<{startTime: WritableComputedRef<String>, endTime: WritableComputedRef<String>}>>> = ref([]);

onMounted(async ()=>{
  console.log("AP")
  const response = await api.get(`/regatta/${route.params.id}`);
  console.log(response)
  if (response.status == 200 && response.data.success){
    regatta.value = response.data.data;

    if (!("data" in regatta.value)){
      return
    }

    for (let race of regatta.value.data.races){
      let raceTimes: Array<{startTime: WritableComputedRef<String>, endTime: WritableComputedRef<String>}> = []
      for (let boat of race.boats){
        raceTimes.push({startTime: computed({
            get(): string{
              return boat.startTime ? new Date(boat.startTime).toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: '2'}): "";
            },
            set(newValue: string):void{
              if (newValue == ""){
                boat.startTime = ""
              }else{
                const newDateNumber = Date.parse(((new Date().toISOString().split("T")[0]) + "T" + newValue).replace(",", "."))
                if (!isNaN(newDateNumber)){
                  const newDate = new Date(newDateNumber);
                  boat.startTime = newDate.toISOString();
                }else{
                  //ToDo Show error message
                  //  Actually maybe not. Could work without
                }
              }
            }
          }), endTime: computed({
            get(): string{
              return boat.endTime ? new Date(boat.endTime).toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: '2'}) : "";
            },
            set(newValue: string):void{
              if (newValue == ""){
                boat.endTime = ""
              }else{
                const newDateNumber = Date.parse(((new Date().toISOString().split("T")[0]) + "T" + newValue).replace(",", "."))
                if (!isNaN(newDateNumber)){
                  const newDate = new Date(newDateNumber);
                  boat.endTime = newDate.toISOString();
                }else{
                  //ToDo Show error message
                  //  Actually maybe not. Could work without
                }
              }
            }
          })});
      }
      boatTimes.value.push(raceTimes)
    }
  }else {
    console.log("Error happened")
    //ToDo Handle Error
  }
})

function getNumberOfDivisions(raceIndex: number): number {
  let maxDivisions = 1;

  if (!("data" in regatta.value)){
    return 0
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
