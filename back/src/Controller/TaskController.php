<?php

namespace App\Controller;

use App\Repository\TaskRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TaskController extends AbstractController
{
    #[Route('/api/tasks', name: 'api_tasks_browse', methods: ['GET'])]
    public function browse(TaskRepository $taskRepository): JsonResponse
    {
        return $this->json([
            "tasks" => $taskRepository->findAll()
        ]);
    }
}
