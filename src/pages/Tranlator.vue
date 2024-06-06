<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div>
    <q-page-container>
      <div>
        <Language />
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
            @keypress="translate"
          >
            <template v-slot:append>
              <q-icon name="close" @click="textToTranslate = ''" class="cursor-pointer" />
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
      </q-page>
    </q-page-container>
  </div>
  <!-- <div>
    <textarea v-model="textToTranslate" placeholder="Введите текст для перевода"></textarea>
    <button @click="translate">Перевести</button>
    <div v-if="translatedText">
      <h3>Переведенный текст:</h3>
      <p>{{ translatedText }}</p>
    </div>
  </div> -->
</template>

<script>
import { ref } from "vue";
import Language from "./Language.vue";
export default {
  components: {
    Language
  },
  setup () {
    const textToTranslate = ref('');
    const translatedText = ref('');

    async function translate() {
      try {
        const response = await fetch('http://localhost:3000/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            textToTranslate: textToTranslate.value,
            targetLanguage: 'en' 
          })
        });
        const { translatedText: translated } = await response.json();
        translatedText.value = translated;
      } catch (error) {
        console.error('Error translating text:', error);
        translatedText.value = 'Ошибка перевода текста';
      }
    }

    return {
      textToTranslate,
      translatedText,
      translate
    }
  }
};
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