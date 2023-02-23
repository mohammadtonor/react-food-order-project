import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoadings, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-meals-1cd2b-default-rtdb.firebaseio.com/meals/meals.json"
      );

      if (!response.ok) {
        throw new Error("Somthing went wrong");
      }
      const responseData = await response.json();
      setMeals(responseData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoadings) {
    return (
      <section className={classes.MealsLoading}>
        <p>is Loading...</p>
      </section>
    );
  }
if(httpError){
  return <section className={classes.MealsError}><p>{httpError}</p></section>
}
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
