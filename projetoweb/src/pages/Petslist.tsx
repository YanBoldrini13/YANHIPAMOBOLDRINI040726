import { useEffect, useState } from "react";
import { listarPets, type Pet } from "../api/pet.service";


export default function Petslist() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    listarPets().then((data) => {
      setPets(data.content); 
    });
  }, []);

  return (
    <ul>
      {pets.map((pet) => (
        <li key={pet.id}>
        {pet.name} {pet.breed && `- ${pet.breed}`}
      </li>
    ))}
  </ul>
  );
}