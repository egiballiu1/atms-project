import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../app/createAppSlice"
import type { Language } from "../../../types"

type LanguageSliceState = {
  language: string
  status: "idle" | "loading" | "failed"
  error?: string | null
}

const initialState: LanguageSliceState = {
  language: "en",
  status: "idle",
  error: null,
}

const languagesSlices = createAppSlice({
  name: "languages",
  initialState,
  reducers: create => ({
    setSelectedLanguage: create.reducer((state, action: PayloadAction<string>) => {
      state.language = action.payload
    }),
  }),
  selectors: {
    selectLanguage: state => state.language,
  },
})

const { setSelectedLanguage } = languagesSlices.actions
const { selectLanguage } = languagesSlices.selectors

export {
  languagesSlices,

  // actions
  setSelectedLanguage,

  // selectors
  selectLanguage,
}
