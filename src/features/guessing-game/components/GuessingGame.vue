<script setup lang="ts">
import { reactive, ref, useCssModule } from 'vue'
import LabelValue from '~/components/LabelValue.vue'
import { useCountriesStore } from '~/stores/countries'
import type { LabelValueTuple } from '~/types/common'
import type { Country } from '~/types/Country'
import { withAssets } from '~/utils/helpers'
import { generateQuestions } from '../utils/helper'

const DELAY_TIME = 2000
const HINT_MAP: Record<string, [string] | [string, (c: Country) => string]> = {
  continent: ['Continents', c => c.continents.join(', ')],
  capital: ['Capital'],
  dialingCode: ['Calling Code', c => `+${c.dialingCode}`],
  borders: ['Neighbors', c => c.borders.map(code => countryByCode[code].name.common).join(', ')],
  timezones: ['Timezones', c => c.timezones.join(', ')],
  languages: ['Languages', c => c.languages.join(', ')],
  currencies: ['Currencies', c => c.currencies.map(cur => cur.name).join(', ')]
}

const { countries, countryByCode } = useCountriesStore()
const styles = useCssModule()

const questions = ref(generateQuestions(countries.map(c => c.cca2)))
const delayed = ref(false)
const done = ref(false)
const hints = ref<LabelValueTuple[]>([])

const prepareQuestion = (questionIndex: number) => {
  const question = questions.value[questionIndex]

  return {
    correct: countryByCode[question.correct],
    options: question.options.map(code => countryByCode[code])
  }
}

const initGameState = () => {
  hints.value = []

  return {
    currentQuestionIndex: 0,
    currentQuestion: prepareQuestion(0),
    totalCorrect: 0
  }
}

const gameState = reactive(initGameState())

const handleNextQuestion = () => {
  hints.value = []
  gameState.currentQuestionIndex++
  gameState.currentQuestion = prepareQuestion(gameState.currentQuestionIndex)
}

const handleChoice = (answer: string, ev: Event) => {
  if (delayed.value || done.value) return

  delayed.value = true

  const isCorrect = answer === gameState.currentQuestion.correct.cca2
  const target = ev.currentTarget as HTMLElement

  const audio = new Audio(withAssets(`sounds/${isCorrect ? 'correct' : 'wrong'}.mp3`))
  audio.play()

  if (isCorrect) {
    target.classList.add(styles['correct-answer'])
  } else {
    const correctEl = document.querySelector(`[data-opt="${gameState.currentQuestion.correct.cca2}"]`)
    correctEl?.classList.add(styles['correct-answer'])
    target.classList.add(styles['wrong-answer'])
  }

  setTimeout(() => {
    audio.pause()
    delayed.value = false

    isCorrect && gameState.totalCorrect++

    if (gameState.currentQuestionIndex < questions.value.length - 1) handleNextQuestion()
    else done.value = true
  }, DELAY_TIME)
}

const handleReplay = () => {
  questions.value = generateQuestions(countries.map(c => c.cca2))
  Object.entries(initGameState()).forEach(([key, value]) => {
    gameState[key as keyof typeof gameState] = value as any
  })
  done.value = false
}

const handleAddHint = () => {
  const hintLen = hints.value.length
  if (hintLen >= Object.keys(HINT_MAP).length) return

  const key = Object.keys(HINT_MAP)[hintLen]
  // @ts-ignore
  const hintValue = HINT_MAP[key][1]?.(gameState.currentQuestion.correct) ?? gameState.currentQuestion.correct[key]
  hints.value.push([HINT_MAP[key][0], hintValue])
}
</script>

<template>
  <div class="flex-center flex-col gap-8">
    <!-- State -->
    <div class="flex-v-center justify-between w-full">
      <div class="flex-v-center gap-2">
        <span class="icon ph-check-circle-fill text-success size-5"></span>
        <span>{{ gameState.totalCorrect }}</span>
        <span class="icon ph-x-circle-fill text-error size-5"></span>
        <span>{{ gameState.currentQuestionIndex - gameState.totalCorrect }}</span>
      </div>

      <div class="flex-v-center gap-4">
        <button class="btn btn-sm" @click="handleReplay">
          <span class="icon ph-arrows-clockwise-bold"></span>
          Replay
        </button>
        <div class="text-md">
          <span class="font-medium">Total:</span> {{ gameState.currentQuestionIndex + 1 }} / {{ questions.length }}
        </div>
      </div>
    </div>

    <!-- Correct -->
    <div class="flex gap-8 justify-between w-full p-4 base-border rounded-lg bg-gray-400/5">
      <!-- Flag -->
      <img class="h-40 sm:h-44" :src="gameState.currentQuestion.correct.flag" />

      <!-- Hints -->
      <div class="flex flex-col gap-2 grow">
        <div class="flex-v-center gap-2">
          <div class="font-medium">Hints</div>
          <button
            v-if="hints.length < Object.keys(HINT_MAP).length"
            class="btn btn-sm btn-circle"
            @click="handleAddHint"
          >
            <span class="icon ph-lightbulb-filament text-yellow-700 dark:text-yellow-300"></span>
          </button>
        </div>
        <template v-if="hints.length">
          <LabelValue v-for="[label, value] in hints" :key="label" :label="label" :value="value" :label-width="100" />
        </template>
      </div>
    </div>

    <!-- Options -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full" :key="gameState.currentQuestionIndex">
      <div
        v-for="opt in gameState.currentQuestion.options"
        :key="opt.cca2"
        class="rounded-xl bg-base-100 base-border cursor-pointer shadow-sm h-16 sm:h-28 flex-center flex-col hover:shadow-lg transition-shadow"
        :data-opt="opt.cca2"
        @click="handleChoice(opt.cca2, $event)"
      >
        <div class="text-lg font-medium text-center">{{ opt.cca2 }} - {{ opt.name.common }}</div>
      </div>
    </div>
  </div>
</template>

<style module>
.correct-answer {
  @apply !border-success !text-success;
}
.wrong-answer {
  @apply !border-error !text-error;
}
</style>
