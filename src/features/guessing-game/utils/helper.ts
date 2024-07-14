import { shuffle } from 'lodash-es'

export function generateQuestions(countries: string[]): Array<{ correct: string; options: string[] }> {
  return shuffle(countries).map((code, index) => ({
    correct: code,
    options: shuffle([...shuffle(countries.filter((_, i) => i !== index)).slice(0, 3), code])
  }))
}
