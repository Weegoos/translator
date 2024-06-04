<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <q-page-container>
      <div class="row  q-pt-md">
        <div class="col">
          <p class="text-center">Русский язык</p>
        </div>
        <div class="col">
          <p class="text-center">Английский язык</p>
        </div>
        <q-separator />
      </div>
      <q-page class="q-pa-md translatorQPage" :class="[$q.screen.width < 1200 ? 'column' : 'row']">
      <div class="qPageLeft" :class="[$q.screen.width < 1200 ? 'col-4' : 'col']">
        <q-input
          type="textarea"
          borderless
          counter
          v-model="input" 
          maxlength="800"
          placeholder="Начните писать текст..."
          :input-style="{ resize: 'none' }"
          dense
        >
        <template v-slot:append>
          <q-icon name="close" @click="input = ''" class="cursor-pointer" />
        </template>
      </q-input>
      </div>
      <div class="qPageRight" :class="[$q.screen.width < 1200 ? 'col-4' : 'col']">
        <q-input
          type="textarea"
          borderless
          v-model="output"
          :input-style="{ resize: 'none' }"
        />
      </div>
    </q-page>
  </q-page-container>
  </div>
  
</template>

<script>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
  setup () {
    const input = ref('')
    const output = ref('')
    const { t } = useI18n();

    const isText = ref(false);
    console.log(t);
    watch(() => {
      const currentText = input.value;
      if (currentText === "Добро пожаловать") {
        output.value = t('welcome');
      } else {
        output.value = currentText;
      }
    }, [input]);

    return {
      input,
      isText,
      output,
    };
  }
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