<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div>
    <q-page-container>
      <div>
    <!-- <p>Обнаруженный язык: {{ detectedLanguage }}</p> -->
  </div>
      <div>
        <div class="row q-pt-md">

          <div class="col q-pl-md text-center">
            <q-select  v-model="inputLanguage"  :options="options" label="Выберите язык..." />
          </div>
          <div class="col q-pr-md q-pl-md text-center">
            <q-select v-model="outputLanguage" :options="options" label="Выберите язык..." />
          </div>
          <q-separator />
        </div>

    </div>

      <q-page class="q-pa-md translatorQPage" :class="[$q.screen.width < 1200 ? 'column' : 'row']">
        <div class="qPageLeft" :class="[$q.screen.width < 1200 ? 'col-4' : 'col']">
          <q-input
            type="textarea"
            borderless
            counter
            v-model="textToTranslate" 
            placeholder="Enter text to translate"
            maxlength="800"
            :input-style="{ resize: 'none' }"
            dense
            @keydown="translate"
            @input="detectLanguage"
          >
            <template v-slot:append>
              <q-icon name="close" @click="removeText" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="qPageRight" :class="[$q.screen.width < 1200 ? 'col-4' : 'col']">
          <q-input
            type="textarea"
            borderless
            :input-style="{ resize: 'none' }"
            v-model="translatedText"
          />
        </div>
        <q-btn label="Button" @click="translateTextBtn" style="max-width: 250px"/>
      </q-page>
    </q-page-container>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { Notify } from 'quasar'
  import { franc } from 'franc';


// language
      let inputLanguage = ref('Английский')
      const outputLanguage = ref('')
      const options = ['Русский', 'Английский', 'Казахский']
      const detectedLanguage = ref('');
      const textToTranslate = ref('')
      function checkLanguages() {
        if (inputLanguage.value === outputLanguage.value) {
          Notify.create(`Выбранные языки совпадают`)
          outputLanguage.value = ''
        }
      }
      function detectLanguage() {
        detectedLanguage.value = franc(textToTranslate.value);
        if (detectedLanguage.value === 'rus'){
          inputLanguage.value = 'Русский'
        }else if (detectedLanguage.value === 'kaz'){
          inputLanguage.value = 'Казахский'
        }else if (detectedLanguage.value === 'eng' || detectedLanguage.value === 'sco' || detectedLanguage.value === 'fuf'){
          inputLanguage.value = 'Английский'
        }
      } 

      // interface
      let translatedText = ref('')

      let name = ""

      function watchChangeLanguage(){
        if (outputLanguage.value === "Английский"){
          name = "en" 
          console.log(888);
        }else if (outputLanguage.value === "Русский"){
          name = "ru"
          console.log(7777);
        }else if (outputLanguage.value === "Казахский"){
          name = "kk"
        }
        }

    watch([inputLanguage, outputLanguage], () => {
            checkLanguages()
            watchChangeLanguage()
          })

          watch(textToTranslate, () => {
          detectLanguage()
        });

        watch(translatedText, () => {
          if (outputLanguage.value.length === 0){
            translatedText.value = ""
          }
        });

        function removeText(){
      translatedText.value = ""
      textToTranslate.value = ""
    }

      

    function translateTextBtn() {
      async function translate() {
      try {
        const response = await fetch('http://localhost:3000/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            textToTranslate: textToTranslate.value,
            targetLanguage: name 
          })
        })
        const { translatedText: translated } = await response.json()
        translatedText.value = translated
      } catch (error) {
        console.error('Error translating text:', error)
        translatedText.value = 'Ошибка перевода текста'
      }
    }

    translate()
  }
</script>


<style>
.translatorQPage div{
  height: 150px;
  padding-left: 2px;
  resize: none;
}

.qPageLeft{
  border: solid #EFEFF0 1px;
}

.qPageRight{
  background-color: #EAEAEF;
}
</style>