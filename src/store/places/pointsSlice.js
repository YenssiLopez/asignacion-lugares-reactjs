import { createSlice } from '@reduxjs/toolkit';

export const pointsSlice = createSlice({
    name: 'points',
    initialState: {
        isSaving: false,
        messageSaved: '',
        places: [],
        active: null,

    },
    reducers: {
        savingNewPlace: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyPlace: (state, action ) => {
            state.isSaving = false;
            state.places.push( action.payload );
            state.messageSaved = `${ action.payload.title }, guardado correctamente`;
            
        },
        setActivePlace: (state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setPlaces: (state, action ) => {
            state.points = action.payload;
            state.messageSaved = '';
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updatePlace: (state, action ) => { // payload: note
            state.isSaving = false;
            state.points = state.points.map( point => {

                if ( point.id === action.payload.id ) {
                    return action.payload;
                }

                return point;
            });

          //  state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
        },
        setPhotosToActivePlace: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ]; 
            state.isSaving = false;
        },

        clearPlacesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.places = [];
            state.active = null;
        },

        deletePlaceById: (state, action ) => {
            state.active = null;
            state.places = state.places.filter( place => place.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyPlace,
    clearPlacesLogout,
    deletePlaceById, 
    savingNewPlace,
    setActivePlace,
    setPlaces,
    setPhotosToActivePlace,
    setSaving,
    updatePlace,
} = pointsSlice.actions;