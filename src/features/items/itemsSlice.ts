import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
}

const initialState: Item[] = [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const newItem: Item = { id: Date.now(), name: action.payload };
      state.push(newItem);
    },
    editItem: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const { id, name } = action.payload;
      const itemToEdit = state.find(item => item.id === id);
      if (itemToEdit) {
        itemToEdit.name = name;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, editItem, deleteItem } = itemsSlice.actions;

export default itemsSlice.reducer;



