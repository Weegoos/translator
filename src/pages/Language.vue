<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <dir></dir>
  </template>
  
  <script>
  import { ref, defineProps, watch } from 'vue'
  import { Notify } from 'quasar'
  
  export default {
    props: {
        name: {
            type: String,
            required: true
        }
    },
    setup() {
        
      const inputLanguage = ref('Русский')
      const outputLanguage = ref('Английский')
      const options = ['Русский', 'Английский', 'Казахский']
      function checkLanguages() {
        if (inputLanguage.value === outputLanguage.value) {
          Notify.create(`Выбранные языки совпадают`)
        }
      }
  
      watch([inputLanguage, outputLanguage], () => {
        checkLanguages()
        console.log(outputLanguage.value);
      })
  
      return {
        inputLanguage,
        outputLanguage,
        options,
      }
    }
  }
  </script>

  
<style>

</style>