import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import { addItem, editItem, deleteItem } from "../features/items/itemsSlice";

const Crud: React.FC = () => {
  const items = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState<string>("");
  const [editItemId, setEditItemId] = useState<number | null>(null);

  const handleAddItem = () => {
    if (editItemId !== null) {
      dispatch(editItem({ id: editItemId, name: itemName }));
      setEditItemId(null);
    } else {
      dispatch(addItem(itemName));
    }
    setItemName("");
  };

  const handleEditItem = (id: number, name: string) => {
    setEditItemId(id);
    setItemName(name);
  };

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <h2>Test Crud</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={() => handleEditItem(item.id, item.name)}>
              Edit
            </button>{" "}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Enter item name"
      />
      <button onClick={handleAddItem}>
        {editItemId !== null ? "Save Changes" : "Add Item"}
      </button>
    </div>
  );
};

export default Crud;
