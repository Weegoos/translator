<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="row q-pt-md">
        <div class="col q-pl-md text-center" >
            <q-select v-model="inputLanguage" :options="options" label="Выберите язык..." />
        </div>
        <div class="col q-pl-md text-center">
            <q-select v-model="outputLanguage" :options="options" label="Выберите язык..." />
        </div>
        <q-separator />
      </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { Notify } from 'quasar'
export default {
    setup () {
        const inputLanguage = ref(null)
        const outputLanguage = ref(null)
        const options = ['Русский', 'Английский', 'Казахский']

         function checkLanguage() {
           Notify.create(`${inputLanguage.value}`)
        }
    return {
        inputLanguage,
        outputLanguage,
        options,
        checkLanguage
    }
    }
}
</script>

<style>

</style>