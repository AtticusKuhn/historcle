import { AnyAction, configureStore, createAsyncThunk, createSlice, Dispatch, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { getSuggestions, matches, request } from './dbpedia'
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
export type suggestion = {
    name: string,
    image?: string,
    description: string,
}
export type InitialState = {
    guesses: guess[],
    waiting: boolean,
    won: boolean,
    secretPerson: string,
    modalOpen: boolean,
    day: number,
    error: string | null,
    currentGuess: string,
    default?: boolean,
    suggestions: suggestion[]
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
// const getLocalStorage = (): InitialState => {
//     if (typeof window !== "undefined" && localStorage.getItem('reduxState')) {
//         return JSON.parse(localStorage.getItem('reduxState'))
//     } else {
//         return {
//             guesses: [],
//             waiting: false,
//             won: false,
//             secretPerson: secretPerson,
//             modalOpen: false,
//             day: numberOfDays,
//             error: null,
//             currentGuess: "",
//         }
//     }
// }
// console.log(`getLocalStorage().day === numberOfDays`, getLocalStorage(), numberOfDays)
// const persistedState: InitialState = (getLocalStorage() && getLocalStorage().day === numberOfDays)
//     ? getLocalStorage()
//     : {
//         guesses: [],
//         waiting: false,
//         won: false,
//         secretPerson: secretPerson,
//         modalOpen: false,
//         day: numberOfDays,
//         error: null,
//         currentGuess: "",
//     }

export const initialState: InitialState = {
    guesses: [],
    waiting: false,
    won: false,
    secretPerson: secretPerson,
    modalOpen: false,
    day: numberOfDays,
    error: null,
    currentGuess: "",
    default: true,
    suggestions: []
};
export const asyncGuess = createAsyncThunk(
    'state/fetchGuess',
    async (guess: string, config) => {
        const state = (config.getState() as InitialState)
        const a = await config.dispatch(asyncMatches({
            guess: guess,
            secretPerson: state.secretPerson
        }))
        console.log("a", a)
        if (!a.payload/*!(config.getState() as InitialState).won*/) {
            const response = await request(guess, state.secretPerson)

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
export const asyncSuggestions = createAsyncThunk(
    'state/suggestions',
    async (_a, config) => {
        const state = (config.getState() as InitialState)
        const response = await getSuggestions(state.currentGuess)
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
        },
        setCurrentGuess: (state, guess: PayloadAction<string>) => {
            state.currentGuess = guess.payload;
        },
        setState: (state, newState: PayloadAction<InitialState>) => {
            if (newState.payload.day === state.day) {
                state.currentGuess = newState.payload.currentGuess
                state.day = newState.payload.day
                state.error = newState.payload.error
                state.guesses = newState.payload.guesses
                state.modalOpen = newState.payload.modalOpen
                state.secretPerson = newState.payload.secretPerson
                // state.waiting = newState.payload.waiting
                state.won = newState.payload.won
                state.suggestions = newState.payload.suggestions
            }
            state.default = false;

        },
        // setDefault: (state) => {
        //     state.default = false;
        // }
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
                }
            })
            .addCase(asyncGuess.rejected, (state, action) => {
                state.waiting = false
                state.error = `Cannot find person: ${state.currentGuess}`
            })
            .addCase(asyncMatches.pending, (state) => {
                state.waiting = true
            })
            .addCase(asyncMatches.fulfilled, (state, action) => {
                if (action.payload) {
                    state.won = true
                    state.modalOpen = true

                }
                // state.waiting = false;
            })
            .addCase(asyncSuggestions.pending, (state) => {
                // state.waiting = true
            })
            .addCase(asyncSuggestions.fulfilled, (state, action) => {
                // state.waiting = false
                state.suggestions = action.payload;
            })
            .addCase(asyncSuggestions.rejected, (state, action) => {
                // state.waiting = false
                console.log(action)
                state.error = `wikipedia error?`
            })
    },
})
// const persistConfig = {
//     key: 'primary',
//     storage,
//     whitelist: ['exampleData'], // place to select which state you want to persist
// }

// const persistedReducer = persistReducer(persistConfig, slice.reducer)
export const { closeModal, setDay, setPerson, dismissError, setCurrentGuess, setState, /*setDefault */ } = slice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.money.value

export default slice.reducer
// const storeActionLocalStorage = (store: MiddlewareAPI<Dispatch<AnyAction>, InitialState>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
//     next(action)
//     // const state = store.getState()
//     // console.log("storeActionInChrome called", state)
//     localStorage.setItem('reduxState', JSON.stringify(store.getState()))

//     return;
// }

export const makeStore = () => configureStore({
    reducer: slice.reducer,
    // middleware: [storeActionLocalStorage]
});
export const store = makeStore()
store.subscribe(() => {
    // console.log(store.getState())
    if (!store.getState().default) {
        console.log("setting")
        localStorage.setItem('reduxState', JSON.stringify(store.getState()))
    }
    // store.dispatch(setDefault())


})