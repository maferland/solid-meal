import {Component, createEffect, createResource, Show} from 'solid-js'

import styles from './App.module.css'

const fetchMeals = async (): Promise<Meals> =>
  (
    await fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
      mode: 'cors',
    })
  ).json()

interface Meal {
  strMeal: string
  strMealThumb: string
  strInstructions: string
}

interface Meals {
  meals: Meal[]
}

const MealViewer: Component = (props: {meal: Meal | undefined}) => {
  if (!props.meal) {
    return
  }
  return (
    <div class={styles.card}>
      <img src={props.meal.strMealThumb} />
      <div>
        <h1>{props.meal.strMeal}</h1>
        <div class={styles.instructions}>{props.meal.strInstructions}</div>
      </div>
    </div>
  )
}

const App: Component = () => {
  const [meals] = createResource(fetchMeals)
  const meal = () => meals()?.meals[0]

  return (
    <div class={styles.App}>
      <Show when={meal()}>
        <MealViewer meal={meal()} />
      </Show>
    </div>
  )
}

export default App
