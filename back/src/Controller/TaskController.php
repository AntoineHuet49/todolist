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
    /**
     * find all task
     *
     * @param TaskRepository $taskRepository
     * @return JsonResponse
     */
    #[Route('/api/tasks', name: 'api_tasks_browse', methods: ['GET'])]
    public function browse(TaskRepository $taskRepository): JsonResponse
    {
        $user = $this->getUser();

        return $this->json(
            $taskRepository->findBy(["user" => $user]),
            Response::HTTP_OK,
            [],
            ["groups" => "browse_task"]
        );
    }

    /**
     * add one task to DB
     *
     * @param TaskRepository $taskRepository
     * @param Request $request
     * @param SerializerSerializerInterface $serializerInterface
     * @return JsonResponse
     */
    #[Route("/api/tasks", name: "api_tasks_add", methods: ["POST"])]
    public function add(TaskRepository $taskRepository, Request $request, SerializerSerializerInterface $serializerInterface): JsonResponse
    {
        $user = $this->getUser();
        $content = $request->getContent();

        $newTask = $serializerInterface->deserialize($content, Task::class, 'json');
        $newTask->setUser($user);

        $taskRepository->save($newTask, true);

        return $this->json(
            $newTask,
            Response::HTTP_OK,
            [],
            ["groups" => "add_task"]
        );
    }

    /**
     * edit one task on DB
     * 
     * @param int $id
     * @param Request $request
     * @param TaskRepository $taskRepository
     * @param SerializerSerializerInterface $serializerInterface
     * @return JsonResponse
     */
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
            $taskEdited,
            Response::HTTP_OK,
            [],
            ['groups' => 'edit_task']
        );
    }

    /**
     * delete one task on DB
     * 
     * @param int $id
     * @param TaskRepository $taskRepository
     * @return  JsoneResponse
     */
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
