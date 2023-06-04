<template>
  <q-page class="row items-center justify-evenly">
    <q-list v-if="regattas != []" bordered separator>
      <q-item v-for="regatta in regattas" clickable @click="router.push(`/regatta/${regatta.uuid}`)">
        {{regatta.name}}
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

onMounted(async ()=>{
  const response = await api.get("/regattas");

  if (response.status == 200 && response.data.success){
    regattas.value = response.data.data;
    console.log(regattas);
  }
})



</script>
