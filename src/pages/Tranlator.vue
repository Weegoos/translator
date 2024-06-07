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
            <q-select v-model="inputLanguage" :options="options" label="Выберите язык..." />
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
        <center>
          <div :class="[$q.screen.width < 1200 ? 'col-4' : 'fit set']" style="align-items: center">
            <q-btn  :class="{ disabled: isDisabled }" class="row text-center" label="Button" @click="translateTextBtn" style="max-width: 250px" />
          </div>
        </center>
      </q-page>
    </q-page-container>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Notify } from 'quasar'
import { franc } from 'franc'
import axios from 'axios'

// language
let inputLanguage = ref('Английский')
const outputLanguage = ref('')
const options = ['Русский', 'Английский', 'Казахский']
const detectedLanguage = ref('')
const textToTranslate = ref('')

function checkLanguages() {
  if (inputLanguage.value === outputLanguage.value) {
    Notify.create('Выбранные языки совпадают')
    outputLanguage.value = ''
  }
}

function detectLanguage() {
  detectedLanguage.value = franc(textToTranslate.value)
  if (detectedLanguage.value === 'rus') {
    inputLanguage.value = 'Русский'
  } else if (detectedLanguage.value === 'kaz') {
    inputLanguage.value = 'Казахский'
  } else if (['eng', 'sco', 'fuf'].includes(detectedLanguage.value)) {
    inputLanguage.value = 'Английский'
  }
}

// interface
let translatedText = ref('')

let name = ''

function watchChangeLanguage() {
  if (outputLanguage.value === 'Английский') {
    name = 'en'
  } else if (outputLanguage.value === 'Русский') {
    name = 'ru'
  } else if (outputLanguage.value === 'Казахский') {
    name = 'kk'
  }
}

const isDisabled = computed(() => {
  return outputLanguage.value === '' || textToTranslate.value === ''
})

watch([inputLanguage, outputLanguage], () => {
  checkLanguages()
  watchChangeLanguage()
})

watch(textToTranslate, () => {
  detectLanguage()
})

watch(translatedText, () => {
  if (outputLanguage.value.length === 0) {
    translatedText.value = ''
  }
})

function removeText() {
  translatedText.value = ''
  textToTranslate.value = ''
}

async function translateTextBtn() {
  try {
    const response = await axios.post('http://localhost:3000/translate', {
      textToTranslate: textToTranslate.value,
      targetLanguage: name
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { translatedText: translated } = response.data
    translatedText.value = translated
  } catch (error) {
    console.error('Error translating text:', error)
    translatedText.value = 'Ошибка перевода текста'
  }

 


}
</script>

<style>
.red {
  background-color: red;
}
.translatorQPage div {
  height: 150px;
  padding-left: 2px;
  resize: none;
}

.qPageLeft {
  border: solid #efeff0 1px;
}

.qPageRight {
  background-color: #eaeaea;
}

.set {
  position: absolute;
  top: 200px;
  left: 0%;
}
</style>
