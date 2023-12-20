import {createEvent, createStore} from "effector";
import {persist} from "effector-storage/local";

export const themeChange = createEvent()
export const $theme = createStore("light")
persist({
    store: $theme,
    key: "theme"
})

$theme.on(themeChange, (state) => (state === "light" ? "dark" : "light"))