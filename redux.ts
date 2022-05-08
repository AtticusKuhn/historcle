import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { matches, request } from './dbpedia'
import { people } from "./people"
// import { useRouter } from 'next/router'
// const router = useRouter()


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useDisp = () => useDispatch<AppDispatch>()
export const useSel: TypedUseSelectorHook<RootState> = useSelector


export type guess = {
    name: string,
    dist: number,
    time: number,
    hints: string[],
    image: string,
}
export type InitialState = {
    guesses: guess[],
    waiting: boolean,
    won: boolean,
    secretPerson: string,
    modalOpen: boolean,
    day: number,
    error: string | null,
}

const startDate = new Date(`May 2 2022`)
const now = new Date();
const numberOfDays = (Math.floor((now.getTime() - startDate.getTime()) / 86400000) % people.length);
const midnight = new Date();
midnight.setHours(24);
/*let urlParams;
if (typeof window !== "undefined") {
    urlParams = new URLSearchParams(window.location.search);
}
const day = urlParams.get('day');
const usedDefinedPerson = urlParams.get('secretPerson');*/
const secretPerson: string =/* usedDefinedPerson
    ? btoa(usedDefinedPerson)
    :
    day
        ? people[Number(day)]*/
    people[numberOfDays]

console.log("secretPerson", secretPerson)

export const initialState: InitialState = {
    guesses: [],
    waiting: false,
    won: false,
    secretPerson: secretPerson,
    modalOpen: false,
    day: numberOfDays,
    error: null
}
export const asyncGuess = createAsyncThunk(
    'state/fetchGuess',
    async ({ guess, secretPerson }: { guess: string, secretPerson: string }, config) => {
        const a = await config.dispatch(asyncMatches({
            guess: guess,
            secretPerson: secretPerson
        }))
        if (!(config.getState() as InitialState).won) {
            const response = await request(guess, secretPerson)

            // The value we return becomes the `fulfilled` action payload
            return response
        }
    }
)
export const asyncMatches = createAsyncThunk(
    'state/matches',
    async ({ guess, secretPerson }: { guess: string, secretPerson: string }) => {
        const response = await matches(guess, secretPerson)
        // The value we return becomes the `fulfilled` action payload
        return response
    }
)


export const slice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        closeModal: (state) => {
            state.modalOpen = false;
        },
        setPerson: (state, person: PayloadAction<string>) => {
            state.secretPerson = person.payload
        },
        setDay: (state, day: PayloadAction<number>) => {
            console.log("set day")
            state.day = day.payload
            state.secretPerson = people[day.payload % people.length]
        },
        dismissError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGuess.pending, (state) => {
                state.waiting = true
            })
            .addCase(asyncGuess.fulfilled, (state, action) => {
                state.waiting = false
                if (action.payload !== undefined) {
                    state.guesses.push(action.payload)
                } else {
                    state.error = "Cannot find person"
                }
            })
            .addCase(asyncMatches.fulfilled, (state, action) => {
                if (action.payload) {
                    state.won = true
                    state.modalOpen = true

                }
            })
    },
})

export const { closeModal, setDay, setPerson, dismissError } = slice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.money.value

export default slice.reducer
export const makeStore = () => configureStore({
    reducer: slice.reducer,
});
export const store = makeStore()