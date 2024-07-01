import type { ComputedRef, ModelRef, Ref } from 'vue'

export type LabelValueTuple<Extend = unknown, Value = any> = [string, Value] | [string, Value, Extend]

export type AllRef<T> = Ref<T> | ModelRef<T | undefined> | ComputedRef<T>
