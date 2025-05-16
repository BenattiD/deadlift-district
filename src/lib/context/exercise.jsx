import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const EXERCISE_DATABASE_ID = "681724a1002f22745648"; // Replace with your database ID
export const EXERCISE_COLLECTION_ID = "68249c28003800050613"; // Replace with your collection ID

const ExerciseContext = createContext();

export function useExercise() {
  return useContext(ExerciseContext);
}

export function ExerciseProvider(props) {
  const [exercise, setExercise] = useState([]);

  async function add(exercise) {
    try {
      const response = await databases.createDocument(
        EXERCISE_DATABASE_ID,
        EXERCISE_COLLECTION_ID,
        ID.unique(),
        exercise
      );
      setExercise((exercise) => [response, ...exercise].slice(0, 10));
    } catch (err) {
      console.log(err) // handle error or show user a message
    }
  }

  async function remove(id) {
    try {
      await databases.deleteDocument(EXERCISE_DATABASE_ID, EXERCISE_COLLECTION_ID, id);
      setExercise((exercise) => exercise.filter((exercise) => exercise.$id !== id));
      await init();
    } catch (err) {
      console.log(err)
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments(
        EXERCISE_DATABASE_ID,
        EXERCISE_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setExercise(response.documents);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <ExerciseContext.Provider value={{ current: exercise, add, remove }}>
      {props.children}
    </ExerciseContext.Provider>
  );
}
