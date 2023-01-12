<?php

namespace App\DataFixtures;

use App\Entity\Task;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $arrayTasks = [
            "Sortir les poubelles",
            "Laver la voiture",
            "passer l'aspirateur",
            "Aller promener le chien"
        ];

        foreach($arrayTasks as $task) {
            $newTask = new Task();

            $newTask->setBody($task);

            $manager->persist($newTask);
        }
        
        $manager->flush();
    }
}
