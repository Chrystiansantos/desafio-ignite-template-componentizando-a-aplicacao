import { useCallback, useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import { api } from '../../services/api';
import { Food } from '../../Components/Food';
import { ModalAddFood } from '../../Components/ModalAddFood';
import { ModalEditFood } from '../../Components/ModalEditFood';
import { FoodsContainer } from './styles';

interface IFood {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);

  useEffect(() => {
    async function loadFood() {
      const { data } = await api.get<IFood[]>('/foods');
      setFoods(data);
    }
    loadFood();
  }, []);

  const handleAddFood = useCallback(
    async food => {
      try {
        const { data } = await api.post('/foods', {
          ...food,
          available: true,
        });

        setFoods([...foods, data]);
      } catch (err) {
        console.log(err);
      }
    },
    [foods],
  );

  const handleUpdateFood = useCallback(
    async food => {
      try {
        const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
          ...editingFood,
          ...food,
        });

        const foodsUpdated: IFood[] = foods.map(f =>
          f.id !== foodUpdated.data.id ? f : foodUpdated.data,
        );

        setFoods(foodsUpdated);
      } catch (err) {
        console.log(err);
      }
    },
    [editingFood, foods],
  );

  const handleDeleteFood = useCallback(
    async (id: number) => {
      await api.delete(`/foods/${id}`);
      const foodsFiltered = foods.filter(food => food.id !== id);

      setFoods(foodsFiltered);
    },
    [foods],
  );

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(!editModalOpen);
  }, [editModalOpen]);

  const handleEditFood = useCallback(food => {
    setEditingFood(food);
    setEditModalOpen(true);
  }, []);

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
