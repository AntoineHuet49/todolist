<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface as SerializerSerializerInterface;

class TaskController extends AbstractController
{
    #[Route('/api/tasks', name: 'api_tasks_browse', methods: ['GET'])]
    public function browse(TaskRepository $taskRepository): JsonResponse
    {
        return $this->json(
            $taskRepository->findAll()
        );
    }

    #[Route("/api/tasks", name: "api_tasks_add", methods: ["POST"])]
    public function add(TaskRepository $taskRepository, Request $request, SerializerSerializerInterface $serializerInterface): JsonResponse
    {
        $content = $request->getContent();

        $newTask = $serializerInterface->deserialize($content, Task::class, 'json');

        $taskRepository->save($newTask, true);

        return $this->json(
            $newTask
        );
    }

    #[Route("/api/tasks/{id<\d+>}", name: "api_tasks_edit", methods: ["PUT"])]
    public function edit(int $id, Request $request, TaskRepository $taskRepository, SerializerSerializerInterface $serializerInterface): JsonResponse
    {
        $content = $request->getContent();
        $taskToEdit = $taskRepository->find($id);

        if ($taskToEdit === null) {
            return $this->json(
                "Cette tache n'existe pas",
                Response::HTTP_NOT_FOUND
            );
        }

        $taskEdited = $serializerInterface->deserialize($content, Task::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $taskToEdit]);

        $taskRepository->save($taskEdited, true);

        return $this->json(
            $taskEdited
        );
    }

    #[Route("/api/tasks/{id<\d+>}", name: "api_tasks_delete", methods: ["DELETE"])]
    public function delete(int $id, TaskRepository $taskRepository): JsonResponse
    {
        $taskToDelete = $taskRepository->find($id);

        if ($taskToDelete === null) {
            return $this->json(
                "Cette tache n'existe pas",
                Response::HTTP_NOT_FOUND
            );
        }

        $taskRepository->remove($taskToDelete, true);

        return $this->json(
            "La tache a bien été supprimé"
        );
    }
}
