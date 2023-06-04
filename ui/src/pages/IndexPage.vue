<template>
  <q-page class="row items-center justify-evenly">
    <q-list v-if="regattas != []" bordered separator>
      <q-item v-for="regatta in regattas" clickable @click="router.push(`/regatta/${regatta.uuid}`)">
        {{regatta.name}}
      </q-item>
      <q-item>
        <q-file filled bottom-slots v-model="file" label="Label" counter >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="file = null" class="cursor-pointer" />
          </template>
        </q-file>
        <q-btn @click="createNewRegatta">
          Add Regatta
        </q-btn>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref} from 'vue';
import {api} from "boot/axios";
import {useRouter} from "vue-router";

const router = useRouter();
const regattas: Ref<Array<{uuid: string, name: string}>> = ref([]);

const file= ref(null)

onMounted(async ()=>{
  const response = await api.get("/regattas");

  if (response.status == 200 && response.data.success){
    regattas.value = response.data.data;
    console.log(regattas);
  }
})

function createNewRegatta() {
  const reader = new FileReader();
  reader.onload = (res) => {
    const content = res.target.result as string;
    api.put("/regatta", {regatta: JSON.parse(content)})
  };
  reader.onerror = (err) => console.log(err);
  //@ts-ignore
  reader.readAsText(file.value);
}

</script>
