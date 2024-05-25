// src/features/items/itemsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем тип данных элемента списка
interface Item {
  id: number;
  name: string;
}

// Начальное состояние списка элементов
const initialState: Item[] = [];

// Создаем срез состояния с помощью createSlice
const itemsSlice = createSlice({
  // Имя среза состояния
  name: 'items',
  // Начальное состояние
  initialState,
  // Набор reducers для обновления состояния
  reducers: {
    // Добавление нового элемента в список
    addItem: (state, action: PayloadAction<string>) => {
      // Создаем новый элемент с уникальным идентификатором и именем
      const newItem: Item = { id: Date.now(), name: action.payload };
      // Добавляем новый элемент в состояние списка
      state.push(newItem);
    },
    // Редактирование существующего элемента в списке
    editItem: (state, action: PayloadAction<{ id: number; name: string }>) => {
      // Извлекаем id и новое имя элемента из payload
      const { id, name } = action.payload;
      // Находим элемент в списке по его id
      const itemToEdit = state.find(item => item.id === id);
      // Если элемент найден, обновляем его имя
      if (itemToEdit) {
        itemToEdit.name = name;
      }
    },
    // Удаление элемента из списка по его id
    deleteItem: (state, action: PayloadAction<number>) => {
      // Фильтруем список, оставляя только те элементы, у которых id не совпадает с переданным
      return state.filter(item => item.id !== action.payload);
    },
  },
});

// Экспортируем созданные reducers как actions
export const { addItem, editItem, deleteItem } = itemsSlice.actions;

// Экспортируем редюсер
export default itemsSlice.reducer;
