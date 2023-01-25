import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDataModalOpen: false
    },

    reducers: {
     onOpenDataModal: ( state ) =>{
        state.isDataModalOpen=true;
    }, 
    onCloseDataModal: ( state ) =>{
        state.isDataModalOpen=true;
    },

    
    }
});


//Action creators are generated for each case reducer funtion
export const { onOpenDataModal, onCloseDataModal } = uiSlice.actions;